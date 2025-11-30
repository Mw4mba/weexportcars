import React, { useState, useEffect } from 'react';
import { COLORS, FEATURED_CARS } from './constants';
import AccentButton from './AccentButton';
import Image from 'next/image';

const ShowroomSection: React.FC = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % FEATURED_CARS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: COLORS.dark }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <h2 className="text-5xl font-extrabold text-center" style={{ color: COLORS.light }}>
          Featured Showroom
        </h2>
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentCarIndex * 100}%)` }}
          >
            {FEATURED_CARS.map((car, index) => (
              <div 
                key={index} 
                className="min-w-full p-8 md:p-16 flex flex-col md:flex-row items-center gap-10"
                style={{ backgroundColor: 'white' }}
              >
                <div className="w-full md:w-1/2 relative aspect-video">
                  <Image 
                    src={car.img} 
                    alt={car.model}
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4" style={{ color: COLORS.dark }}>
                  <p className="text-sm font-semibold text-gray-500">{car.year} Model</p>
                  <h3 className="text-4xl font-bold" style={{ color: COLORS.accent }}>{car.model}</h3>
                  <p className="text-xl font-light">Price: {car.price}</p>
                  <p className="max-w-md">
                    A hand-selected premium vehicle, expertly vetted and ready for global transport. Explore the best of South African inventory.
                  </p>
                  <AccentButton 
                    className="mt-4 hover:bg-black"
                    style={{ backgroundColor: COLORS.dark, color: COLORS.light }}
                  >
                    View Details
                  </AccentButton>
                </div>
              </div>
            ))}
          </div>
          {/* More Button */}
          <div className="absolute bottom-8 right-8">
            <AccentButton 
              className="bg-white hover:bg-gray-100 shadow-lg border border-gray-200"
              style={{ backgroundColor: 'white', color: COLORS.dark }}
            >
              More Inventory
            </AccentButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
