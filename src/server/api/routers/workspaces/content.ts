import { z } from "zod";
import { and, asc, eq, isNull, sql } from "drizzle-orm";
import { files, folders } from "@/server/db/schema";
import { privateProcedure } from "@/server/api/trpc";

type Type = "workspace" | "folder" | "file";

export const getContentForWorkspaceSchema = z.object({
  referenceId: z.string().uuid(),
  type: z.enum(["workspace", "folder"]),
});

export const getContentForWorkspace = privateProcedure
  .input(getContentForWorkspaceSchema)
  .query(async ({ input, ctx }) => {
    const { referenceId, type } = input;

    switch (type) {
      case "workspace":
        return ctx.db
          .select({
            type: sql<Type>`'folder'`,
            id: folders.id,
            parentId: folders.workspaceId,
            name: folders.name,
            path: folders.path,
            ownerId: folders.ownerId,
            createdAt: folders.createdAt,
            updatedAt: folders.updatedAt,
          })
          .from(folders)
          .where(and(eq(folders.workspaceId, referenceId), isNull(folders.parentFolderId)))
          .orderBy(asc(folders.name));
      case "folder":
        const foundFolders = await ctx.db
          .select({
            type: sql<Type>`'folder'`,
            id: folders.id,
            parentId: folders.parentFolderId,
            name: folders.name,
            path: folders.path,
            ownerId: folders.ownerId,
            createdAt: folders.createdAt,
            updatedAt: folders.updatedAt,
          })
          .from(folders)
          .where(eq(folders.parentFolderId, referenceId))
          .orderBy(asc(folders.name));

        const foundFiles = await ctx.db
          .select({
            type: sql<Type>`'file'`,
            id: files.id,
            parentId: files.folderId,
            name: files.name,
            path: files.path,
            ownerId: files.ownerId,
            createdAt: files.createdAt,
            updatedAt: files.updatedAt,
          })
          .from(files)
          .where(eq(files.folderId, referenceId))
          .orderBy(asc(files.name));

        return [...foundFolders, ...foundFiles];
    }
  });
