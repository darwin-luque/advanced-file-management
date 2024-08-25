import { listWorkspacesForUserGrouped } from "./list-for-user-grouped";
import { getWorkspaceByIdOrDefault } from "./get-by-id-or-default";
import { listWorkspacesForUser } from "./list-for-user";
import { getContentForWorkspace } from "./content";
import { createTRPCRouter } from "@/server/api/trpc";

export const workspacesRouter = createTRPCRouter({
  listForUserGrouped: listWorkspacesForUserGrouped,
  getByIdOrDefault: getWorkspaceByIdOrDefault,
  listForUser: listWorkspacesForUser,
  content: getContentForWorkspace,
});
