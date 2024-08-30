import { createTRPCRouter } from "@/server/api/trpc";
import { updateFileContent } from "./update-content";
import { getFileByPath } from "./by-path";
import { createFile } from "./create";

export const filesRouter = createTRPCRouter({
  create: createFile,
  getByPath: getFileByPath,
  updateContent: updateFileContent,
});
