import { z } from "zod";
import { workspaceProcedure } from "../../trpc";
import { files } from "../../../db/schema";
import { TRPCError } from "@trpc/server";

export const createFileSchema = z.object({
  folderId: z.string().uuid(),
  name: z.string().min(1),
});

export const createFile = workspaceProcedure
  .input(createFileSchema)
  .mutation(async ({ input, ctx }) => {
    const folder = await ctx.db.query.folders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, input.folderId);
      },
    });

    if (!folder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Folder not found",
      });
    }

    const initialContent = "<p>Hello World! 🌍️</p>";

    const [file] = await ctx.db
      .insert(files)
      .values({
        ...input,
        ownerId: ctx.auth.userId ?? "",
        content: initialContent,
        size: initialContent.length,
        path: `${folder.path}/${input.name}`,
      })
      .returning();

    if (!file) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create file",
      });
    }

    return file;
  });
