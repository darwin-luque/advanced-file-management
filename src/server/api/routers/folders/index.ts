import { createTRPCRouter } from "../../trpc";
import { createFolder } from "./create";
import { renameFolder } from "./rename";

export const foldersRouter = createTRPCRouter({
  create: createFolder,
  rename: renameFolder,
});
