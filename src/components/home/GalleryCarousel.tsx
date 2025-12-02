import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';
import { GALLERY_IMAGES } from '@/lib/galleryData';

const GalleryCarousel = memo(() => {
  const [currentImage, setCurrentImage] = useState(0);
  const [sectionRef, isVisible] = useOptimizedScrollAnimation({ threshold: 'standard' });

  // Select featured images for carousel (e.g., every 3rd image for variety)
  const featuredImages = GALLERY_IMAGES.filter((_, index) => index % 3 === 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % featuredImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % featuredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
  };

  return (
    <section className="py-20 bg-[#e6e6e6]" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Featured from our <span className="text-[#d10e22]">Gallery</span>
          </h2>
          <p className={`text-xl text-[#2a3443]/80 max-w-3xl mx-auto ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '0.2s' }}>
            Explore stunning photographs of premium vehicles we've exported from South Africa. Each image represents quality, luxury, and successful delivery to destinations worldwide.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop: Arrows on top of carousel */}
          <div className="hidden md:block relative">
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-white">
              <div className="flex transition-transform duration-700 ease-out"
                   style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                {featuredImages.map((imageSrc, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-[#e6e6e6] overflow-hidden group">
                      <Image
                        src={imageSrc}
                        alt={`Gallery vehicle ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                        priority={index === 0}
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Gallery link overlay */}
                      <Link href="/gallery">
                        <div className="absolute bottom-6 right-6 px-6 py-3 bg-[#d10e22] text-white font-semibold rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-105">
                          View Gallery
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Arrow - Positioned on left side of carousel */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7 text-white" />
            </button>

            {/* Next Arrow - Positioned on right side of carousel */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7 text-white" />
            </button>
          </div>

          {/* Mobile: Full-width carousel with arrows on card */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-white">
              <div className="flex transition-transform duration-700 ease-out"
                   style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                {featuredImages.map((imageSrc, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative aspect-[4/3] bg-[#e6e6e6] overflow-hidden group">
                      <Image
                        src={imageSrc}
                        alt={`Gallery vehicle ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="100vw"
                        priority={index === 0}
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Gallery link overlay */}
                      <Link href="/gallery">
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#d10e22] text-white font-semibold rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300">
                          View Gallery
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Arrows on top of carousel */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Desktop & Mobile Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {featuredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? 'bg-[#d10e22] w-12' 
                    : 'bg-[#2a3443]/30 w-8 hover:bg-[#2a3443]/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

GalleryCarousel.displayName = 'GalleryCarousel';

export default GalleryCarousel;
