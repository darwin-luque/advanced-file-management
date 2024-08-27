import { z } from "zod";
import { privateProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const getFileByPath = privateProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    const file = await ctx.db.query.files.findFirst({
      where(fields, { eq }) {
        return eq(fields.path, input);
      },
    });

    if (!file) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "File not found",
      });
    }

    if (file.ownerId !== ctx.auth.userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have access to this file",
      });
    }

    return file;
  });
