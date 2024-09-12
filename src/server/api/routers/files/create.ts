import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { JSONContent } from "@tiptap/react";
import { workspaceProcedure } from "@/server/api/trpc";
import { files } from "@/server/db/schema";

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
    };

    const initialContent: JSONContent = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hello World! 🌍️",
            },
          ],
        },
      ],
    };

    const [file] = await ctx.db
      .insert(files)
      .values({
        ...input,
        ownerId: ctx.auth.userId ?? "",
        content: initialContent,
        size: JSON.stringify(initialContent).length,
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
