"use client";

import { type FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type MenuItemProps = {
  icon: JSX.Element;
  title: string;
  action: () => boolean;
  isActive?: () => boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  title,
  action,
  isActive,
}) => {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          variant={isActive?.() ? "secondary" : "ghost"}
          size="icon"
          onClick={action}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};
