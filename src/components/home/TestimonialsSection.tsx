'use client';

import { useState, useEffect, memo } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

const TestimonialsSection = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Show 3 testimonials at a time (current and 2 more)
  const visibleTestimonials = [
    TESTIMONIALS[currentIndex],
    TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(currentIndex + 2) % TESTIMONIALS.length]
  ];

  return (
    <section className="py-20 md:py-32 bg-[#2a3443]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            What Our <span className="text-[#d10e22]">Clients Say</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Don't just take our word for it - hear from clients who have successfully exported their vehicles with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:scale-[1.02] border ${
                index === 0 
                  ? 'border-[#d10e22] shadow-xl shadow-[#d10e22]/20' 
                  : 'border-white/10 shadow-lg'
              }`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'fill-[#d10e22] text-[#d10e22]'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/90 leading-relaxed mb-6 line-clamp-5 text-base">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {/* Avatar Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#d10e22] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-white">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-sm text-white/60">{testimonial.location}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-white/40 mt-3">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-[#d10e22] text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Indicator Dots - Simplified to 3 dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === 0
                    ? 'bg-[#d10e22] w-8'
                    : 'bg-white/30 w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-[#d10e22] text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-105"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
