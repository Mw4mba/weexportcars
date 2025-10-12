import React, { RefObject, useState, useRef, useEffect } from 'react';
import { Globe, ArrowRightCircle } from 'lucide-react';
import WorldMap from '@/components/ui/world-map';

const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

type InternationalMapProps = {
  sectionRefs?: { international?: RefObject<HTMLElement> };
  scrollToSection?: (section: string) => void;
};

const InternationalMap: React.FC<InternationalMapProps> = ({ sectionRefs, scrollToSection }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Example: countries to highlight on world map for international import (could be expanded)
  const highlightCountries = [
    'United Kingdom',
    'United States',
    'Japan',
    'United Arab Emirates',
    'Germany',
  ];

  // Sample dots: import routes (from source to destination lat/lng)
  const routeDots = [
    // UK -> Nigeria example
    { start: { lat: 51.5074, lng: -0.1278, label: 'UK' }, end: { lat: 9.0820, lng: 8.6753, label: 'Nigeria' } },
    // Japan -> Kenya
    { start: { lat: 35.6762, lng: 139.6503, label: 'Japan' }, end: { lat: -1.2921, lng: 36.8219, label: 'Kenya' } },
    // US -> South Africa
    { start: { lat: 37.7749, lng: -122.4194, label: 'USA' }, end: { lat: -33.9249, lng: 18.4241, label: 'South Africa' } },
    // South Africa (Cape Town) -> New York
    { start: { lat: -33.9249, lng: 18.4241, label: 'South Africa' }, end: { lat: 40.7128, lng: -74.0060, label: 'New York' } },
    // Kenya (Nairobi) -> London
    { start: { lat: -1.2921, lng: 36.8219, label: 'Kenya' }, end: { lat: 51.5074, lng: -0.1278, label: 'London' } },
  ];

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [animateRoutes, setAnimateRoutes] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setAnimateRoutes(true);
        });
      },
      { root: null, threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRefs?.international} id="international" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center" style={{ color: DARK_TEXT_COLOR }}> 
            <Globe size={44} className="mr-3" style={{ color: ACCENT_COLOR }} />
            International Import
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We handle international vehicle imports with care — from inspection to shipping, customs clearance and final delivery.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-start">
          {/* Map full width */}
          <div ref={mapRef} className="w-full h-96 rounded-2xl overflow-hidden relative">
            <div className="w-full h-full">
              <WorldMap
                dots={routeDots}
                lineColor={ACCENT_COLOR}
                theme="light"
                focus={{ lat: -33.9249, lng: 18.4241, zoom: 1.3 }}
                animateRoutes={animateRoutes}
              />
            </div>
          </div>

          {/* Info panel below the map */}
          <div className="w-full">
              <div className="bg-[#f8fafc] p-6 rounded-xl shadow">
              <h3 className="text-2xl font-bold mb-4" style={{ color: DARK_TEXT_COLOR }}>Why Import With Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  type="button"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <div className="p-4 mb-4 rounded-full bg-[#d10e22]/10 transition-colors duration-300 group-hover:bg-[#d10e22]/20">
                    <ArrowRightCircle className="w-6 h-6 text-[#d10e22]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#2a3443]">End-to-end handling</h4>
                  <p className="mt-2 text-gray-600">Inspection, transport, customs clearance and final delivery — we manage it all.</p>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <div className="p-4 mb-4 rounded-full bg-[#d10e22]/10 transition-colors duration-300 group-hover:bg-[#d10e22]/20">
                    <ArrowRightCircle className="w-6 h-6 text-[#d10e22]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#2a3443]">Competitive rates</h4>
                  <p className="mt-2 text-gray-600">Transparent pricing and trusted carrier networks to keep costs down.</p>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <div className="p-4 mb-4 rounded-full bg-[#d10e22]/10 transition-colors duration-300 group-hover:bg-[#d10e22]/20">
                    <ArrowRightCircle className="w-6 h-6 text-[#d10e22]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#2a3443]">Documentation &amp; compliance</h4>
                  <p className="mt-2 text-gray-600">We handle paperwork and customs to deliver a hassle-free import experience.</p>
                </button>
              </div>
            </div>
          </div>

          {/* Primary CTA below the info panel */}
          <div className="w-full flex justify-center">
            <button
              onClick={() => scrollToSection?.('contact')}
              className="mt-4 inline-flex items-center gap-3 px-8 py-3 text-white rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              Get shipping to your country
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalMap;
