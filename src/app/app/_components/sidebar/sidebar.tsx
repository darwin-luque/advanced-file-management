"use client";

import type { FC } from "react";
import { useWorkspace } from "@/providers/workspace";

export const AppSidebar: FC = () => {
  const { currentWorkspace } = useWorkspace();

  return (
    <div>
      <h2>{currentWorkspace?.name}</h2>
    </div>
  );
};
