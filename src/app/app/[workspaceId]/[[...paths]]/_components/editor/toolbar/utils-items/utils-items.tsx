import type { FC } from "react";
import type { Editor } from "@tiptap/react";
import { MenuItem } from "../menu-item";
import { Minus, RemoveFormatting, WrapText } from "lucide-react";

export type UtilItemsProps = {
  editor: Editor;
};

export const UtilItems: FC<UtilItemsProps> = ({ editor }) => {
  return (
    <div className="flex gap-1">
      <MenuItem
        action={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<Minus className="h-4 w-4" />}
        title="Horizontal Rule"
      />
      <MenuItem
        action={() => editor.chain().focus().setHardBreak().run()}
        icon={<WrapText className="h-4 w-4" />}
        title="Hard Break"
      />
      <MenuItem
        action={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        icon={<RemoveFormatting className="h-4 w-4" />}
        title="Clear Format"
      />
    </div>
  );
};
