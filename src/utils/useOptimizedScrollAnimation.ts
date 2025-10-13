import { useRef, useState, useEffect } from 'react';
import { sharedObserver } from './sharedObserver';

export function useOptimizedScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: {
  threshold?: 'standard' | 'early' | 'detailed';
  once?: boolean;
} = {}) {
  const { threshold = 'standard', once = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = sharedObserver[threshold];
    observer.observe(currentRef, (isIntersecting) => {
      if (isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(currentRef);
      }
    });

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, once]);

  return [ref, isVisible] as const;
}