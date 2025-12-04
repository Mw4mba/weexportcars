'use client';
import React, { useEffect, useRef, useState } from 'react';
import WorldMap from '@/components/ui/world-map';
import { COLORS } from '@/components/wec/constants';

const AboutHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Immediately show on mount for better perceived performance
    setIsVisible(true);
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.01,  // Trigger with minimal visibility
        rootMargin: '50px' // Start loading before element is in view
      }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const textHeight = entry.contentRect.height;
        const newHeight = textHeight * 1.1;
        if (containerRef.current) {
          containerRef.current.style.height = `${Math.max(newHeight, 300)}px`;
        }
      }
    });

    resizeObserver.observe(textRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="w-full rounded-3xl overflow-hidden shadow-lg relative transition-all duration-300 min-h-[300px]">
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.light }}>
            <div className="opacity-30 h-full">
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
                  lat: -30, // South Africa's approximate center latitude
                  lng: 25, // South Africa's approximate center longitude
                  zoom: 2 // Closer zoom to focus on South Africa while still showing connections
                }}
              />
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