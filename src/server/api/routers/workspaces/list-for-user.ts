import { eq, or } from "drizzle-orm";
import { workspaceCollaborators, workspaces } from "../../../db/schema";
import { privateProcedure } from "../../trpc";

export const listWorkspacesForUser = privateProcedure
  .query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        ownerId: workspaces.ownerId,
        isShared: workspaces.isShared,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
      })
      .from(workspaces)
      .leftJoin(
        workspaceCollaborators,
        eq(workspaceCollaborators.workspaceId, workspaces.id)
      )
      .where(
        or(
          eq(workspaces.ownerId, ctx.auth.userId ?? ""),
          eq(workspaceCollaborators.userId, ctx.auth.userId ?? "")
        )
      );
  });
