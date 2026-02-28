import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const sendMessage = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", { text: args.text });
  },
});