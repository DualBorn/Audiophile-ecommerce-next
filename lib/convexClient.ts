/**
 * Convex client setup
 * Server-side client for Convex mutations/queries
 */
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}

// Create HTTP client for server-side operations
export const convexClient = new ConvexHttpClient(CONVEX_URL);

export { api };

