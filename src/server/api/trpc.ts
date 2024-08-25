import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";
import type { NextRequest } from 'next/server';
import { db } from "@/server/db";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import { workspaceCollaborators, workspaces } from "../db/schema";
import { and, eq, or } from "drizzle-orm";

export const createTRPCContext = async (opts: { headers: Headers; req: NextRequest; }) => {
  const auth = clerkAuth();

  return {
    db,
    auth,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

export const privateProcedure = t.procedure.use(authMiddleware);

export const workspaceProcedure = t.procedure
  .use(authMiddleware)
  .input(z.object({ workspaceId: z.string().uuid() }))
  .use(async ({ ctx, next, input }) => {
    const [workspace] = await ctx.db
      .select({ id: workspaces.id })
      .from(workspaces)
      .leftJoin(
        workspaceCollaborators,
        eq(workspaceCollaborators.workspaceId, workspaces.id)
      )
      .where(
        and(
          eq(workspaces.id, input.workspaceId),
          or(
            eq(workspaceCollaborators.userId, ctx.auth.userId ?? ""),
            eq(workspaces.ownerId, ctx.auth.userId ?? "")
          )
        )
      );

    if (!workspace) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Workspace not found",
      });
    }

    return next({
      ctx: {
        ...ctx,
        workspace,
      }
    });
  });
