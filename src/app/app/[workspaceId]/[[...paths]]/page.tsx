import { NoDocIcon } from "@/components/assets/icons/no-doc";

export type AppPageProps = {
  params: {
    paths?: string[];
  };
};

export default function AppPage({ params }: AppPageProps) {
  if (!params.paths || params.paths.length === 0) {
    return (
      <main className="flex flex-col items-center gap-4 text-center">
        <NoDocIcon />
        <p className="text-lg font-bold">Select a document to start editing</p>
      </main>
    );
  }
  return <div>Document: {params.paths.map((path) => decodeURI(path)).join("/")}</div>;
}
