/**
 * Implementación nativa de focus trap para modales y drawers.
 * @param {HTMLElement} container - El elemento que contiene el foco.
 * @returns {{ activate: () => void, deactivate: () => void }}
 */
export function createFocusTrap(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  let previouslyFocused = null;

  function getFocusableElements() {
    return Array.from(container.querySelectorAll(focusableSelectors)).filter(
      (el) => !el.closest('[aria-hidden="true"]')
    );
  }

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      // Shift+Tab: si estamos en el primero, ir al último
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      // Tab: si estamos en el último, ir al primero
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return {
    activate() {
      previouslyFocused = document.activeElement;
      container.addEventListener('keydown', handleKeyDown);
      // Enfocar el primer elemento enfocable
      const focusable = getFocusableElements();
      if (focusable.length > 0) focusable[0].focus();
    },
    deactivate() {
      container.removeEventListener('keydown', handleKeyDown);
      // Restaurar el foco al elemento que lo tenía antes
      previouslyFocused?.focus();
    },
  };
}
