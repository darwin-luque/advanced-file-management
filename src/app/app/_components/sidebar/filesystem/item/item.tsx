import { useState } from "react";
import type { FC, ReactNode } from "react";
import { File, FolderClosed, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { NewFolderForm } from "./new-folder-form";

export type FilesystemItemProps = {
  node: {
    type: "workspace" | "folder" | "file";
    id: string;
    parentId: string | null;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  nestedItems?: ReactNode;
};

export const FilesystemItem: FC<FilesystemItemProps> = ({
  node,
  nestedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="my-1.5">
      <ContextMenu>
        <Dialog>
          <span className="flex items-center gap-1.5">
            {node.type === "folder" ? (
              <ContextMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setIsOpen((prevIsOpen) => !prevIsOpen)
                  }
                >
                  <FolderClosed className={cn("h-4 w-4", isOpen && "hidden")} />
                  <FolderOpen className={cn("h-4 w-4", !isOpen && "hidden")} />
                  <span className="ml-2">{node.name}</span>
                </Button>
              </ContextMenuTrigger>
            ) : null}
            {node.type === "file" ? (
              <Button size="icon" variant="ghost">
                <File className="h-4 w-4" />
                {node.name}
              </Button>
            ) : null}
          </span>
          <ContextMenuContent className="w-56">
            <ContextMenuItem inset>New File...</ContextMenuItem>
            <DialogTrigger asChild>
              <ContextMenuItem inset>New Folder...</ContextMenuItem>
            </DialogTrigger>
            <ContextMenuSeparator />
            <ContextMenuItem inset>Rename</ContextMenuItem>
            <ContextMenuItem inset>Delete</ContextMenuItem>
          </ContextMenuContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Folder</DialogTitle>
              <DialogDescription>
                Create a new folder in <strong>{node.name}</strong>
              </DialogDescription>
            </DialogHeader>
            <NewFolderForm parentId={node.id} />
          </DialogContent>
        </Dialog>
      </ContextMenu>
      {isOpen ? nestedItems : null}
    </li>
  );
};
