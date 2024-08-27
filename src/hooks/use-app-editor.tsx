"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";

type UseAppEditorProps = {
  content?: string;
};

export const useAppEditor = ({ content }: UseAppEditorProps = {}) => {
  const editor = useEditor({
    extensions: [
      TaskList,
      TaskItem,
      Highlight,
      TextAlign,
      StarterKit,
      Image,
      Paragraph.configure({
        HTMLAttributes: {
          class: "w-full",
        },
      }),
      Underline,
      CharacterCount,
      Focus,
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-base flex-1 m-5 focus:outline-none",
      },
    },
    content:
      content ??
      `
      <p>Hello World! 🌍️</p>
    `,
  });

  return editor;
};
