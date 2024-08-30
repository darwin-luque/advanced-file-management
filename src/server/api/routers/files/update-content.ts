import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { files } from "@/server/db/schema";
import { privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const updateFileContentSchema = z.object({
  id: z.string().uuid(),
  content: z.record(z.unknown()),
});

export const updateFileContent = privateProcedure
  .input(updateFileContentSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const [file] = await ctx.db
        .update(files)
        .set({
          content: input.content,
        })
        .where(and(eq(files.id, input.id), eq(files.ownerId, ctx.auth.userId ?? "")))
        .returning({
          id: files.id,
        });

      if (!file) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. The file was not found or you do not have permission to update it.",
        });
      }

      return file;
    } catch (e) {
      console.error({ e });
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. The file was not found or you do not have permission to update it.",
      });
    }
  });