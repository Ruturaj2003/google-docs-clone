import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

/**
 * QUERY: Get paginated or searched documents
 * ------------------------------------------
 * - Requires authentication
 * - Accepts pagination options and optional search string
 * - Uses full-text search on title (if search provided)
 * - Filters by organizationId (if present), else by user ID
 */
export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    // Search + Org filter
    if (args.search && organizationId) {
      return ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("organizationId", organizationId),
        )
        .paginate(args.paginationOpts);
    }

    // Search + User filter
    if (args.search) {
      return ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("ownerId", user.subject),
        )
        .paginate(args.paginationOpts);
    }

    // No search → default by Org
    if (organizationId) {
      return ctx.db
        .query("documents")
        .withIndex("by_organizationId", (q) =>
          q.eq("organizationId", organizationId),
        )
        .paginate(args.paginationOpts);
    }

    // No search → default by user
    return ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(args.paginationOpts);
  },
});

/**
 * MUTATION: Create a new document
 * -------------------------------
 * - Requires authentication
 * - Accepts optional title and content
 * - Sets default title if not provided
 */
export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    return ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

/**
 * MUTATION: Delete a document by ID
 * ---------------------------------
 * - Requires authentication
 * - Checks if document exists and user is the owner
 * - Deletes the document if authorized
 */
export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    return ctx.db.delete(args.id);
  },
});

/**
 * MUTATION: Update document title by ID
 * -------------------------------------
 * - Requires authentication
 * - Checks ownership before updating title
 */
export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    return ctx.db.patch(args.id, { title: args.title });
  },
});
