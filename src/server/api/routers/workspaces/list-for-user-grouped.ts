import { eq } from "drizzle-orm";
import { workspaceCollaborators, workspaces } from "../../../db/schema";
import { privateProcedure } from "../../trpc";

export const listWorkspacesForUserGrouped = privateProcedure
  .query(async ({ ctx }) => {
    const owned = await ctx.db.query.workspaces.findMany({
      where(fields, { eq }) {
        return eq(fields.ownerId, ctx.auth.userId ?? "");
      },
    });

    const memberOf = await ctx.db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
        ownerId: workspaces.ownerId,
        isShared: workspaces.isShared,
      })
      .from(workspaces)
      .innerJoin(workspaceCollaborators, eq(workspaces.id, workspaceCollaborators.workspaceId))
      .where(eq(workspaceCollaborators.userId, ctx.auth.userId ?? ""));

    return { owned, memberOf };
  });
