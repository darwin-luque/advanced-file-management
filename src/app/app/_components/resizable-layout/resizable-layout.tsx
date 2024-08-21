"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { COOKIE_APP_RESIZABLE_PANELS_LAYOUT } from "@/constants/cookies";
import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { useState } from "react";

export type AppResizableLayoutProps = PropsWithChildren & {
  defaultLayout?: [number, number];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  sidebar?: ReactNode;
};

export const AppResizableLayout: FC<AppResizableLayoutProps> = ({
  sidebar,
  children,
  navCollapsedSize,
  defaultLayout = [20, 80],
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `${COOKIE_APP_RESIZABLE_PANELS_LAYOUT}=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full min-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onResize={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
      >
        {sidebar}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
