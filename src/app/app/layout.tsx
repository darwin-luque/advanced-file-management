import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  const user = auth();

  if (!user) {
    redirect("/sign-in");
  }

  return children
}