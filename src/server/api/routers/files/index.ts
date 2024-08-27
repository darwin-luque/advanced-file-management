import { createTRPCRouter } from "../../trpc";
import { createFile } from "./create";

export const filesRouter = createTRPCRouter({
  create: createFile,
});
