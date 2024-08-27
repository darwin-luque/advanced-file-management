"use client";

import { EditorContent } from "@tiptap/react";
import type { FC } from "react";
import type { RouterOutputs } from "@/trpc/react";
import { useAppEditor } from "@/hooks/use-app-editor";

export type AppEditorProps = {
  file: RouterOutputs["files"]["getByPath"];
};

export const AppEditor: FC<AppEditorProps> = ({ file }) => {
  const editor = useAppEditor({ content: file.content });

  return (
    <div className="flex w-full flex-1 flex-col space-x-2 p-1">
      <EditorContent editor={editor} className="flex-auto px-4 py-5" />
    </div>
  );
};
