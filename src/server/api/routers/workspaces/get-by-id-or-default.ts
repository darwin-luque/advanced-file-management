import { z } from "zod";
import { and, eq, isNotNull, or } from "drizzle-orm";
import { privateProcedure } from "@/server/api/trpc";
import { workspaceCollaborators, workspaces } from "@/server/db/schema";

export const getWorkspaceByIdOrDefault = privateProcedure
  .input(z.string().uuid().optional())
  .query(async ({ input, ctx }) => {
    const [workspace] = await ctx.db
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
        and(
          input ? eq(workspaces.id, input) : isNotNull(workspaces.id),
          or(
            eq(workspaceCollaborators.userId, ctx.auth.userId ?? ""),
            eq(workspaces.ownerId, ctx.auth.userId ?? "")
          )
        )
      );

    return workspace;
  });
