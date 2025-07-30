import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// // Predefined color palette
// const USER_COLORS = [
//   "#FF4C4C",
//   "#4CAF50",
//   "#2196F3",
//   "#FFC107",
//   "#9C27B0",
//   "#00BCD4",
//   "#E91E63",
//   "#FF9800",
//   "#3F51B5",
//   "#8BC34A",
// ];

// // Assign a color based on user ID (stable)
// function getUserColor(userId: string): string {
//   let hash = 0;
//   for (let i = 0; i < userId.length; i++) {
//     hash = userId.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return USER_COLORS[Math.abs(hash) % USER_COLORS.length];
// }

// Define expected session claims
type CustomSessionClaims = {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
};

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { sessionClaims } = await auth();
  if (!sessionClaims) return new Response("Unauthorized", { status: 401 });

  const { o } = sessionClaims as CustomSessionClaims;
  const orgId = o?.id;

  const { room } = await req.json();

  const document = await convex.query(api.documents.getDocumentById, {
    id: room,
  });
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === orgId
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized not member", { status: 403 });
  }

  // const userColor = getUserColor(user.id);

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? "Anonymous",
      avatar: user.imageUrl,
      // color: userColor, Not supported by Type script
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
