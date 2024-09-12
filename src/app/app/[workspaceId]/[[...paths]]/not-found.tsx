"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { buttonVariants } from "../../../../components/ui/button";

export default function NotFound() {
  const { paths, workspaceId } = useParams<{
    paths: string[];
    workspaceId: string;
  }>();

  const joindPath = useMemo(
    () => "/" + paths.map((path) => decodeURI(path)).join("/"),
    [paths],
  );

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        Not Found
      </h2>
      <p className="text-sm text-muted-foreground">
        The file at {joindPath} was not found
      </p>
      <div className="flex items-center p-6 pt-0">
        <Link
          className={buttonVariants({ size: "lg" })}
          href={`/app/${workspaceId}`}
        >
          Return to safety
        </Link>
      </div>
    </div>
  );
}
