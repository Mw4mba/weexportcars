import { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Gauge, Fuel, Car } from 'lucide-react';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';
import { vehicleData } from '@/lib/vehicleData';

const Showroom = memo(() => {
  const [currentCar, setCurrentCar] = useState(0);
  const [sectionRef, isVisible] = useOptimizedScrollAnimation({ threshold: 'standard' });

  // Get featured cars from the vehicle data
  const featuredCars = vehicleData.filter(car => car.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCar((prev) => (prev + 1) % featuredCars.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredCars.length]);

  const nextCar = () => {
    setCurrentCar((prev) => (prev + 1) % featuredCars.length);
  };

  const prevCar = () => {
    setCurrentCar((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  };

  return (
  <section id="showroom" className="py-20 bg-[#e6e6e6]" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Title Section - Stacked vertically, centered */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Featured <span className="text-[#d10e22]">Showroom</span>
          </h2>
          <p className={`text-xl text-[#2a3443]/70 max-w-3xl mx-auto ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '0.2s' }}>
            Discover our premium collection of export-ready vehicles, carefully selected and prepared for international delivery
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop: Arrows beside carousel, Mobile: Arrows beside indicators */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Previous Arrow - Desktop only, outside card */}
            <button
              onClick={prevCar}
              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-10"
              aria-label="Previous car"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
            </button>

            {/* Main Carousel */}
            <div className="flex-1 overflow-hidden rounded-3xl shadow-2xl border-4 border-[#d10e22] bg-white">
              <div className="flex transition-transform duration-700 ease-out"
                   style={{ transform: `translateX(-${currentCar * 100}%)` }}>
                {featuredCars.map((car, index) => (
                  <div key={car.slug} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Car Image */}
                      <div className="relative aspect-[4/3] lg:aspect-square bg-[#e6e6e6] overflow-hidden">
                        <Image
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d10e22]/10 to-transparent" />
                      </div>
                      
                      {/* Car Details - Card Style matching VehicleCard */}
                      <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between bg-white rounded-r-3xl">
                        <div className="space-y-4 md:space-y-6">
                          <div>
                            {/* Badges - Condition and Status Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge className="bg-[#d10e22] text-white">
                                {car.condition}
                              </Badge>
                              {/* Show Export Ready or Available tag if present */}
                              {car.tags.some(tag => tag === 'Export Ready' || tag === 'Available') && (
                                <Badge className="bg-[#2a3443] text-white">
                                  {car.tags.find(tag => tag === 'Export Ready' || tag === 'Available')}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2a3443] mb-2">
                              {car.make} {car.model}
                            </h3>
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#d10e22] mb-4 md:mb-6">
                              {car.price}
                            </div>
                          </div>
                          
                          {/* Stats Grid matching VehicleCard */}
                          <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#e6e6e6]">
                            <div className="flex items-center space-x-2 text-[#2a3443]/60">
                              <Gauge className="h-4 w-4 text-[#2a3443]" />
                              <span className="text-sm">{car.mileage}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#2a3443]/60">
                              <Fuel className="h-4 w-4 text-[#2a3443]" />
                              <span className="text-sm">{car.transmission}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#2a3443]/60">
                              <Car className="h-4 w-4 text-[#2a3443]" />
                              <span className="text-sm">{car.bodyType}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#2a3443]/60">
                              <Calendar className="h-4 w-4 text-[#2a3443]" />
                              <span className="text-sm">{car.year}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* View Details Button */}
                        <Link href={`/car/${car.slug}`}>
                          <button className="w-full inline-block px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow - Desktop only, outside card */}
            <button
              onClick={nextCar}
              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-10"
              aria-label="Next car"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
            </button>
          </div>

          {/* Mobile: Full-width carousel */}
          <div className="md:hidden overflow-hidden rounded-3xl shadow-2xl border-4 border-[#d10e22] bg-white">
            <div className="flex transition-transform duration-700 ease-out"
                 style={{ transform: `translateX(-${currentCar * 100}%)` }}>
              {featuredCars.map((car, index) => (
                <div key={car.slug} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Car Image */}
                    <div className="relative aspect-[4/3] lg:aspect-square bg-[#e6e6e6] overflow-hidden">
                      <Image
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d10e22]/10 to-transparent" />
                    </div>
                    
                    {/* Car Details - Card Style matching VehicleCard */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between bg-white rounded-r-3xl">
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          {/* Badges - Condition and Status Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-[#d10e22] text-white">
                              {car.condition}
                            </Badge>
                            {/* Show Export Ready or Available tag if present */}
                            {car.tags.some(tag => tag === 'Export Ready' || tag === 'Available') && (
                              <Badge className="bg-[#2a3443] text-white">
                                {car.tags.find(tag => tag === 'Export Ready' || tag === 'Available')}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2a3443] mb-2">
                            {car.make} {car.model}
                          </h3>
                          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#d10e22] mb-4 md:mb-6">
                            {car.price}
                          </div>
                        </div>
                        
                        {/* Stats Grid matching VehicleCard */}
                        <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#e6e6e6]">
                          <div className="flex items-center space-x-2 text-[#2a3443]/60">
                            <Gauge className="h-4 w-4 text-[#2a3443]" />
                            <span className="text-sm">{car.mileage}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[#2a3443]/60">
                            <Fuel className="h-4 w-4 text-[#2a3443]" />
                            <span className="text-sm">{car.transmission}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[#2a3443]/60">
                            <Car className="h-4 w-4 text-[#2a3443]" />
                            <span className="text-sm">{car.bodyType}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[#2a3443]/60">
                            <Calendar className="h-4 w-4 text-[#2a3443]" />
                            <span className="text-sm">{car.year}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* View Details Button */}
                      <Link href={`/car/${car.slug}`}>
                        <button className="w-full inline-block px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators with Arrows on Mobile, Centered on Desktop */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {/* Previous Arrow - Mobile only, beside indicators */}
            <button
              onClick={prevCar}
              className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Previous car"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>

            {/* Indicators - Slim Red Rectangles */}
            <div className="flex justify-center space-x-3">
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCar(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentCar 
                      ? 'bg-[#d10e22] w-12' 
                      : 'bg-[#2a3443]/30 w-8 hover:bg-[#2a3443]/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Arrow - Mobile only, beside indicators */}
            <button
              onClick={nextCar}
              className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Next car"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* View Complete Inventory Button */}
          <div className={`text-center mt-12 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '0.5s' }}>
            <Link href="/showroom">
              <Button 
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60"
                size="lg"
              >
                View Complete Inventory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

Showroom.displayName = 'Showroom';

export default Showroom;