"use client";

import { z } from "zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1).max(255),
});

export type RenameFormProps = {
  referenceId: string;
  currentName: string;
  type: "folder" | "file";
};

export const RenameForm: FC<RenameFormProps> = ({
  referenceId,
  currentName,
  type,
}) => {
  const utils = api.useUtils();
  const filesRenameApi = api.files.rename.useMutation({
    onSettled: () => {
      form.reset();
      void utils.workspaces.content.invalidate();
    },
  });
  const foldersRenameApi = api.folders.rename.useMutation({
    onSettled: () => {
      form.reset();
      void utils.workspaces.content.invalidate();
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = type === "folder"
      ? foldersRenameApi.mutateAsync({
          id: referenceId,
          name: values.name,
        })
      : filesRenameApi.mutateAsync({
          id: referenceId,
          name: values.name,
        });

    toast.promise(promise, {
      loading: `Renaming ${type}...`,
      success: `${type} renamed to ${values.name}`,
      error: `Failed to rename ${type}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="text-right">
                New Name
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Documentation"
                  className="col-span-3"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit" disabled={!form.formState.isDirty}>
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};
