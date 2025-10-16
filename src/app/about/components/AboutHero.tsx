'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { COLORS } from '@/components/wec/constants';

// Lazy load WorldMap for better performance
const WorldMap = dynamic(() => import('@/components/ui/world-map'), {
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
  ssr: false,
});

const AboutHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Load map immediately on mount for faster perceived performance
  useEffect(() => {
    setShouldLoadMap(true);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current && containerRef.current) {
        const textHeight = textRef.current.offsetHeight;
        const newHeight = textHeight * 1.1; // 110% of text height
        containerRef.current.style.height = `${Math.max(newHeight, 300)}px`; // Minimum height of 300px
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
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.light }}>
            <div className="opacity-30">
              {shouldLoadMap && (
                <WorldMap
                  dots={[
                    // UK -> South Africa
                    { start: { lat: 51.5074, lng: -0.1278, label: 'UK' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
                    // USA -> South Africa
                    { start: { lat: 37.7749, lng: -122.4194, label: 'USA' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
                    // Dubai -> South Africa
                    { start: { lat: 25.2048, lng: 55.2708, label: 'UAE' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
                    // Germany -> South Africa
                    { start: { lat: 52.5200, lng: 13.4050, label: 'Germany' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
                  ]}
                  lineColor={COLORS.accent}
                  theme="light"
                  animateRoutes={isVisible}
                />
              )}
            </div>
          </div>

          <div className={`absolute inset-0 flex items-end ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} ref={ref}>
            <div ref={textRef} className="p-6 md:p-10 max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic" style={{ color: COLORS.dark }}>About Us</h1>
              <p className="mt-3 text-lg md:text-xl font-bold" style={{ color: COLORS.accent }}>
                Global Automotive Excellence - Your Trusted Export Partner
              </p>
              <p className="mt-4 text-lg" style={{ color: COLORS.dark }}>
                We Export Cars connects buyers to quality vehicles from South Africa and the UK — 
                end-to-end export services, inspection and logistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
