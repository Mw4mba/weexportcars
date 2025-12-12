"use client";

import React, { memo } from 'react';

const WhoWeAreAndOfferings: React.FC = memo(() => {
  return (
    <section id="about" className="relative py-16 md:py-20">
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Card */}
        <div 
          className="relative mt-12 md:mt-16 rounded-[32px] shadow-2xl px-6 sm:px-10 lg:px-16 py-12 md:py-16 w-full lg:w-[94%] mx-auto bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cars/2025Prado/IMG-20251013-WA0017.jpg)' }}
        >
          {/* Left to right gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a3443] via-[#2a3443]/80 to-transparent rounded-[32px]"></div>
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white">WE</span> <span className="text-[#d10e22]">EXPORT</span><br />
              <span className="text-white">CARS</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl lg:max-w-4xl mx-auto lg:mx-0 leading-relaxed">
              Your trusted partner for seamless vehicle exports from South Africa. 
              We handle everything from sourcing premium vehicles to international 
              delivery, ensuring a hassle-free experience with full documentation 
              and logistics support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

WhoWeAreAndOfferings.displayName = 'WhoWeAreAndOfferings';

export default WhoWeAreAndOfferings;
