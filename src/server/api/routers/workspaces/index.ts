import { createTRPCRouter } from "../../trpc";
import { getWorkspaceByIdOrDefault } from "./get-by-id-or-default";
import { listWorkspacesForUser } from "./list-for-user";

export const workspacesRouter = createTRPCRouter({
  getByIdOrDefault: getWorkspaceByIdOrDefault,
  listForUser: listWorkspacesForUser,
});
