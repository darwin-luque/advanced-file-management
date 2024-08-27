"use client";

import type { FC } from "react";
import { type Editor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { FormattingItems } from "./formatting-items";
import { ParagraphItems } from "./paragraph-items";
import { ActionItems } from "./action-items";
import { UtilItems } from "./utils-items";
import { cn } from "@/lib/utils";

export type MenuBarProps = {
  editor: Editor;
  className?: string;
};

export const EditorToolbar: FC<MenuBarProps> = ({ editor, className }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center space-x-3 p-1 text-sm",
        className,
      )}
    >
      <ActionItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <FormattingItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <ParagraphItems editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      <UtilItems editor={editor} />
    </div>
  );
};
