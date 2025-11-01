/**
 * Button Component
 * Primary, Secondary, and Ghost variants with hover/disabled states
 * Accessible button implementation
 */
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Button component with multiple variants
 * - Primary: Orange background, white text
 * - Secondary: Transparent border, hover fill
 * - Ghost: Transparent, hover underline
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading = false, className, disabled, children, ...props }, ref) => {
    const baseStyles = 
      'inline-flex items-center justify-center px-8 py-[15px] text-sm font-bold uppercase tracking-[1px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 
        'bg-[#d87d4a] text-white hover:bg-[#fbaf85] focus:ring-[#d87d4a] active:bg-[#d87d4a]',
      secondary:
        'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white focus:ring-black active:bg-black active:text-white',
      ghost:
        'bg-transparent text-black opacity-50 hover:opacity-100 hover:underline focus:ring-black active:opacity-100',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

