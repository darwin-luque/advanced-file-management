import { Fragment, type FC } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type AppBreadcrumbsProps = {
  paths: string[];
};

export const AppBreadcrumbs: FC<AppBreadcrumbsProps> = ({ paths }) => {
  const parsedPaths =
    paths.length > 4 ? [paths[0], "...", ...paths.slice(-3)] : paths;
  const leftoverPaths = paths.length > 4 ? paths.slice(1, -3) : [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parsedPaths.map((path, index) => (
          <Fragment key={`${path},${index}`}>
            <BreadcrumbItem>
              {path === "..." ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {leftoverPaths.map((leftoverPath, index) => (
                      <DropdownMenuItem key={`${leftoverPath},${index}`}>
                        {leftoverPath}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <BreadcrumbPage>{path}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < parsedPaths.length - 1 ? <BreadcrumbSeparator /> : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
