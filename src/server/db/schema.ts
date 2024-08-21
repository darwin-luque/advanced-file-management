import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const permissionLevelsEnum = pgEnum("workspace_permission_levels_enum", [
  "read",
  "write",
  "admin",
]);

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  hasImage: boolean("has_image").default(false).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  banned: boolean("banned").default(false).notNull(),
  locked: boolean("locked").default(false).notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  workspaceCollaborators: many(workspaceCollaborators),
  folders: many(folders),
  files: many(files),
  fileCollaborators: many(collaborators),
}));

export const workspaces = pgTable(
  "workspace",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: varchar("owner_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    name: varchar("name", { length: 255 }).notNull(),
    isShared: boolean("is_shared").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => sql`current_timestamp`)
      .notNull(),
  },
  (ws) => ({
    ownerWorkspaceUnique: uniqueIndex("owner_workspace_unique").on(
      ws.ownerId,
      ws.name,
    ),
  }),
);

export const workspacesRelations = relations(workspaces, ({ many, one }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  collaborators: many(workspaceCollaborators),
  folders: many(folders),
}));

export const workspaceCollaborators = pgTable("workspace_collaborator", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  permissionLevel: permissionLevelsEnum("permission_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`current_timestamp`)
    .notNull(),
});

export const workspaceCollaboratorsRelations = relations(
  workspaceCollaborators,
  ({ one }) => ({
    user: one(users, {
      fields: [workspaceCollaborators.userId],
      references: [users.id],
    }),
    workspace: one(workspaces, {
      fields: [workspaceCollaborators.id],
      references: [workspaces.id],
    }),
  }),
);

export const folders = pgTable("folder", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  workspaceId: uuid("workspace_id").notNull(),
  parentFolderId: uuid("parent_folder_id").references(() => workspaces.id),
  ownerId: varchar("owner_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`current_timestamp`)
    .notNull(),
});

export const foldersRelations = relations(folders, ({ one, many }) => ({
  owner: one(users, {
    fields: [folders.ownerId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [folders.workspaceId],
    references: [workspaces.id],
  }),
  parentFolder: one(folders, {
    fields: [folders.parentFolderId],
    references: [folders.id],
  }),
  files: many(files),
  collaborators: many(collaborators),
}));

export const files = pgTable("file", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  folderId: uuid("folder_id")
    .notNull()
    .references(() => folders.id),
  ownerId: varchar("owner_id", { length: 255 }).notNull(),
  content: jsonb("content").notNull(),
  size: integer("size").notNull(),
  currentVersionId: uuid("current_version_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`current_timestamp`)
    .notNull(),
});

export const filesRelations = relations(files, ({ one, many }) => ({
  owner: one(users, {
    fields: [files.ownerId],
    references: [users.id],
  }),
  folder: one(folders, {
    fields: [files.folderId],
    references: [folders.id],
  }),
  currentVersion: one(fileVersions, {
    fields: [files.currentVersionId],
    references: [fileVersions.id],
  }),
  versions: many(fileVersions),
  fileTags: many(fileTags),
  collaborators: many(collaborators),
}));

export const fileVersions = pgTable("file_version", {
  id: uuid("id").defaultRandom().primaryKey(),
  fileId: uuid("file_id")
    .notNull()
    .references(() => files.id),
  versionNumber: integer("version_number").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`current_timestamp`)
    .notNull(),
});

export const fileVersionsRelations = relations(fileVersions, ({ one }) => ({
  file: one(files, {
    fields: [fileVersions.fileId],
    references: [files.id],
  }),
}));

export const tags = pgTable(
  "tag",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    workspaceId: uuid("workspace_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => sql`current_timestamp`)
      .notNull(),
  },
  (tags) => ({
    workspaceTagUnique: uniqueIndex("workspace_tag_unique").on(
      tags.workspaceId,
      tags.name,
    ),
  }),
);

export const tagsRelations = relations(tags, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [tags.workspaceId],
    references: [workspaces.id],
  }),
  fileTags: many(fileTags),
}));

export const fileTags = pgTable(
  "file_tag",
  {
    fileId: uuid("file_id")
      .notNull()
      .references(() => files.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => sql`current_timestamp`)
      .notNull(),
  },
  (fileTags) => ({
    pk: primaryKey({ columns: [fileTags.fileId, fileTags.tagId] }),
  }),
);

export const fileTagsRelations = relations(fileTags, ({ one }) => ({
  file: one(files, {
    fields: [fileTags.fileId],
    references: [files.id],
  }),
  tag: one(tags, {
    fields: [fileTags.tagId],
    references: [tags.id],
  }),
}));

export const resourceTypeEnum = pgEnum("resource_type", ["folder", "file"]);

export const collaborators = pgTable("collaborator", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  resourceType: resourceTypeEnum("resource_type").notNull(),
  resourceId: uuid("resource_id").notNull(),
  permissionLevel: permissionLevelsEnum("permission_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`current_timestamp`)
    .notNull(),
});

export const collaboratorsRelations = relations(collaborators, ({ one }) => ({
  folder: one(folders, {
    fields: [collaborators.resourceId],
    references: [folders.id],
  }),
  file: one(files, {
    fields: [collaborators.resourceId],
    references: [files.id],
  }),
}));
