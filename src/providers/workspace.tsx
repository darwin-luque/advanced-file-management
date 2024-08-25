"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";
import { api, type RouterOutputs } from "../trpc/react";
import { COOKIE_CURRENT_WORKSPACE_ID } from "../constants/cookies";

type WorkspaceContextType = {
  changeWorkspace: (workspaceId: string) => void;
  currentWorkspace: RouterOutputs["workspaces"]["getByIdOrDefault"];
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const WorkspaceContext = createContext<WorkspaceContextType>();

export type WorkspaceProviderProps = PropsWithChildren & {
  initialWorkspaceId?: string;
};

export const WorkspaceProvider: FC<WorkspaceProviderProps> = ({
  children,
  initialWorkspaceId,
}) => {
  const [workspaceId, setWorkspaceId] = useState(initialWorkspaceId);
  const {
    data: currentWorkspace,
    isLoading,
    refetch,
  } = api.workspaces.getByIdOrDefault.useQuery(workspaceId);

  const changeWorkspace = (workspaceId: string) => {
    setWorkspaceId(() => {
      void refetch();
      document.cookie = `${COOKIE_CURRENT_WORKSPACE_ID}=${JSON.stringify(workspaceId)}`;
      return workspaceId;
    });
  };

  return (
    <WorkspaceContext.Provider
      value={{ currentWorkspace, isLoading, changeWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
