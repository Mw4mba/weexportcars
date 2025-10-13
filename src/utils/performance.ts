import { useEffect, useRef, useState } from 'react';

export const useImagePreload = (imageSrcs: string[]) => {
  useEffect(() => {
    imageSrcs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [imageSrcs]);
};

export const useThrottledEventListener = (
  eventName: string,
  handler: (event: any) => void,
  delay: number = 100
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const throttledHandler = (event: any) => {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          handlerRef.current(event);
          timeoutRef.current = null;
        }, delay);
      }
    };

    window.addEventListener(eventName, throttledHandler, { passive: true });
    return () => {
      window.removeEventListener(eventName, throttledHandler);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [eventName, delay]);
};

export const useLayoutOptimization = () => {
  useEffect(() => {
    // Add hardware acceleration hints
    document.body.style.willChange = 'transform';
    document.body.style.transform = 'translateZ(0)';
    
    return () => {
      document.body.style.willChange = '';
      document.body.style.transform = '';
    };
  }, []);
};

export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};