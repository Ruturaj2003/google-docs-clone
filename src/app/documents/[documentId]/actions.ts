"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
// Define the structure of expected session claims
type CustomSessionClaims = {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
};

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getDocumentByIds, { ids });
}

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
