import { z } from "zod";
import { workspaceProcedure } from "../../trpc";
import { folders } from "../../../db/schema";
import { TRPCError } from "@trpc/server";

export const createFolderSchema = z.object({
  parentFolderId: z.string().uuid().optional(),
  name: z.string(),
});

export const createFolder = workspaceProcedure
  .input(createFolderSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const [folder] = await ctx.db
      .insert(folders)
      .values({
        ...input,
        ownerId: ctx.auth.userId,
      })
      .returning();

    if (!folder) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create folder",
      });
    }

    return folder;
  });
