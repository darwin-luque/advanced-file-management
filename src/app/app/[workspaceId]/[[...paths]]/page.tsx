import { NoDocIcon } from "@/components/assets/icons/no-doc";
import { api } from "../../../../trpc/server";
import { AppEditor } from "./_components/editor";

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

  const joinedPath = params.paths.map((path) => decodeURI(path)).join("/");
  const file = await api.files.getByPath(`/${joinedPath}`);

  return (
    <main className="relative flex w-full h-full flex-col">
      <AppEditor file={file} />
    </main>
  )
}
