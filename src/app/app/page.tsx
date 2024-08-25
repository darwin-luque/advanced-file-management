import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { NotebookPen, PlusCircle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { api } from "@/trpc/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function AppPage() {
  const workspaces = await api.workspaces.listForUserGrouped();

  return (
    <Dialog>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/app"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <NotebookPen className="h-6 w-6" />
              <span>Advance File Manager</span>
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <UserButton />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <h1 className="text-2xl font-semibold">Workspaces</h1>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Owned workspaces</h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <DialogTrigger className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex h-full w-full items-center justify-center gap-4">
                  <PlusCircle className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Create New Workspace</h3>
                </div>
              </DialogTrigger>
              {workspaces.owned.map((workspace) => (
                <Link href={`/app/${workspace.id}`} key={workspace.id}>
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-bold">{workspace.name}</h3>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New workpsace</DialogTitle>
          <DialogDescription>
            Create a new personal workpsace to manage your files
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
