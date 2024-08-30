import { z } from "zod";
import { privateProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { folders } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const renameFolderSchema = z.object({
  name: z.string().min(1).max(255),
  id: z.string().uuid(),
});

export const renameFolder = privateProcedure
  .input(renameFolderSchema)
  .mutation(async ({ ctx, input }) => {
    const file = await ctx.db.query.folders.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.id, input.id),
          eq(fields.ownerId, ctx.auth.userId ?? "")
        );
      },
    });

    if (!file) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to rename this folder",
      });
    }

    const [updatedFolder] = await ctx.db
      .update(folders)
      .set({
        name: input.name,
      })
      .where(eq(folders.id, input.id))
      .returning({
        id: folders.id,
        name: folders.name,
      });

    if (!updatedFolder) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to rename the folder",
      });
    }

    return updatedFolder;
  });
