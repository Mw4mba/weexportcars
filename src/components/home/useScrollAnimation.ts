import { useRef, useState, useEffect, useCallback } from 'react';

export function useScrollAnimation(rootMargin: string = '0px'): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(callback, { rootMargin });
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, rootMargin]);

  return [ref, isVisible] as [React.RefObject<HTMLDivElement>, boolean];
}
