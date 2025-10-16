"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { getSharedObserver } from '@/utils/sharedObserver';

export function useScrollAnimation(rootMargin: string = '0px'): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = useCallback((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Use shared observer for better performance
    const observer = getSharedObserver(callback, { rootMargin });
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, rootMargin]);

  return [ref, isVisible] as [React.RefObject<HTMLDivElement>, boolean];
}
