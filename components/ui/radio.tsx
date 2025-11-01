/**
 * Radio Component
 * Radio button with label, error states, and accessibility
 */
'use client';

import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
}

/**
 * Radio component with label, error states, and accessibility
 * Use within a RadioGroup for proper grouping
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const radioId = id || useId();
    const errorId = `${radioId}-error`;
    const helperId = `${radioId}-helper`;

    return (
      <div className="w-full">
        <div className="flex items-start gap-4">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              'mt-1 w-6 h-6 border-2 border-[#cfcfcf] rounded-full',
              'text-[#d87d4a] focus:ring-2 focus:ring-[#d87d4a] focus:ring-offset-2',
              'cursor-pointer disabled:cursor-not-allowed',
              error && 'border-[#cd2c2c] focus:ring-[#cd2c2c]',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          />
          <div className="flex-1">
            <label
              htmlFor={radioId}
              className="block text-sm font-bold cursor-pointer"
            >
              {label}
              {props.required && (
                <span className="text-[#cd2c2c] ml-1" aria-label="required">*</span>
              )}
            </label>
            {helperText && !error && (
              <p id={helperId} className="mt-1 text-xs text-gray-600">
                {helperText}
              </p>
            )}
          </div>
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
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * RadioGroup Component
 * Groups radio buttons together with proper accessibility
 */
interface RadioGroupProps {
  children: React.ReactNode;
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
}

export function RadioGroup({ children, label, name, error, required }: RadioGroupProps) {
  const groupId = useId();
  const errorId = `${groupId}-error`;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-4">
          <span className="block text-xs font-bold">
            {label}
            {required && <span className="text-[#cd2c2c] ml-1" aria-label="required">*</span>}
          </span>
        </div>
      )}
      <div
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              name,
            });
          }
          return child;
        })}
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
    </div>
  );
}

