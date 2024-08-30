"use client";

import type { FC } from "react";
import { EditorContent } from "@tiptap/react";
import { useAppEditor } from "@/hooks/use-app-editor";
import { Separator } from "@/components/ui/separator";
import { api, type RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { AppBreadcrumbs } from "../breadcrumbs";
import { EditorToolbar } from "./toolbar";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { TRPCClientError } from "@trpc/client";
import type { appRouter } from "@/server/api/root";

export type AppEditorProps = {
  file: RouterOutputs["files"]["getByPath"];
  paths: string[];
};

export const AppEditor: FC<AppEditorProps> = ({ file, paths }) => {
  const editor = useAppEditor({ content: file.content });
  const updateContent = api.files.updateContent.useMutation();

  const onSave = () => {
    if (!editor) return;
    const updatePromise = updateContent.mutateAsync({
      id: file.id,
      content: editor.getJSON(),
    });

    toast.promise(updatePromise, {
      loading: "Saving file...",
      success: () => "File saved",
      error: (error: TRPCClientError<typeof appRouter>) => {
        console.error(error);
        return <span>{error.message ?? "Failed to save file"}</span>;
      },
    });
  };

  return (
    <Dialog>
      <div className="flex w-full flex-1 flex-col gap-6">
        <div className="flex w-full items-center justify-between px-2">
          <AppBreadcrumbs paths={paths} />
          <DialogTrigger asChild>
            <Button size="sm">Save</Button>
          </DialogTrigger>
        </div>
        <div className="flex w-full flex-1 flex-col">
          <div className="sticky top-0 z-10 bg-background">
            {editor ? (
              <>
                <EditorToolbar editor={editor} />
                <Separator />
              </>
            ) : null}
          </div>
          <EditorContent editor={editor} className="flex-auto px-2 py-5" />
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save &ldquo;{file.name}&ldquo;</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to update this
            file?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => onSave()} type="submit">
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
