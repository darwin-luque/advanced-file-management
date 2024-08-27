"use client";

import type { FC } from "react";
import { EditorContent } from "@tiptap/react";
import type { RouterOutputs } from "@/trpc/react";
import { useAppEditor } from "@/hooks/use-app-editor";
import { Separator } from "@/components/ui/separator";
import { EditorToolbar } from "./toolbar";

export type AppEditorProps = {
  file: RouterOutputs["files"]["getByPath"];
};

export const AppEditor: FC<AppEditorProps> = ({ file }) => {
  const editor = useAppEditor({ content: file.content });

  return (
    <div className="my-5 flex w-full flex-1 flex-col space-x-2">
      <div className="sticky top-0 z-10 bg-background">
        {editor ? <EditorToolbar editor={editor} /> : null}
        <Separator />
      </div>
      <EditorContent editor={editor} className="flex-auto py-5" />
    </div>
  );
};
