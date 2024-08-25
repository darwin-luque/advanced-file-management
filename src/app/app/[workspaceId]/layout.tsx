import type { PropsWithChildren } from "react";
import {} from "@clerk/nextjs/server";
import { AppSidebar } from "./_components/sidebar";

export type AppLayoutProps = PropsWithChildren & {
  params: {
    workspaceId: string;
  };
};

export default function AppLayout({ children, params }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AppSidebar workspaceId={params.workspaceId} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </div>
  );
}
