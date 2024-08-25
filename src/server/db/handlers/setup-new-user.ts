import type { UserJSON } from "@clerk/nextjs/server";
import { db } from "../index";
import { folders, users, workspaces } from "../schema";

export const setupNewUser = async (user: UserJSON): Promise<void> => {
  const [newUser] = await db
    .insert(users)
    .values({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      hasImage: user.has_image,
      imageUrl: user.image_url,
      banned: user.banned,
      locked: user.locked,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    })
    .returning();

  if (!newUser) {
    throw new Error("Failed to create new user");
  }

  const userName =
    user.username ??
    (user.first_name || user.last_name
      ? `${user.first_name}${user.first_name && user.last_name ? " " : ""}${user.last_name}`
      : "Personal");

  const [newWorkspace] = await db
    .insert(workspaces)
    .values({
      name: `${userName}'s Workspace`,
      ownerId: newUser.id,
      isDefault: true,
    })
    .returning();

  if (!newWorkspace) {
    return;
  }

  await db
    .insert(folders)
    .values({
      name: "Home",
      ownerId: newUser.id,
      workspaceId: newWorkspace.id,
    })
    .returning();
};
