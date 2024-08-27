import { type FC } from "react";
import { type Editor } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";
import { MenuItem } from "../menu-item";

export type HistoryItemsProps = {
  editor: Editor;
};

export const ActionItems: FC<HistoryItemsProps> = ({ editor }) => {
  return (
    <div className="flex gap-1">
      <MenuItem
        action={() => editor.chain().focus().undo().run()}
        icon={<Undo2 className="h-4 w-4" />}
        title="Undo"
      />
      <MenuItem
        action={() => editor.chain().focus().redo().run()}
        icon={<Redo2 className="h-4 w-4" />}
        title="Redo"
      />
    </div>
  );
};
