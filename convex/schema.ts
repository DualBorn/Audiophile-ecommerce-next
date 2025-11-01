/**
 * Convex Schema
 * Defines the data model for the Audiophile e-commerce app
 */
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  orders: defineTable({
    // Customer information
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    // Shipping information
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      country: v.string(),
      zip: v.string(),
    }),
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    // Totals
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      taxes: v.number(),
      grandTotal: v.number(),
    }),
    // Order status
    status: v.union(v.literal('confirmed'), v.literal('pending'), v.literal('cancelled')),
    // Timestamp
    createdAt: v.number(),
  }),
});

