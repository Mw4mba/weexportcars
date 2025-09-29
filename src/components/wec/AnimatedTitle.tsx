import React from 'react';
import { COLORS } from './constants';
import { useScrollAnimation } from './useScrollAnimation';

export type AnimatedTitleProps = {
    id: string;
    children: React.ReactNode;
};

const AnimatedTitle = ({ id, children }: AnimatedTitleProps) => {
    const [ref, isVisible] = useScrollAnimation('0px');
    return (
        <h2 
            id={id}
            ref={ref as React.RefObject<HTMLHeadingElement>} 
            className={`text-6xl md:text-8xl lg:text-[120px] font-extrabold 
                        tracking-tighter transform transition-all duration-1000 
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ 
                color: COLORS.dark, 
                lineHeight: '0.85', 
                fontFamily: 'Inter, sans-serif' 
            }}
        >
            {children}
        </h2>
    );
};

export default AnimatedTitle;
