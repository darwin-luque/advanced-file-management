import { useState } from "react";
import type { FC, ReactNode } from "react";
import { File, FolderClosed, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilesystemItemProps = {
  node: {
    type: "workspace" | "folder" | "file";
    id: string;
    parentId: string | null;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    hasChild: boolean;
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
      <span className="flex items-center gap-1.5">
        {node.type === "folder" ? (
          <Button
            size="default"
            variant="link"
            onClick={() =>
              setIsOpen((prevIsOpen) => !prevIsOpen && node.hasChild)
            }
          >
            <FolderClosed className={cn("h-4 w-4", isOpen && "hidden")} />
            <FolderOpen className={cn("h-4 w-4", !isOpen && "hidden")} />
            <span className="ml-2">{node.name}</span>
          </Button>
        ) : null}
        {node.type === "file" ? (
          <Button size="icon" variant="ghost">
            <File className="h-4 w-4" />
            {node.name}
          </Button>
        ) : null}
      </span>
      {isOpen ? nestedItems : null}
    </li>
  );
};
