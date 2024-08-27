import type { FC } from "react";
import { api } from "@/trpc/react";
import { FilesystemItem } from "./item";
import { FilesystemLoader } from "./loader";

export type FilesystemProps = {
  parentId: string;
  type: "workspace" | "folder";
  className?: string;
  workspaceId: string;
};

export const Filesystem: FC<FilesystemProps> = ({
  type,
  parentId,
  className,
  workspaceId,
}) => {
  const { data, isLoading } = api.workspaces.content.useQuery({
    referenceId: parentId,
    type,
  });

  return isLoading ? (
    <FilesystemLoader />
  ) : (
    <ul className={className}>
      {data?.map((node) => (
        <FilesystemItem
          workspaceId={workspaceId}
          node={node}
          key={node.id}
          nestedItems={
            <Filesystem
              workspaceId={workspaceId}
              parentId={node.id}
              type="folder"
              className="pl-3"
            />
          }
        />
      ))}
    </ul>
  );
};
