import { z } from "zod";
import { eq } from "drizzle-orm";
import type { db as DBType } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { files, folders } from "@/server/db/schema";
import { privateProcedure } from "@/server/api/trpc";

const deleteTree = async (db: typeof DBType, parentId: string) => {
  const children = await db.query.folders.findMany({
    where: eq(folders.parentFolderId, parentId),
  });

  for (const child of children) {
    await deleteTree(db, child.id);
  }

  await db.delete(folders).where(eq(folders.parentFolderId, parentId)).execute();
  await db.delete(files).where(eq(files.folderId, parentId)).execute();

  return;
};

export const deleteFolder = privateProcedure
  .input(z.string().uuid())
  .mutation(async ({ ctx, input }) => {
    const folder = await ctx.db.query.folders.findFirst({
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
        message: "You don't have access to this folder",
      });
    }

    await deleteTree(ctx.db, input);

    await ctx.db.delete(folders).where(eq(folders.id, input)).execute();
  });
