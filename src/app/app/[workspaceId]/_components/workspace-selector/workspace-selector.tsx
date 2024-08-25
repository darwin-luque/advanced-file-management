import { useMemo, useState, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useWorkspace } from "@/providers/workspace";
import { api, type RouterOutputs } from "@/trpc/react";

const WorkspaceAvatar: FC<{
  workspace?: RouterOutputs["workspaces"]["listForUserGrouped"]["memberOf"][number];
}> = ({ workspace }) => (
  <Avatar className="mr-2 h-5 w-5">
    <AvatarFallback>
      {workspace?.name
        .split(" ")
        .map((n) => n[0])
        .join("") ?? "W"}
    </AvatarFallback>
  </Avatar>
);

export type WorkspaceSelectorProps = {
  className?: string;
  isCollapsed?: boolean;
};

export const WorkspaceSelector: FC<WorkspaceSelectorProps> = ({
  className,
  isCollapsed = false,
}) => {
  const [open, setOpen] = useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const { data } = api.workspaces.listForUserGrouped.useQuery();
  const groupedWorkspace = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Owned", workspaces: data.owned },
      { name: "Member of", workspaces: data.memberOf },
    ];
  }, [data]);

  return (
    <Dialog
      open={showNewWorkspaceDialog}
      onOpenChange={setShowNewWorkspaceDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
              className,
              isCollapsed &&
                "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
            )}
          >
            <WorkspaceAvatar workspace={currentWorkspace} />
            <span className={cn("ml-2", isCollapsed && "hidden")}>
              {currentWorkspace?.name}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search team..." />
            <CommandList>
              <CommandEmpty>No workspace found.</CommandEmpty>
              {groupedWorkspace?.map((group) => (
                <CommandGroup key={group.name} heading={group.name}>
                  {group.workspaces.map((workspace) => (
                    <CommandItem
                      key={workspace.id}
                      onSelect={() => {
                        changeWorkspace(workspace.id);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <WorkspaceAvatar workspace={workspace} />
                      {workspace.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          workspace.id === currentWorkspace?.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <CirclePlus className="mr-2 h-5 w-5" />
                    Create Workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewWorkspaceDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
