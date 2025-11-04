/**
 * Convex Orders Functions
 * 
 * This file contains the Convex backend functions for handling orders.
 * When a customer completes checkout, the order data is saved here.
 * 
 * Convex is a backend-as-a-service that handles database operations.
 * This file defines:
 * - create: Saves a new order to the database
 * - get: Retrieves an order by ID
 */

import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

/**
 * Create a new order
 * 
 * This function is called from the checkout form when a customer
 * completes checkout. It saves all the order details to the database:
 * - Customer information (name, email, phone)
 * - Shipping address
 * - Items ordered (with full product details)
 * - Order totals (subtotal, shipping, tax, grand total)
 * 
 * Returns the order ID which is used for the confirmation email.
 */
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
    /**
     * Save the order to the database
     * 
     * We insert all the order data into the 'orders' table.
     * Convex automatically generates an ID for the order,
     * which we return to the frontend.
     */
    const orderId = await ctx.db.insert('orders', {
      customer: args.customer,      // Customer name, email, phone
      shipping: args.shipping,      // Shipping address
      items: args.items,            // Array of items ordered
      totals: args.totals,          // Order totals
      status: 'confirmed',          // Order status
      createdAt: Date.now(),         // Timestamp when order was created
    });
    
    // Return the order ID - this is used for the confirmation email
    return orderId;
  },
});

/**
 * Get an order by ID
 * 
 * This function retrieves a specific order from the database.
 * It's useful for displaying order details on an order confirmation page.
 */
export const get = query({
  args: { id: v.id('orders') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

