/**
 * Utility functions
 * Includes cn() for className merging
 */
import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names using clsx
 * Useful for conditional styling and merging Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

