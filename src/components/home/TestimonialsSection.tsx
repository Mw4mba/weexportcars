'use client';

import { useState, useEffect, memo } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2a3443]">
            What Our <span className="text-[#d10e22]">Clients Say</span>
          </h2>
          <p className="text-xl text-[#2a3443]/70 max-w-3xl mx-auto">
            Don't just take our word for it - hear from clients who have successfully exported their vehicles with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                index === 0 ? 'ring-2 ring-[#d10e22]' : ''
              }`}
            >
              <Quote className="w-10 h-10 text-[#d10e22]/20 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'fill-[#d10e22] text-[#d10e22]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#2a3443] leading-relaxed mb-6 line-clamp-4">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-[#2a3443]">{testimonial.name}</p>
                {testimonial.location && (
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#d10e22] w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 hover:scale-110 shadow-lg"
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
