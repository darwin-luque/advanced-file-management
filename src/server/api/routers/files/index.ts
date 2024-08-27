import { createTRPCRouter } from "../../trpc";
import { getFileByPath } from "./by-path";
import { createFile } from "./create";

export const filesRouter = createTRPCRouter({
  create: createFile,
  getByPath: getFileByPath,
});
