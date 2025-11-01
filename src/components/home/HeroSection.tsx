import React from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';
const BG_LIGHT_COLOR = '#e6e6e6';
const HERO_SLIDES = [
  { id: 1, text: "Global Export Simplified", subtext: "Experience seamless vehicle exportation from start to finish. We handle the logistics so you can focus on the destination.", image: '/hero-car-1.jpg', imageAlt: "Modern performance car ready for export" },
  { id: 2, text: "Trusted Worldwide Network", subtext: "Our extensive partner network ensures safe, timely, and compliant delivery to over 50 countries.", image: '/hero-car-2.jpg', imageAlt: "Car secured on a container ship for international transport" },
  { id: 3, text: "Custom Solutions, Zero Stress", subtext: "From documentation to VAT refunds, we offer bespoke export solutions tailored to your specific needs.", image: '/hero-car-3.jpg', imageAlt: "Close-up of shipping documents and vehicle keys" },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const slide = HERO_SLIDES[currentSlide];
  return (
  <section className="pt-20 pb-28 bg-[#e6e6e6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Carousel & Button */}
          <div className="flex flex-col space-y-8">
            {/* Text Carousel */}
            <div className="h-[200px] overflow-hidden">
              <div key={slide.id} className="animate-slideIn relative p-4 rounded-xl">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-[#2a3443] tracking-tight leading-tight mb-4">
                  {slide.text}
                </h1>
                <p className="text-xl text-[#2a3443]/70 font-light max-w-lg">
                  {slide.subtext}
                </p>
              </div>
            </div>
            {/* Export Button (Red CTA) */}
            <a
              href="#contact"
              className="w-fit px-10 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/50 \
                hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60"
            >
              Export My Car <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </a>
          </div>
          {/* Right: Image Carousel */}
          <div className="relative aspect-video max-h-[600px] overflow-hidden rounded-3xl shadow-2xl border-4 border-[#2a3443]/10">
            <Image
              key={slide.id}
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover animate-slideInImage transition-transform duration-1000 ease-in-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentSlide === 0}
            />
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {HERO_SLIDES.map((_, index) => (
                <span
                  key={index}
                  className={`block w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    currentSlide === index ? `bg-[${ACCENT_COLOR}] scale-125` : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
