import { z } from "zod";
import { privateProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { files } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const deleteFile = privateProcedure
  .input(z.string().uuid())
  .mutation(async ({ ctx, input }) => {
    const folder = await ctx.db.query.files.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, input),
          eq(fields.ownerId, ctx.auth.userId ?? ""),
        );
      },
    });

    if (!folder) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have access to this file",
      });
    }

    await ctx.db.delete(files).where(eq(files.id, input)).execute();
  });
  