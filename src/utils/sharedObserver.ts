type ObserverCallback = (isIntersecting: boolean) => void;

interface SharedObserver {
  observe: (element: Element, callback: ObserverCallback) => void;
  unobserve: (element: Element) => void;
}

export const createSharedObserver = (options: IntersectionObserverInit): SharedObserver => {
  const callbacks = new Map<Element, ObserverCallback>();
  
  // Check if we're in a browser environment
  const isClient = typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';
  
  // Create a no-op observer for server-side
  const noOpObserver = {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
  };

  // Only create real observer in browser environment
  const observer = isClient
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const callback = callbacks.get(entry.target);
          if (callback) callback(entry.isIntersecting);
        });
      }, options)
    : noOpObserver;

  return {
    observe: (element, callback) => {
      callbacks.set(element, callback);
      observer.observe(element);
    },
    unobserve: (element) => {
      callbacks.delete(element);
      observer.unobserve(element);
    }
  };
};

// Create shared observers with different thresholds
export const sharedObserver = {
  standard: createSharedObserver({ threshold: 0.2 }),
  early: createSharedObserver({ threshold: 0.15 }),
  detailed: createSharedObserver({ threshold: 0.5 })
};