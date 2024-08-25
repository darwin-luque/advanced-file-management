import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { workspacesRouter } from "./routers/workspaces";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
