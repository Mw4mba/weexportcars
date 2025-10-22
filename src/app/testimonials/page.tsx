'use client';

import { useState } from 'react';
import Navigation from '@/components/home/navigation';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonialsData';

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#2a3443] to-[#1a2332]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Client <span className="text-[#d10e22]">Testimonials</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Hear what our satisfied clients have to say about their experience with We Export Cars
          </p>
        </div>
      </section>

      {/* Main Testimonials Section - Similar to About Page Layout */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Testimonial Text */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-[#d10e22]/20" />
              
              <div className="relative z-10 pt-8">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < currentTestimonial.rating
                          ? 'fill-[#d10e22] text-[#d10e22]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl text-[#2a3443] leading-relaxed mb-8 min-h-[200px]">
                  "{currentTestimonial.text}"
                </p>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 hover:scale-110"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    {currentIndex + 1} of {TESTIMONIALS.length}
                  </span>
                  
                  <button
                    onClick={handleNext}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 hover:scale-110"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Client Info Cards */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-[#2a3443] mb-6">
                Featured Reviews
              </h3>
              
              {/* Scrollable list of testimonial cards */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-[#d10e22] text-white shadow-xl scale-[1.02]'
                        : 'bg-white text-[#2a3443] hover:bg-gray-50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        {testimonial.location && (
                          <p className={`text-sm ${
                            index === currentIndex ? 'text-white/80' : 'text-gray-600'
                          }`}>
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? index === currentIndex
                                  ? 'fill-white text-white'
                                  : 'fill-[#d10e22] text-[#d10e22]'
                                : index === currentIndex
                                ? 'text-white/30'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className={`text-sm ${
                      index === currentIndex ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {testimonial.date}
                    </p>
                    
                    <p className={`mt-3 text-sm line-clamp-2 ${
                      index === currentIndex ? 'text-white/90' : 'text-gray-700'
                    }`}>
                      {testimonial.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
