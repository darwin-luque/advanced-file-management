import type { PropsWithChildren } from "react";
import { AppSidebar } from "./_components/sidebar";

export type AppLayoutProps = PropsWithChildren & {
  params: {
    workspaceId: string;
    paths: string[];
  };
};

export default function AppLayout({ children, params }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AppSidebar
        workspaceId={params.workspaceId}
        paths={params.paths?.map(decodeURI)}
      />
      <div className="flex max-h-screen flex-1 items-center justify-center gap-4 overflow-auto p-4 lg:gap-6 lg:p-6">
        {children}
      </div>
    </div>
  );
}
