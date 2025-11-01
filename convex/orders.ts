/**
 * Convex Orders Functions
 * Handles order creation and retrieval
 */
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      country: v.string(),
      zip: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      taxes: v.number(),
      grandTotal: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert('orders', {
      customer: args.customer,
      shipping: args.shipping,
      items: args.items,
      totals: args.totals,
      status: 'confirmed',
      createdAt: Date.now(),
    });
    return orderId;
  },
});

export const get = query({
  args: { id: v.id('orders') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

