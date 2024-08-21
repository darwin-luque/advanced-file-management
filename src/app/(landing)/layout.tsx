import type { PropsWithChildren } from "react";
import { LandingNavbar } from "./_components/navbar";

export default function LandingLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>
  );
}
