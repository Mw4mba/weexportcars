import React from 'react';
import { useScrollAnimation } from './useScrollAnimation';

interface AnimatedTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ id, children, className = '' }) => {
  const [ref, isVisible] = useScrollAnimation('0px');
  return (
    <h2
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`text-6xl md:text-8xl lg:text-[120px] font-extrabold tracking-tighter transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ color: '#2a3443', lineHeight: '0.85', fontFamily: 'Inter, sans-serif' }}
    >
      {children}
    </h2>
  );
};
