"use client";

import Link from "next/link";
import type { FC } from "react";
import { Menu, NotebookPen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filesystem } from "./filesystem";
import { WorkspaceSelector } from "./workspace-selector";
import { UserButton } from "@clerk/nextjs";

export type AppSidebarProps = {
  workspaceId: string;
  paths?: string[];
};

export const AppSidebar: FC<AppSidebarProps> = ({ workspaceId, paths }) => {
  return (
    <>
      <div className="hidden h-screen border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app" className="flex items-center gap-2 font-semibold">
              <NotebookPen className="h-6 w-6" />
              <span className="sr-only">AFM</span>
            </Link>
            <div className="ml-auto h-8 w-8">
              <UserButton />
            </div>
          </div>
          <div className="my-2 flex h-14 items-center justify-center border-b">
            <WorkspaceSelector workspaceId={workspaceId} />
          </div>
          <nav className="mx-2 my-2 grid flex-1 items-start overflow-scroll rounded-md bg-muted/30 text-sm font-medium lg:px-4">
            <div className="mt-1">
              <Filesystem
                workspaceId={workspaceId}
                parentId={workspaceId}
                type="workspace"
                allPaths={paths}
                paths={paths}
              />
            </div>
          </nav>
        </div>
      </div>
      <div className="flex shrink-0 flex-col md:hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-full flex-col p-0">
              <nav className="flex flex-1 flex-col items-center text-lg font-medium">
                <div className="flex h-14 w-full items-center border-b px-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <NotebookPen className="h-6 w-6" />
                    <span className="">AFM</span>
                  </Link>
                </div>
                <div className="h-full w-full overflow-scroll px-1">
                  <Filesystem
                    workspaceId={workspaceId}
                    parentId={workspaceId}
                    type="workspace"
                    allPaths={paths}
                    paths={paths}
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  );
};
