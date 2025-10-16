type ObserverCallback = (isIntersecting: boolean) => void;
type EntryCallback = (entry: IntersectionObserverEntry) => void;

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

// Helper to get or create shared observer with custom options
export const getSharedObserver = (
  callback: EntryCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  // Check if we're in a browser environment
  const isClient = typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';
  
  if (!isClient) {
    // Return a no-op observer for SSR
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {},
    } as unknown as IntersectionObserver;
  }
  
  // For custom rootMargin, create a standard observer
  // This is acceptable for components like AnimatedTitle that have different rootMargin values
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => callback(entry));
  }, options);
};

// Create shared observers with different thresholds
export const sharedObserver = {
  standard: createSharedObserver({ threshold: 0.2 }),
  early: createSharedObserver({ threshold: 0.15 }),
  detailed: createSharedObserver({ threshold: 0.5 })
};