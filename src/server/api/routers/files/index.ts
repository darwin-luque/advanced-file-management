import { createTRPCRouter } from "@/server/api/trpc";
import { updateFileContent } from "./update-content";
import { getFileByPath } from "./by-path";
import { createFile } from "./create";
import { renameFile } from "./rename";

export const filesRouter = createTRPCRouter({
  create: createFile,
  rename: renameFile,
  getByPath: getFileByPath,
  updateContent: updateFileContent,
});
