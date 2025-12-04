'use client';

import Navigation from '@/components/home/navigation';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonialsData';

const TestimonialsPage = () => {
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
      <section className="pt-32 pb-20 px-4 bg-[#e6e6e6]">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-[#2a3443] to-[#1a2332] rounded-3xl px-8 py-16 md:px-16 md:py-20 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left side - Text */}
              <div className="text-left lg:max-w-[55%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Client <span className="text-[#d10e22]">Testimonials</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl">
                  Hear what our satisfied clients have to say about their experience with We Export Cars
                </p>
              </div>
              
              {/* Right side - Mock Review Card */}
              <div className="hidden lg:block flex-shrink-0" style={{ transform: 'rotateZ(15deg) rotateY(23deg)', perspective: '1000px' }}>
                <div className="bg-white rounded-2xl rounded-bl-sm p-5 shadow-2xl w-[280px]">
                  {/* Mock Review Text */}
                  <p className="text-[#2a3443] text-sm leading-relaxed mb-4 line-clamp-4">
                    "Exceptional service from start to finish. The team handled everything professionally and my vehicle arrived in perfect condition!"
                  </p>
                  
                  {/* Sender with Stars */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#d10e22] flex items-center justify-center text-white text-xs font-bold">
                        JM
                      </div>
                      <div>
                        <p className="font-semibold text-[#2a3443] text-sm">John M.</p>
                        <p className="text-[#2a3443]/50 text-xs">United Kingdom</p>
                      </div>
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#d10e22] text-[#d10e22]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="py-20 bg-[#e6e6e6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid of testimonial cards - Message bubble style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl rounded-bl-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Testimonial Text */}
                <p className="text-[#2a3443] text-sm leading-relaxed mb-4 line-clamp-5">
                  "{testimonial.text}"
                </p>
                
                {/* Sender with Stars */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {/* Avatar Circle */}
                    <div className="w-8 h-8 rounded-full bg-[#d10e22] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#2a3443] text-sm truncate">
                        {testimonial.name}
                      </p>
                      {testimonial.location && (
                        <p className="text-[#2a3443]/50 text-xs truncate">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonial.rating
                            ? 'fill-[#d10e22] text-[#d10e22]'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Date */}
                <p className="text-[#2a3443]/40 text-xs mt-3">
                  {testimonial.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
