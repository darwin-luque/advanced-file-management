import {
  COOKIE_APP_RESIZABLE_PANELS_COLLAPSED,
  COOKIE_APP_RESIZABLE_PANELS_LAYOUT,
} from "@/constants/cookies";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import { AppResizableLayout } from "./_components/resizable-layout/resizable-layout";

export default function AppLayout({ children }: PropsWithChildren) {
  const layout = cookies().get(COOKIE_APP_RESIZABLE_PANELS_LAYOUT);
  const collapsed = cookies().get(COOKIE_APP_RESIZABLE_PANELS_COLLAPSED);

  const defaultLayout = layout
    ? (JSON.parse(layout.value) as [number, number])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <AppResizableLayout
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
      navCollapsedSize={4}
    >
      {children}
    </AppResizableLayout>
  );
}
