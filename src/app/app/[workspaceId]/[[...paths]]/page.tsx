import { NoDocIcon } from "@/components/assets/icons/no-doc";

export default function AppPage() {
  return (
    <main className="flex items-center flex-col text-center gap-4">
      <NoDocIcon />
      <p className="text-lg font-bold">Select a document to start editing</p>
    </main>
  );
}
