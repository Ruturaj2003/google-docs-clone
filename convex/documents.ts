import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

/**
 * Query: Get paginated or searched documents
 * ------------------------------------------
 * - Accepts pagination options and optional search string
 * - If search is provided, uses search index to match titles
 * - Returns documents owned by the authenticated user
 */
export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    if (args.search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("ownerId", user.subject),
        )
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(args.paginationOpts);
  },
});

/**
 * Mutation: Create a new document
 * -------------------------------
 * - Accepts optional title and initial content
 * - Requires user to be authenticated
 * - Inserts a new document owned by the user
 */
export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

/**
 * Mutation: Delete a document by ID
 * ---------------------------------
 * - Requires user to be authenticated
 * - Verifies the document exists and is owned by the user
 * - Deletes the document if authorized
 */
export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

// Still in Progress

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
