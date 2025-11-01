/**
 * Error Message Component
 * Displays error messages with proper ARIA attributes
 */
import { cn } from '@/lib/utils';

export interface ErrorMessageProps {
  error?: string;
  id?: string;
  className?: string;
}

/**
 * Error message component with accessibility
 * Uses role="alert" and aria-live for screen readers
 */
export function ErrorMessage({ error, id, className }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <p
      id={id}
      className={cn('mt-2 text-xs text-[#cd2c2c]', className)}
      role="alert"
      aria-live="polite"
    >
      {error}
    </p>
  );
}

