import {
  COOKIE_APP_RESIZABLE_PANELS_COLLAPSED,
  COOKIE_APP_RESIZABLE_PANELS_LAYOUT,
  COOKIE_CURRENT_WORKSPACE_ID,
} from "@/constants/cookies";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import { AppResizableLayout } from "./_components/resizable-layout";
import {} from "@clerk/nextjs/server";
import { WorkspaceProvider } from "../../providers/workspace";
import { AppSidebar } from "./_components/sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  const currentWorkspaceId = cookies().get(COOKIE_CURRENT_WORKSPACE_ID);
  const layout = cookies().get(COOKIE_APP_RESIZABLE_PANELS_LAYOUT);
  const collapsed = cookies().get(COOKIE_APP_RESIZABLE_PANELS_COLLAPSED);

  const defaultLayout = layout
    ? (JSON.parse(layout.value) as [number, number])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;
  const defaultWorkspaceId = currentWorkspaceId
    ? (JSON.parse(currentWorkspaceId.value) as string)
    : undefined;

  return (
    <WorkspaceProvider initialWorkspaceId={defaultWorkspaceId}>
      <AppResizableLayout
        defaultCollapsed={defaultCollapsed}
        defaultLayout={defaultLayout}
        navCollapsedSize={4}
        sidebar={<AppSidebar />}
      >
        {children}
      </AppResizableLayout>
    </WorkspaceProvider>
  );
}
