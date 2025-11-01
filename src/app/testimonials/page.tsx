'use client';

import { useState } from 'react';
import Navigation from '@/components/home/navigation';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
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

      {/* Main Testimonials Section - Dark Theme with Glassmorphism */}
      <section className="py-20 bg-[#2a3443]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Review - Large Card */}
          <div className="bg-white/5 backdrop-blur-sm border-2 border-[#d10e22] rounded-2xl p-8 md:p-12 shadow-xl shadow-[#d10e22]/20 mb-12">
            <div className="flex items-center gap-4 mb-6">
              {/* Avatar Circle */}
              <div className="w-16 h-16 rounded-full bg-[#d10e22] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {getInitials(currentTestimonial.name)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {currentTestimonial.name}
                </h3>
                {currentTestimonial.location && (
                  <p className="text-white/60 text-sm">
                    {currentTestimonial.location}
                  </p>
                )}
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? 'fill-[#d10e22] text-[#d10e22]'
                        : 'text-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 min-h-[120px]">
              "{currentTestimonial.text}"
            </p>

            {/* Date */}
            <p className="text-white/50 text-sm">
              {currentTestimonial.date}
            </p>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Carousel Indicators - 3 static dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === 1
                        ? 'w-8 bg-[#d10e22]'
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <span className="text-white/60 text-sm">
                {currentIndex + 1} of {TESTIMONIALS.length}
              </span>
            </div>
          </div>

          {/* Featured Reviews - Under Active Review */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Featured Reviews
            </h3>
            
            {/* Grid of testimonial cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.filter((_, index) => index !== currentIndex).slice(0, 6).map((testimonial, index) => {
                const actualIndex = TESTIMONIALS.findIndex(t => t.id === testimonial.id);
                return (
                  <button
                    key={testimonial.id}
                    onClick={() => setCurrentIndex(actualIndex)}
                    className="text-left p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#d10e22]/50 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {/* Avatar Circle */}
                      <div className="w-12 h-12 rounded-full bg-[#d10e22] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {getInitials(testimonial.name)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">
                          {testimonial.name}
                        </h4>
                        {testimonial.location && (
                          <p className="text-white/60 text-sm truncate">
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'fill-[#d10e22] text-[#d10e22]'
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Preview */}
                    <p className="text-white/80 text-sm line-clamp-3 mb-3">
                      "{testimonial.text}"
                    </p>

                    {/* Date */}
                    <p className="text-white/50 text-xs">
                      {testimonial.date}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
