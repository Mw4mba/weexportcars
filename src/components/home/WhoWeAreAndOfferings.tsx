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
  isWide?: boolean;
};

const OFFERINGS: Offering[] = [
  {
    title: "SUVs",
    image: "/we-export_1.png",
    link: "#suvs"
  },
  {
    title: "Classic / Retro Cars",
    image: "/we-export_2.jpg",
    link: "#classic-cars"
  },
  {
    title: "Export Services",
    image: "/we-export_3.jpg",
    link: "#export",
    isWide: true // This one will be double width
  }
];

const WhoWeAreAndOfferings: React.FC = memo(() => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="about" className="py-28 bg-[#2a3443]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Who We Are and Core Offerings Side by Side */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Who We Are - Left Side */}
          <div>
            <AnimatedTitle id="who-we-are" className="text-white text-left">
              Who We Are
            </AnimatedTitle>
            <p className="text-xl text-gray-300 leading-relaxed mt-6">
              We Export Cars.Africa is a one-stop vehicle exporter specialising in new and quality pre-owned cars from South Africa and the UK.
              We offer a Showroom to Door solution.
              We take you through a step-by-step procedure of acquiring your dream vehicle.
              <br /><br />
              We take the hustle out of vehicle importation process, from police/Interpol clearances to the roadworthy inspections, shipping and logistics as well as insurance and financing.
            </p>
          </div>

          {/* Core Offerings - Right Side */}
          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Our Core Offerings</h3>
            
            {/* Grid Layout: SUVs and Classic side by side, Export below spanning full width */}
            <div className="grid grid-cols-2 gap-4">
              {OFFERINGS.map((offering) => (
                <a
                  key={offering.title}
                  href={offering.link}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
                    offering.isWide ? 'col-span-2 h-64' : 'col-span-1 h-48'
                  }`}
                  onMouseEnter={() => setHoveredCard(offering.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Background Image */}
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                  
                  {/* Title and Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-bold tracking-wide">
                        {offering.title}
                      </h4>
                      
                      {/* "Learn More" appears on hover */}
                      <div className={`flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === offering.title
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}>
                        <span className="text-lg font-semibold">Learn More</span>
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhoWeAreAndOfferings.displayName = 'WhoWeAreAndOfferings';

export default WhoWeAreAndOfferings;
