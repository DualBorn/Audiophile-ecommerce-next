/**
 * Label Component
 * Accessible label with required indicator support
 */
'use client';

import { LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Label component with required indicator
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block text-xs font-bold', className)}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[#cd2c2c] ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

