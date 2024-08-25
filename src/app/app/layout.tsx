import { COOKIE_CURRENT_WORKSPACE_ID } from "@/constants/cookies";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import {} from "@clerk/nextjs/server";
import { WorkspaceProvider } from "../../providers/workspace";
import { AppSidebar } from "./_components/sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  const currentWorkspaceId = cookies().get(COOKIE_CURRENT_WORKSPACE_ID);

  const defaultWorkspaceId = currentWorkspaceId
    ? (JSON.parse(currentWorkspaceId.value) as string)
    : undefined;

  return (
    <WorkspaceProvider initialWorkspaceId={defaultWorkspaceId}>
      <div className="flex min-h-screen w-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AppSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </WorkspaceProvider>
  );
}
