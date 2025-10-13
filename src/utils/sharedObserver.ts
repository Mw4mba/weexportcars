type ObserverCallback = (isIntersecting: boolean) => void;

interface SharedObserver {
  observe: (element: Element, callback: ObserverCallback) => void;
  unobserve: (element: Element) => void;
}

export const createSharedObserver = (options: IntersectionObserverInit): SharedObserver => {
  const callbacks = new Map<Element, ObserverCallback>();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = callbacks.get(entry.target);
      if (callback) callback(entry.isIntersecting);
    });
  }, options);

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