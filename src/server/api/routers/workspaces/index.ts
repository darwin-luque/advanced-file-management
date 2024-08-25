import { createTRPCRouter } from "../../trpc";
import { getWorkspaceByIdOrDefault } from "./get-by-id-or-default";

export const workspacesRouter = createTRPCRouter({
  getByIdOrDefault: getWorkspaceByIdOrDefault,
});
