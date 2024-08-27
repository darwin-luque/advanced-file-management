"use client";

import type { FC } from "react";
import { EditorContent } from "@tiptap/react";
import type { RouterOutputs } from "@/trpc/react";
import { useAppEditor } from "@/hooks/use-app-editor";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "../breadcrumbs";
import { EditorToolbar } from "./toolbar";

export type AppEditorProps = {
  file: RouterOutputs["files"]["getByPath"];
  paths: string[];
};

export const AppEditor: FC<AppEditorProps> = ({ file, paths }) => {
  const editor = useAppEditor({ content: file.content });

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex w-full items-center justify-between px-2">
        <AppBreadcrumbs paths={paths} />
      </div>
      <div className="flex w-full flex-1 flex-col">
        <div className="sticky top-0 z-10 bg-background">
          {editor ? (
            <>
              <EditorToolbar editor={editor} />
              <Separator />
            </>
          ) : null}
        </div>
        <EditorContent editor={editor} className="flex-auto px-2 py-5" />
      </div>
    </div>
  );
};
