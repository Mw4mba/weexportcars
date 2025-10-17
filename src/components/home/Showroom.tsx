import { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Gauge, Fuel } from 'lucide-react';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';

const Showroom = memo(() => {
  const [currentCar, setCurrentCar] = useState(0);
  const [sectionRef, isVisible] = useOptimizedScrollAnimation({ threshold: 'standard' });

  const featuredCars = [
    {
      id: 1,
      name: "BMW X5 M Sport",
      year: 2022,
      price: "R 1,250,000",
      mileage: "25,000 km",
      fuel: "Petrol",
      image: "/hero-car-1.jpg",
      status: "Available"
    },
    {
      id: 2,
      name: "Mercedes-Benz C63 AMG",
      year: 2023,
      price: "R 1,450,000",
      mileage: "12,000 km", 
      fuel: "Petrol",
      image: "/hero-car-2.jpg",
      status: "Export Ready"
    },
    {
      id: 3,
      name: "Audi Q8 S-Line",
      year: 2023,
      price: "R 1,350,000",
      mileage: "18,000 km",
      fuel: "Hybrid",
      image: "/hero-car-3.jpg",
      status: "Available"
    }
  ];

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
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-[#2a3443] mb-6 ${
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
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-[#2a3443]/10 bg-white">
              <div className="flex transition-transform duration-700 ease-out"
                   style={{ transform: `translateX(-${currentCar * 100}%)` }}>
                {featuredCars.map((car, index) => (
                  <div key={car.id} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Car Image */}
                      <div className="relative aspect-[4/3] lg:aspect-square bg-[#e6e6e6] overflow-hidden">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d10e22]/10 to-transparent" />
                      </div>
                      
                      {/* Car Details */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-white rounded-r-3xl">
                        <div className="space-y-6">
                          <div>
                            <Badge 
                              className="mb-4 bg-[#d10e22] text-white"
                            >
                              {car.status}
                            </Badge>
                            <h3 className="text-3xl lg:text-4xl font-bold text-[#2a3443] mb-2">
                              {car.name}
                            </h3>
                            <div className="text-2xl lg:text-3xl font-bold text-[#d10e22] mb-6">
                              {car.price}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <Calendar className="h-6 w-6 text-[#d10e22] mx-auto mb-2" />
                              <div className="text-sm text-[#2a3443]/30">Year</div>
                              <div className="font-semibold text-[#2a3443]">{car.year}</div>
                            </div>
                            <div className="text-center">
                              <Gauge className="h-6 w-6 text-[#d10e22] mx-auto mb-2" />
                              <div className="text-sm text-[#2a3443]/30">Mileage</div>
                              <div className="font-semibold text-[#2a3443]">{car.mileage}</div>
                            </div>
                            <div className="text-center">
                              <Fuel className="h-6 w-6 text-[#d10e22] mx-auto mb-2" />
                              <div className="text-sm text-[#2a3443]/30">Fuel</div>
                              <div className="font-semibold text-[#2a3443]">{car.fuel}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#e6e6e6]/80 backdrop-blur-sm hover:bg-[#e6e6e6]/95 shadow-lg border border-[#2a3443]/20"
              onClick={prevCar}
            >
              <ChevronLeft className="h-6 w-6 text-[#2a3443]" />
            </Button>
            
            <Button
              variant="ghost" 
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#e6e6e6]/80 backdrop-blur-sm hover:bg-[#e6e6e6]/95 shadow-lg border border-[#2a3443]/20"
              onClick={nextCar}
            >
              <ChevronRight className="h-6 w-6 text-[#2a3443]" />
            </Button>

            {/* Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCar(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentCar 
                      ? 'bg-[#d10e22] scale-125' 
                      : 'bg-[#2a3443]/30 hover:bg-[#2a3443]/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* More Button */}
          <div className={`text-center mt-12 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '0.5s' }}>
            <Button 
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60"
              size="lg"
            >
              View Complete Inventory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

Showroom.displayName = 'Showroom';

export default Showroom;