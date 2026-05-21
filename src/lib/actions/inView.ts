import type { ActionReturn } from 'svelte/action';

interface InViewAttributes {
  'on:reveal'?: (e: CustomEvent<void>) => void;
}

/**
 * Svelte use:inView action — fires a CustomEvent when the element enters the viewport.
 *
 * <div use:inView on:reveal={() => started = true}> ... </div>
 *
 * Falls back to immediate trigger when IntersectionObserver is unavailable (SSR-safe).
 */
export function inView(
  node: HTMLElement,
  options: IntersectionObserverInit = { threshold: 0.25 }
): ActionReturn<IntersectionObserverInit, InViewAttributes> {
  if (typeof IntersectionObserver === 'undefined') {
    node.dispatchEvent(new CustomEvent('reveal'));
    return {};
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        node.dispatchEvent(new CustomEvent('reveal'));
        observer.disconnect();
      }
    }
  }, options);

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
