import { CheckIcon } from "lucide-react";
import { useMemo, type FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandItem } from "@/components/ui/command";
import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

export type WorkspaceSelectorItemProps = {
  selected?: boolean;
  workspace: RouterOutputs["workspaces"]["listForUserGrouped"]["memberOf"][number];
  onSelect: () => void;
};

export const WorkspaceSelectorItem: FC<WorkspaceSelectorItemProps> = ({
  workspace,
  selected,
  onSelect,
}) => {
  const workspaceShort = useMemo(
    () =>
      workspace?.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 3) ?? "WS",
    [workspace?.name],
  );

  return (
    <CommandItem onSelect={onSelect} className="text-sm">
      <Avatar className="mr-2 h-6 w-6">
        <AvatarFallback>{workspaceShort}</AvatarFallback>
      </Avatar>
      {workspace.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          selected ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
};
