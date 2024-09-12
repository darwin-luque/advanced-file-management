import { z } from "zod";
import { workspaceProcedure } from "../../trpc";
import { folders } from "../../../db/schema";
import { TRPCError } from "@trpc/server";

export const createFolderSchema = z.object({
  parentFolderId: z.string().uuid().optional(),
  name: z.string(),
});

const EMPTY_UUID = "00000000-0000-0000-0000-000000000000";

export const createFolder = workspaceProcedure
  .input(createFolderSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const parentFolder = await ctx.db.query.folders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, input.parentFolderId ?? EMPTY_UUID)
      },
    });

    const [folder] = await ctx.db
      .insert(folders)
      .values({
        ...input,
        ownerId: ctx.auth.userId,
        path: `${parentFolder?.path ?? ""}/${input.name}`,
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
