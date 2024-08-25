import { createTRPCRouter } from "../../trpc";
import { listWorkspacesForUserGrouped } from "./list-for-user-grouped";
import { getWorkspaceByIdOrDefault } from "./get-by-id-or-default";
import { listWorkspacesForUser } from "./list-for-user";

export const workspacesRouter = createTRPCRouter({
  listForUserGrouped: listWorkspacesForUserGrouped,
  getByIdOrDefault: getWorkspaceByIdOrDefault,
  listForUser: listWorkspacesForUser,
});
