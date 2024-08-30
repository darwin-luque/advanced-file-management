import { useState } from "react";
import type { FC, ReactNode } from "react";
import { File, FolderClosed, FolderOpen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { NewFolderForm } from "./new-folder-form";
import { NewFileForm } from "./new-file-form";
import Link from "next/link";
import { RenameForm } from "./rename-form";
import { api } from "../../../../../../../../trpc/react";
import { toast } from "sonner";

export type FilesystemItemProps = {
  node: {
    type: "workspace" | "folder" | "file";
    id: string;
    parentId: string | null;
    name: string;
    path: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  nestedItems?: ReactNode;
  workspaceId: string;
  defaultOpen?: boolean;
};

export const FilesystemItem: FC<FilesystemItemProps> = ({
  node,
  nestedItems,
  workspaceId,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedDialog, setSelectedDialog] = useState<
    "new-file" | "new-folder" | "rename" | "delete"
  >();
  const utils = api.useUtils();
  const deleteFolder = api.folders.delete.useMutation({
    onSettled: () => {
      void utils.workspaces.content.invalidate();
    },
  });
  const deleteFile = api.files.delete.useMutation({
    onSettled: () => {
      void utils.workspaces.content.invalidate();
    },
  });

  const onDelete = () => {
    const promise =
      node.type === "folder"
        ? deleteFolder.mutateAsync(node.id)
        : deleteFile.mutateAsync(node.id);

    toast.promise(promise, {
      loading: `Deleting ${node.name}...`,
      success: `Deleted ${node.name}`,
      error: `Failed to delete ${node.name}`,
    });
  };

  return (
    <li className="my-0.5">
      <ContextMenu>
        <Dialog>
          <span className="flex items-center gap-1.5">
            {node.type === "folder" ? (
              <ContextMenuTrigger asChild>
                <Button
                  size="file"
                  variant="file"
                  onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
                >
                  <FolderClosed className={cn("h-4 w-4", isOpen && "hidden")} />
                  <FolderOpen className={cn("h-4 w-4", !isOpen && "hidden")} />
                  <span className="ml-2">{node.name}</span>
                </Button>
              </ContextMenuTrigger>
            ) : null}
            {node.type === "file" ? (
              <ContextMenuTrigger asChild>
                <Link
                  href={`/app/${workspaceId}/${node.path}`}
                  className={buttonVariants({
                    size: "file",
                    variant: "file",
                  })}
                >
                  <File className="h-4 w-4" />
                  <span className="ml-2">{node.name}</span>
                </Link>
              </ContextMenuTrigger>
            ) : null}
          </span>
          <ContextMenuContent className="w-56">
            {node.type === "folder" ? (
              <>
                <DialogTrigger
                  asChild
                  onClick={() => setSelectedDialog("new-file")}
                >
                  <ContextMenuItem inset>New File...</ContextMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => setSelectedDialog("new-folder")}
                >
                  <ContextMenuItem inset>New Folder...</ContextMenuItem>
                </DialogTrigger>
                <ContextMenuSeparator />
              </>
            ) : null}
            {["folder", "file"].includes(node.type) ? (
              <DialogTrigger
                asChild
                onClick={() => setSelectedDialog("rename")}
              >
                <ContextMenuItem inset>Rename</ContextMenuItem>
              </DialogTrigger>
            ) : null}
            {["folder", "file"].includes(node.type) ? (
              <DialogTrigger
                asChild
                onClick={() => setSelectedDialog("delete")}
              >
                <ContextMenuItem inset>Delete</ContextMenuItem>
              </DialogTrigger>
            ) : null}
          </ContextMenuContent>
          {selectedDialog === "new-folder" ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Folder</DialogTitle>
                <DialogDescription>
                  Create a new folder in <strong>{node.name}</strong>
                </DialogDescription>
              </DialogHeader>
              <NewFolderForm workspaceId={workspaceId} parentId={node.id} />
            </DialogContent>
          ) : null}
          {selectedDialog === "new-file" ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New File</DialogTitle>
                <DialogDescription>
                  Create a new file in <strong>{node.name}</strong>
                </DialogDescription>
              </DialogHeader>
              <NewFileForm workspaceId={workspaceId} folderId={node.id} />
            </DialogContent>
          ) : null}
          {selectedDialog === "rename" && node.type !== "workspace" ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename &quot;{node.name}&quot;</DialogTitle>
                <DialogDescription>
                  Give {node.type === "folder" ? "folder" : "file"}{" "}
                  <strong>{node.name}</strong> a new name
                </DialogDescription>
              </DialogHeader>
              <RenameForm
                type={node.type}
                currentName={node.name}
                referenceId={node.id}
              />
            </DialogContent>
          ) : null}
          {selectedDialog === "delete" && node.type !== "workspace" ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete&quot;{node.name}&quot;</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  {node.type === "folder" ? "folder" : "file"}{" "}
                  <strong>{node.name}</strong>?. This action cannot be undone
                  (at the time being).
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={onDelete} variant="destructive">
                    Confirm
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="default">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : null}
        </Dialog>
      </ContextMenu>
      {isOpen ? nestedItems : null}
    </li>
  );
};
