"use client";

import type { Editor } from "@tiptap/react";
import { useMemo, type FC } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type HeadingDropdownProps = {
  editor: Editor;
};

type HeadingDropdownItem = {
  id: string;
  title: string;
  icon: JSX.Element;
  action: () => boolean;
  isActive: () => boolean;
  shortcut?: string;
};

export const HeadingDropdownContent: FC<HeadingDropdownProps> = ({
  editor,
}) => {
  const items = useMemo<HeadingDropdownItem[]>(
    () => [
      {
        id: "paragraph",
        title: "Paragraph",
        icon: <Pilcrow className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive("paragraph"),
      },
      {
        id: "heading1",
        title: "Heading 1",
        icon: <Heading1 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        id: "heading2",
        title: "Heading 2",
        icon: <Heading2 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        id: "heading3",
        title: "Heading 3",
        icon: <Heading3 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 3 }).run(),
        isActive: () => editor.isActive("heading", { level: 3 }),
      },
      {
        id: "heading4",
        title: "Heading 4",
        icon: <Heading4 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 4 }).run(),
        isActive: () => editor.isActive("heading", { level: 4 }),
      },
      {
        id: "heading5",
        title: "Heading 5",
        icon: <Heading5 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 5 }).run(),
        isActive: () => editor.isActive("heading", { level: 5 }),
      },
      {
        id: "heading6",
        title: "Heading 6",
        icon: <Heading6 className="mr-2 h-4 w-4" />,
        action: () => editor.chain().focus().setHeading({ level: 6 }).run(),
        isActive: () => editor.isActive("heading", { level: 6 }),
      },
    ],
    [editor],
  );
  return (
    <DropdownMenuContent align="start" className="w-40">
      {items.map((item) => (
        <DropdownMenuItem onSelect={item.action} asChild key={item.id}>
          <Button
            variant={item.isActive() ? "secondary" : "ghost"}
            className="h-fit w-full justify-start"
          >
            {item.icon}
            {item.title}
            {item.shortcut ? (
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            ) : null}
          </Button>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
