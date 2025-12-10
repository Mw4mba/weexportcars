'use client';

import { useState, useEffect, memo } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/testimonialsData';

const TestimonialsSection = memo(() => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  // Show testimonials as messages popping up one by one
  useEffect(() => {
    // Reset and start new batch
    setVisibleMessages([]);
    
    const messagesToShow = [
      currentBatch * 3,
      currentBatch * 3 + 1,
      currentBatch * 3 + 2
    ].filter(i => i < TESTIMONIALS.length);

    // Pop in messages one by one with delay
    messagesToShow.forEach((msgIndex, i) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msgIndex]);
      }, (i + 1) * 800);
    });

    // Move to next batch after showing all messages
    const batchTimer = setTimeout(() => {
      const nextBatch = (currentBatch + 1) % Math.ceil(TESTIMONIALS.length / 3);
      setCurrentBatch(nextBatch);
    }, 6000);

    return () => clearTimeout(batchTimer);
  }, [currentBatch]);

  // Get current batch of testimonials
  const currentTestimonials = TESTIMONIALS.slice(currentBatch * 3, currentBatch * 3 + 3);

  return (
    <section className="py-20 md:py-32 bg-[#e6e6e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header - Title above phone */}
        <div className="lg:hidden text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2a3443]">
            What Our<br />
            <span className="text-[#d10e22]">Clients Say</span>
          </h2>
          <p className="text-lg md:text-xl text-[#2a3443]/70 max-w-lg mx-auto leading-relaxed">
            Don't just take our word for it - hear from clients who have successfully exported their vehicles with us. Real stories, real satisfaction.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side - Phone with Messages */}
          <div className="relative w-full max-w-[380px] lg:max-w-[450px] flex-shrink-0">
            {/* Phone Frame */}
            <div className="relative">
              <Image
                src="/phone-asset.png"
                alt="Phone showing testimonials"
                width={450}
                height={900}
                className="w-full h-auto relative z-10"
                priority
              />
              
              {/* Messages Container - Positioned inside phone screen */}
              <div className="absolute top-[10%] left-[6%] right-[6%] bottom-[10%] overflow-hidden z-0">
                <div className="h-full flex flex-col justify-center gap-4 p-3">
                  {currentTestimonials.map((testimonial, index) => {
                    const globalIndex = currentBatch * 3 + index;
                    const isVisible = visibleMessages.includes(globalIndex);
                    
                    return (
                      <div
                        key={`${testimonial.id}-${currentBatch}`}
                        className={`transform transition-all duration-500 ease-out ml-[20%] ${
                          isVisible 
                            ? 'translate-y-0 opacity-100 scale-100' 
                            : 'translate-y-8 opacity-0 scale-150'
                        }`}
                      >
                        {/* Message Bubble */}
                        <div className="bg-white rounded-2xl rounded-bl-sm p-4 shadow-lg max-w-[65%]">
                          {/* Message Text */}
                          <p className="text-[#2a3443] text-xs leading-relaxed line-clamp-4 mb-1">
                            "{testimonial.text}"
                          </p>
                          
                          {/* Sender with Stars */}
                          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-[#d10e22] flex items-center justify-center text-white text-[10px] font-bold">
                                {testimonial.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-[10px] text-[#2a3443]/70 font-medium">
                                {testimonial.name}
                              </span>
                            </div>
                            {/* Rating Stars */}
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-2.5 h-2.5 ${
                                    i < testimonial.rating
                                      ? 'fill-[#d10e22] text-[#d10e22]'
                                      : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content (Desktop only) */}
          <div className="hidden lg:block flex-1 text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2a3443]">
              What Our<br />
              <span className="text-[#d10e22]">Clients Say</span>
            </h2>
            <p className="text-lg md:text-xl text-[#2a3443]/70 max-w-lg mb-10 leading-relaxed">
              Don't just take our word for it - hear from clients who have successfully exported their vehicles with us. Real stories, real satisfaction.
            </p>
            
            {/* View All Button */}
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-full shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-105 group"
            >
              View All Testimonials
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Mobile Button - Below phone */}
        <div className="lg:hidden text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-full shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-105 group"
          >
            View All Testimonials
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
