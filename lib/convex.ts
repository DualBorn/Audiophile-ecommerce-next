/**
 * Convex client setup
 */
import { ConvexReactClient } from 'convex/react'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || ''

// Log the Convex URL for debugging (first few chars only for security)
if (convexUrl) {
  console.log('🔗 Convex URL configured:', convexUrl.substring(0, 30) + '...')
} else {
  console.warn('⚠️ NEXT_PUBLIC_CONVEX_URL is not set in environment variables!')
}

export const convex = new ConvexReactClient(convexUrl)

