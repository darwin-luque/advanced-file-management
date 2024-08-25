import type { FC } from "react";
import { api } from "@/trpc/react";
import { FilesystemItem } from "./item";

export type FilesystemProps = {
  parentId: string;
  type: "workspace" | "folder";
  className?: string;
};

export const Filesystem: FC<FilesystemProps> = ({
  parentId,
  type,
  className,
}) => {
  const { data } = api.workspaces.content.useQuery({
    referenceId: parentId,
    type,
  });

  return (
    <ul className={className}>
      {data?.map((node) => (
        <FilesystemItem
          node={node}
          key={node.id}
          nestedItems={
            <Filesystem parentId={node.id} type="folder" className="pl-6" />
          }
        />
      ))}
    </ul>
  );
};
