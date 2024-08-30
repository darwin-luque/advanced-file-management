import { z } from "zod";
import { privateProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { files } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const renameFileSchema = z.object({
  name: z.string().min(1).max(255),
  id: z.string().uuid(),
});

export const renameFile = privateProcedure
  .input(renameFileSchema)
  .mutation(async ({ ctx, input }) => {
    const file = await ctx.db.query.files.findFirst({
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

    const [updatedFile] = await ctx.db
      .update(files)
      .set({
        name: input.name,
      })
      .where(eq(files.id, input.id))
      .returning({
        id: files.id,
        name: files.name,
      });

    if (!updatedFile) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to rename file",
      });
    }

    return updatedFile;
  });
