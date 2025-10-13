'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface Props {
  children: React.ReactNode;
  onIntersect?: () => void;
}

const ClientIntersectionObserver: React.FC<Props> = ({ children, onIntersect }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsIntersecting(true);
      onIntersect?.();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          onIntersect?.();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <div ref={ref} style={{ opacity: isIntersecting ? 1 : 0, transition: 'opacity 1s' }}>
      {children}
    </div>
  );
};

// This component will only be imported and rendered on the client side
export const IntersectionObserverWrapper = dynamic(
  () => Promise.resolve(ClientIntersectionObserver),
  { ssr: false }
);