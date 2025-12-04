"use client";

import React, { memo } from 'react';
import Image from 'next/image';

const WhoWeAreAndOfferings: React.FC = memo(() => {
  return (
    <section id="about" className="py-28 bg-[#2a3443]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Image Card */}
          <div className="w-full lg:w-[550px] flex-shrink-0 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 lg:h-96">
              {/* Background Image */}
              <Image
                src="/we-export_3.jpg"
                alt="Premium Vehicle Export"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white">WE</span> <span className="text-[#d10e22]">EXPORT</span><br />
              <span className="text-white">CARS</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
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
