'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { COLORS } from '@/components/wec/constants';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';

// Lazy load WorldMap to prevent blocking initial page load
const WorldMap = dynamic(() => import('@/components/ui/world-map'), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
      <div className="flex flex-col items-center gap-2 opacity-40">
        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  ),
  ssr: false, // WorldMap has client-side dependencies
});

const ServicesHero: React.FC = () => {
  const [ref, isVisible] = useOptimizedScrollAnimation({ threshold: 'early' });
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  const dots = useMemo(() => [
    { start: { lat: 51.5074, lng: -0.1278, label: 'UK' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
    { start: { lat: 37.7749, lng: -122.4194, label: 'USA' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
    { start: { lat: 25.2048, lng: 55.2708, label: 'UAE' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
    { start: { lat: 52.5200, lng: 13.4050, label: 'Germany' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
  ], []);

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

  // Load map immediately on mount for faster perceived performance
  useEffect(() => {
    setShouldLoadMap(true);
  }, []);

  return (
    <section className="pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="w-full rounded-3xl shadow-lg relative transition-all duration-300 min-h-[300px] overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.light }}>
            <div className="opacity-30 h-full">
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
                  focus={{ 
                    lat: -30,
                    lng: 25,
                    zoom: 2
                  }}
                />
              )}
            </div>
          </div>

          <div className={`absolute inset-0 flex items-end ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} ref={ref}>
            <div ref={textRef} className="p-6 md:p-10 max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic" style={{ color: COLORS.dark }}>
                Our Services
              </h1>
              <p className="mt-3 text-lg md:text-xl font-bold" style={{ color: COLORS.accent }}>
                Complete Vehicle Export Solutions
              </p>
              <p className="mt-4 text-lg" style={{ color: COLORS.dark }}>
                From modern vehicles to timeless classics, we expertly handle your car's journey to any destination worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;