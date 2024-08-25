import { COOKIE_CURRENT_WORKSPACE_ID } from "@/constants/cookies";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import {} from "@clerk/nextjs/server";
import { WorkspaceProvider } from "../../providers/workspace";

export default function AppLayout({ children }: PropsWithChildren) {
  const currentWorkspaceId = cookies().get(COOKIE_CURRENT_WORKSPACE_ID);

  const defaultWorkspaceId = currentWorkspaceId
    ? (JSON.parse(currentWorkspaceId.value) as string)
    : undefined;

  return (
    <WorkspaceProvider initialWorkspaceId={defaultWorkspaceId}>
      {children}
    </WorkspaceProvider>
  );
}
