'use client';

import React from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedElement = React.memo(({
  children,
  isVisible,
  delay = 0,
  className = '',
  style = {}
}: AnimatedElementProps) => {
  const combinedStyle = {
    ...style,
    willChange: 'transform, opacity',
    animationDelay: `${delay}ms`,
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={combinedStyle}
    >
      {children}
    </div>
  );
});

AnimatedElement.displayName = 'AnimatedElement';