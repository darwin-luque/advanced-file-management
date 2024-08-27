import { NoDocIcon } from "@/components/assets/icons/no-doc";
import { AppEditor } from "./_components/editor";
import { api } from "@/trpc/server";

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
  const file = await api.files.getByPath(`/${paths.join("/")}`);

  return (
    <main className="relative flex h-full w-full flex-col">
      <AppEditor paths={paths} file={file} />
    </main>
  );
}
