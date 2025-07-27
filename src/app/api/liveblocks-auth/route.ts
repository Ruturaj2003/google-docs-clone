import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// Define the structure of expected session claims
type CustomSessionClaims = {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
};

export async function POST(req: Request) {
  // Validate authenticated user
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get session claims (JWT payload)
  const { sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Extract organization ID from session claims
  const { o } = sessionClaims as CustomSessionClaims;
  const orgId = o?.id;

  // Parse request body
  const { room } = await req.json();

  // Fetch document details from Convex
  const document = await convex.query(api.documents.getDocumentById, {
    id: room,
  });

  // Check access: owner or member of the same organization
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === orgId
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized not member", { status: 403 });
  }

  // Prepare Liveblocks session for real-time collaboration
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? "Ano-nni-muss",
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  // Authorize and return Liveblocks session
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
