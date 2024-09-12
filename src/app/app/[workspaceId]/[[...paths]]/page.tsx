import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { AppEditor } from "./_components/editor";
import { NoDocIcon } from "@/components/assets/icons/no-doc";

export type AppPageProps = {
  params: {
    paths?: string[];
  };
};

export default async function AppPage({ params }: AppPageProps) {
  if (!params.paths || params.paths.length === 0) {
    return (
      <main className="flex flex-col items-center gap-4 text-center">
        <NoDocIcon />
        <p className="text-lg font-bold">Select a document to start editing</p>
      </main>
    );
  }

  const paths = params.paths.map((path) => decodeURI(path));
  const file = await api.files.getByPath(`/${paths.join("/")}`)
    .catch((err) => {
      if (err instanceof TRPCError && err.code === "NOT_FOUND") {
        notFound();
      }

      throw err;
    });

  return (
    <main className="relative flex h-full w-full flex-col">
      <AppEditor paths={paths} file={file} />
    </main>
  );
}
