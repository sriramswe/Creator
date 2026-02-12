import { query } from "./_generated/server";

export const getFeatures = query({
  handler: async (ctx) => {
    return await ctx.db.query("features").collect();
  },
});

export const getSocialProofStats = query({
  handler: async (ctx) => {
    return await ctx.db.query("socialProofStats").collect();
  },
});

export const getTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

export const getPlatformTabs = query({
  handler: async (ctx) => {
    return await ctx.db.query("platformTabs").collect();
  },
});