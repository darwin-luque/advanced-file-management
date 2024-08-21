import type { PropsWithChildren } from "react";
import { LandingNavbar } from "./_components/navbar";

export default function LandingLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      {children}
    </div>
  );
}
