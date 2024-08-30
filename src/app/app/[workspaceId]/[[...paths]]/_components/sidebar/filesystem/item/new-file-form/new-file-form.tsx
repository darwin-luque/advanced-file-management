import { toast } from "sonner";
import type { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1),
});

export type NewFileFormProps = {
  folderId: string;
  workspaceId: string;
};

export const NewFileForm: FC<NewFileFormProps> = ({
  folderId,
  workspaceId,
}) => {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const createFile = api.files.create.useMutation({
    onSettled: () => {
      form.reset();
      void utils.workspaces.content.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = createFile.mutateAsync({
      folderId,
      name: values.name,
      workspaceId,
    });

    toast.promise(promise, {
      loading: "Creating folder...",
      success: (data) => `File ${data.name} created`,
      error: "Failed to create folder",
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
                Name
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Meeting notes 2021-09-01"
                  className="col-span-3"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};
