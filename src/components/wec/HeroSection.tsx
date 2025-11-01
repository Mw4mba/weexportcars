import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, CAROUSEL_SLIDES } from './constants';
import AccentButton from './AccentButton';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id.replace(/\s+/g, '-').toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  // No Hero2 content or animation, use CAROUSEL_SLIDES for both carousels
  return (
    <section 
      id="home" 
      className="pt-32 pb-20 min-h-screen flex items-center justify-center" 
      style={{ backgroundColor: COLORS.light }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">
          {/* Right: Image Carousel (On top for mobile) */}
          <div className="w-full h-80 md:h-[500px] relative overflow-hidden order-first lg:order-2 md:[width:60vw]">
            <Image
              key={slideIndex}
              src={CAROUSEL_SLIDES[slideIndex].image}
              alt={CAROUSEL_SLIDES[slideIndex].textTitle}
              fill
              className="object-cover rounded-2xl shadow-2xl animate-slideInImage transition-transform duration-1000 ease-in-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={slideIndex === 0}
            />
          </div>
          {/* Left: Text Carousel & Button (Under image for mobile) */}
          <div className="order-2 lg:order-1 space-y-8 min-h-40 flex flex-col justify-center items-center md:items-start relative w-full h-80 md:h-[500px]">
            {/* Text Carousel */}
            <div className="h-full overflow-hidden relative w-full flex flex-col justify-center">
              <div key={slideIndex} className="animate-slideIn relative space-y-4">
                <span className="text-[#d10e22] text-base md:text-lg font-semibold uppercase tracking-widest mb-2 block">{CAROUSEL_SLIDES[slideIndex].textTitle}</span>
                <h1 className="text-4xl md:text-6xl font-bold text-[#2a3443] mb-4 leading-tight">
                  {CAROUSEL_SLIDES[slideIndex].textTitle}
                </h1>
                <p className="text-lg text-[#2a3443]/80 mb-8">
                  {CAROUSEL_SLIDES[slideIndex].textSubtitle}
                </p>
              </div>
            </div>
            {/* Export My Car Button */}
            <div className="mt-8">
              <AccentButton onClick={() => scrollToSection('contact-form')} className="px-10 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/50 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60">
                Export My Car
              </AccentButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
