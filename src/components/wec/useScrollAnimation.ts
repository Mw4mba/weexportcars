import React, { useRef, useCallback, useEffect, useState } from 'react';

export function useScrollAnimation(rootMargin: string = '0px'): [React.RefObject<HTMLElement | null>, boolean] {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const callback = useCallback((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, { rootMargin });
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

    return [ref, isVisible];
}
