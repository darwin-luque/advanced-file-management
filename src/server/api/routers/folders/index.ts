import { createTRPCRouter } from "../../trpc";
import { createFolder } from "./create";

export const foldersRouter = createTRPCRouter({
  create: createFolder,
});
