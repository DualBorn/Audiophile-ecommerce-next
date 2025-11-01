/**
 * Typography Components
 * H1-H6, Overline, Body, Subtitle components matching Figma design
 * Uses exact font sizes, line-heights, letter-spacing, and weights
 */

import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

// Base typography props
interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * H1 - Heading 1
 * Figma: 56px / 58px / 2px / 700
 */
export function H1({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[56px] leading-[58px] tracking-[2px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * H2 - Heading 2
 * Figma: 40px / 44px / 1.5px / 700
 */
export function H2({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[40px] leading-[44px] tracking-[1.5px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * H3 - Heading 3
 * Figma: 32px / 36px / 1.15px / 700
 */
export function H3({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[32px] leading-[36px] tracking-[1.15px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * H4 - Heading 4
 * Figma: 28px / 38px / 2px / 700
 */
export function H4({ children, className, as: Component = 'h4' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[28px] leading-[38px] tracking-[2px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * H5 - Heading 5
 * Figma: 24px / 33px / 1.7px / 700
 */
export function H5({ children, className, as: Component = 'h5' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[24px] leading-[33px] tracking-[1.7px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * H6 - Heading 6
 * Figma: 18px / 24px / 1.3px / 700
 */
export function H6({ children, className, as: Component = 'h6' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[18px] leading-[24px] tracking-[1.3px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Overline - Small uppercase text
 * Figma: 14px / 19px / 10px / 400 / uppercase
 */
export function Overline({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[14px] leading-[19px] tracking-[10px] font-normal uppercase',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Subtitle - Subtitle text
 * Figma: 13px / 25px / 1px / 700
 */
export function Subtitle({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[13px] leading-[25px] tracking-[1px] font-bold',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Body - Body text
 * Figma: 15px / 25px / 500
 */
export function Body({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[15px] leading-[25px] font-medium',
        className
      )}
    >
      {children}
    </Component>
  );
}

