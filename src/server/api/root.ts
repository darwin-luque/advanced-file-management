import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { workspacesRouter } from "./routers/workspaces";
import { foldersRouter } from "./routers/folders";
import { filesRouter } from "./routers/files";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
  folders: foldersRouter,
  files: filesRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
