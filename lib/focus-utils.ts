/**
 * Focus Management Utilities
 * Functions for managing focus traps in modals/drawers
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(
  container: HTMLElement | null
): HTMLElement[] {
  if (!container) return [];

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
}

/**
 * Trap focus within a container
 * Moves focus to first/last element when reaching boundaries
 */
export function trapFocus(container: HTMLElement | null): () => void {
  if (!container) return () => {};

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Save the currently focused element
 */
let savedFocusElement: HTMLElement | null = null;

export function saveFocus() {
  savedFocusElement = document.activeElement as HTMLElement;
}

/**
 * Restore focus to the previously saved element
 */
export function restoreFocus() {
  if (savedFocusElement) {
    savedFocusElement.focus();
    savedFocusElement = null;
  }
}

