"use client";

import { useMemo, type FC } from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export type AlignDropdownContentProps = {
  editor: Editor;
};

export const AlignDropdownContent: FC<AlignDropdownContentProps> = ({
  editor,
}) => {
  const isMobile = useMemo(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );
  }, []);
  const isMac = useMemo(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /(macintosh|macintel|macppc|mac68k|macos)/i.test(userAgent);
  }, []);

  return (
    <DropdownMenuContent align="start" className="w-40">
      <DropdownMenuItem
        onSelect={() => editor.chain().focus().setTextAlign("left").run()}
        asChild
      >
        <Button
          variant={
            editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"
          }
          className="h-fit w-full justify-start"
        >
          <AlignLeft className="mr-2 h-4 w-4" />
          Left
          {isMobile ? null : (
            <DropdownMenuShortcut>
              {isMac ? "⌘+⇧+L" : "Ctrl+⇧+L"}
            </DropdownMenuShortcut>
          )}
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => editor.chain().focus().setTextAlign("center").run()}
        asChild
      >
        <Button
          variant={
            editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
          }
          className="h-fit w-full justify-start"
        >
          <AlignCenter className="mr-2 h-4 w-4" />
          Center
          {isMobile ? null : (
            <DropdownMenuShortcut>
              {isMac ? "⌘+⇧+E" : "Ctrl+⇧+E"}
            </DropdownMenuShortcut>
          )}
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => editor.chain().focus().setTextAlign("right").run()}
        asChild
      >
        <Button
          variant={
            editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
          }
          className="h-fit w-full justify-start"
        >
          <AlignRight className="mr-2 h-4 w-4" />
          Right
          {isMobile ? null : (
            <DropdownMenuShortcut>
              {isMac ? "⌘+⇧+R" : "Ctrl+⇧+R"}
            </DropdownMenuShortcut>
          )}
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => editor.chain().focus().setTextAlign("justify").run()}
        asChild
      >
        <Button
          variant={
            editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"
          }
          className="h-fit w-full justify-start"
        >
          <AlignJustify className="mr-2 h-4 w-4" />
          Justify
          {isMobile ? null : (
            <DropdownMenuShortcut>
              {isMac ? "⌘+⇧+J" : "Ctrl+⇧+J"}
            </DropdownMenuShortcut>
          )}
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
