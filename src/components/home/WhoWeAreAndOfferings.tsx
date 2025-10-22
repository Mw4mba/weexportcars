"use client";

import React, { memo, useState } from 'react';
import { AnimatedTitle } from './AnimatedTitle';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

// Core offering cards with hero images
type Offering = {
  title: string;
  image: string;
  link: string;
};

const OFFERINGS: Offering[] = [
  {
    title: "Export Services",
    image: "/we-export_3.jpg",
    link: "/#process"
  }
];

const WhoWeAreAndOfferings: React.FC = memo(() => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="about" className="py-28 bg-[#2a3443]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Offerings - Centered */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-8 text-center">Our Core Offerings</h3>
          
          {/* Single Export Services Card */}
          <div className="flex justify-center">
            {OFFERINGS.map((offering) => (
              <a
                key={offering.title}
                href={offering.link}
                className="relative overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] w-full h-64"
                onMouseEnter={() => setHoveredCard(offering.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <Image
                  src={offering.image}
                  alt={offering.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                
                {/* Title and Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-2xl font-bold tracking-wide">
                      {offering.title}
                    </h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

WhoWeAreAndOfferings.displayName = 'WhoWeAreAndOfferings';

export default WhoWeAreAndOfferings;
