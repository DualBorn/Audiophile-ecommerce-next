/**
 * Select Component
 * Dropdown select with error states, labels, and accessibility
 */
'use client';

import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'placeholder'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

/**
 * Select component with label, error states, and accessibility
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, required, options, className, id, ...props }, ref) => {
    const selectId = id || useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold mb-2"
          >
            {label}
            {required && <span className="text-[#cd2c2c] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-6 py-[18px] text-sm font-bold border border-[#cfcfcf] rounded-none appearance-none',
              'bg-white bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat',
              'focus:outline-none focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a]',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              error && 'border-[#cd2c2c] focus:border-[#cd2c2c] focus:ring-[#cd2c2c]',
              className
            )}
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-required={required}
            {...props}
          >
            {props.placeholder && (
              <option value="" disabled>
                {props.placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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

Select.displayName = 'Select';

