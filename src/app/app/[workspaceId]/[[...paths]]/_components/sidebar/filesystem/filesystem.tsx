import { useMemo, type FC } from "react";
import { api } from "@/trpc/react";
import { FilesystemItem } from "./item";
import { FilesystemLoader } from "./loader";

export type FilesystemProps = {
  parentId: string;
  type: "workspace" | "folder";
  className?: string;
  workspaceId: string;
  allPaths?: string[];
  paths?: string[];
};

export const Filesystem: FC<FilesystemProps> = ({
  type,
  paths,
  allPaths,
  parentId,
  className,
  workspaceId,
}) => {
  const { data, isLoading } = api.workspaces.content.useQuery({
    referenceId: parentId,
    type,
  });

  const currentPath = useMemo(() => paths?.[0], [paths]);
  const filteredPaths = useMemo(() => paths?.slice(1), [paths]);

  return isLoading ? (
    <FilesystemLoader />
  ) : (
    <ul className={className}>
      {data?.map((node) => (
        <FilesystemItem
          workspaceId={workspaceId}
          node={node}
          key={node.id}
          defaultOpen={currentPath === node.name}
          nestedItems={
            <Filesystem
              workspaceId={workspaceId}
              parentId={node.id}
              type="folder"
              className="pl-3"
              allPaths={allPaths}
              paths={filteredPaths}
            />
          }
        />
      ))}
    </ul>
  );
};
