"use client";

import { useMemo, type FC } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WorkspaceSelectorItem } from "./item";
import { api } from "@/trpc/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export type WorkspaceSelectorProps = {
  workspaceId: string;
};

export const WorkspaceSelector: FC<WorkspaceSelectorProps> = ({
  workspaceId,
}) => {
  const { data: currentWorkspace } =
    api.workspaces.getByIdOrDefault.useQuery(workspaceId);
  const { data: workspaces } = api.workspaces.listForUserGrouped.useQuery();
  const router = useRouter();

  const onWorkspaceSelected = (id: string) => {
    router.push(`/app/${id}`);
  };

  const workspaceShort = useMemo(
    () =>
      currentWorkspace?.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 3) ?? "WS",
    [currentWorkspace?.name],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a team"
          className="justify-between"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarFallback className="text-xs">
              {workspaceShort}
            </AvatarFallback>
          </Avatar>
          {currentWorkspace?.name ?? "Select a workspace"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandEmpty>
              You do not own or are part of any workspace
            </CommandEmpty>
            {!!workspaces ? (
              <>
                {workspaces?.owned.length > 0 ? (
                  <CommandGroup heading="Owned">
                    {workspaces.owned.map((workspace) => (
                      <WorkspaceSelectorItem
                        key={workspace.id}
                        workspace={workspace}
                        selected={workspace.id === workspaceId}
                        onSelect={() => onWorkspaceSelected(workspace.id)}
                      />
                    ))}
                  </CommandGroup>
                ) : null}
                {workspaces?.memberOf.length > 0 ? (
                  <CommandGroup heading="Member Of">
                    {workspaces.memberOf.map((workspace) => (
                      <WorkspaceSelectorItem
                        key={workspace.id}
                        workspace={workspace}
                        selected={workspace.id === workspaceId}
                        onSelect={() => onWorkspaceSelected(workspace.id)}
                      />
                    ))}
                  </CommandGroup>
                ) : null}
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
