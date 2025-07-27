"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
// Define the structure of expected session claims
type CustomSessionClaims = {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
};
export async function getUsers() {
  const clerk = await clerkClient();

  const { sessionClaims } = await auth();
  const { o } = sessionClaims as CustomSessionClaims;
  const orgId = o?.id;

  const response = await clerk.users.getUserList({
    organizationId: [orgId as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Antoninus",
    avatar: user.imageUrl,
  }));
  return users;
}
