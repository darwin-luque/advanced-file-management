import { z } from "zod";
import { and, eq, isNull, sql } from "drizzle-orm";
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
            ownerId: folders.ownerId,
            createdAt: folders.createdAt,
            updatedAt: folders.updatedAt,
          })
          .from(folders)
          .where(and(eq(folders.workspaceId, referenceId), isNull(folders.parentFolderId)));
      case "folder":
        const foundFolders = await ctx.db
          .select({
            type: sql<Type>`'folder'`,
            id: folders.id,
            parentId: folders.parentFolderId,
            name: folders.name,
            ownerId: folders.ownerId,
            createdAt: folders.createdAt,
            updatedAt: folders.updatedAt,
          })
          .from(folders)
          .where(eq(folders.parentFolderId, referenceId));

        const foundFiles = await ctx.db
          .select({
            type: sql<Type>`'file'`,
            id: files.id,
            parentId: files.folderId,
            name: files.name,
            ownerId: files.ownerId,
            createdAt: files.createdAt,
            updatedAt: files.updatedAt,
          })
          .from(files)
          .where(eq(files.folderId, referenceId));

        return [...foundFolders, ...foundFiles];
    }
  });
