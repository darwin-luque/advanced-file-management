import { createTRPCRouter } from "../../trpc";
import { createFolder } from "./create";
import { deleteFolder } from "./delete";
import { renameFolder } from "./rename";

export const foldersRouter = createTRPCRouter({
  create: createFolder,
  rename: renameFolder,
  delete: deleteFolder,
});
