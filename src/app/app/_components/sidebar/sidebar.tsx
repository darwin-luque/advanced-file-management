"use client";

import Link from "next/link";
import type { FC } from "react";
import { Bell, Menu, NotebookPen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "../../../../providers/workspace";
import { Filesystem } from "./filesystem";
import { ScrollArea } from "../../../../components/ui/scroll-area";

export const AppSidebar: FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <NotebookPen className="h-6 w-6" />
              <span className="">AFM</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <ScrollArea className="flex-1 scroll-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {currentWorkspace ? (
                <div className="mt-1">
                  <Filesystem parentId={currentWorkspace.id} type="workspace" />
                </div>
              ) : null}
            </nav>
          </ScrollArea>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <NotebookPen className="h-6 w-6" />
                  <span className="">AFM</span>
                </Link>
                {currentWorkspace ? (
                  <div className="mx-2 mt-1">
                    <Filesystem
                      parentId={currentWorkspace.id}
                      type="workspace"
                    />
                  </div>
                ) : null}
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  );
};
