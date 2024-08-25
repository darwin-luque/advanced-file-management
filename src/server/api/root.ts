import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { workspacesRouter } from "./routers/workspaces";
import { foldersRouter } from "./routers/folders";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
  folders: foldersRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
