/**
 * Input Component
 * Text input with error states, labels, and accessibility features
 */
'use client';

import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

/**
 * Input component with label, error states, and accessibility
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
    const inputId = id || useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold mb-2"
          >
            {label}
            {required && <span className="text-[#cd2c2c] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-6 py-[18px] text-sm font-bold border border-[#cfcfcf] rounded-none',
            'focus:outline-none focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a]',
            'placeholder:text-black placeholder:opacity-40',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error && 'border-[#cd2c2c] focus:border-[#cd2c2c] focus:ring-[#cd2c2c]',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 text-xs text-[#cd2c2c]"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-xs text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

