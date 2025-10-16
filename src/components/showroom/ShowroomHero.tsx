import React, { useEffect, useRef } from 'react';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';

const ShowroomHero: React.FC = () => {
  const [ref, isVisible] = useOptimizedScrollAnimation({ threshold: 'early' });
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current && containerRef.current) {
        const textHeight = textRef.current.offsetHeight;
        const newHeight = textHeight * 1.1; // Just 110% of text height
        containerRef.current.style.height = `${Math.max(newHeight, 300)}px`; // Lower minimum height to 300px
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="w-full rounded-3xl shadow-lg relative transition-all duration-300 overflow-hidden">
          <img src="/car1.png" alt="Featured car" className="w-full h-full object-cover" />

          <div className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} ref={ref}>
            <div ref={textRef} className="p-6 md:p-10 max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic">Showroom</h1>
              <p className="mt-3 text-lg md:text-xl text-[#d10e22] font-bold">Export Ready Cars - Luxury vehicles ready for export</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomHero;
