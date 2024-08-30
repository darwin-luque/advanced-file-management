"use client";

import { type Editor, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CharacterCount from "@tiptap/extension-character-count";

type UseAppEditorProps = {
  content?: JSONContent;
};

export const useAppEditor = ({
  content,
}: UseAppEditorProps = {}): Editor | null => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Image,
      TaskList,
      TaskItem,
      Underline,
      TextAlign,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: {
            class: "leading-5 mt-10 text-pretty font-bold",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6 space-y-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6 space-y-2",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "w-full",
          },
        },
      }),
      CharacterCount,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-300",
        },
      }),
      Focus.configure({
        className: "outline-none",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-base flex-1 focus:outline-none space-y-2",
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
