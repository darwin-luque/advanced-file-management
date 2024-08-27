'use client';

import { type FC } from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Heading, Italic, Strikethrough, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem } from "../menu-item";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeadingDropdownContent } from "./heading-dropdown-content";

export type FormattingItemsProps = {
  editor: Editor;
};

export const FormattingItems: FC<FormattingItemsProps> = ({ editor }) => {
  return (
    <div className="flex gap-1">
      <MenuItem
        icon={<Bold className="h-4 w-4" />}
        action={() => editor.chain().focus().toggleBold().run()}
        isActive={() => editor.isActive("bold")}
        title="Bold"
      />
      <MenuItem
        icon={<Italic className="h-4 w-4 " />}
        action={() => editor.chain().focus().toggleItalic().run()}
        isActive={() => editor.isActive("italic")}
        title="Italic"
      />
      <MenuItem
        icon={<Strikethrough className="h-4 w-4" />}
        action={() => editor.chain().focus().toggleStrike().run()}
        isActive={() => editor.isActive("strike")}
        title="Strike"
      />
      <MenuItem
        icon={<Underline className="h-4 w-4" />}
        action={() => editor.chain().focus().toggleUnderline().run()}
        isActive={() => editor.isActive("underline")}
        title="Underline"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Heading className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <HeadingDropdownContent editor={editor} />
      </DropdownMenu>
    </div>
  );
};
