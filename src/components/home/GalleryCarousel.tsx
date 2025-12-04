import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useOptimizedScrollAnimation } from '@/utils/useOptimizedScrollAnimation';
import { CAR_GALLERIES } from '@/lib/galleryData';

// Select featured images for bento box - pick key images from each car
const bentoImages = [
  { src: CAR_GALLERIES[0].images[0], name: CAR_GALLERIES[0].name, size: 'large' },  // 2016 Prado - large
  { src: CAR_GALLERIES[1].images[0], name: CAR_GALLERIES[1].name, size: 'medium' }, // 2018 Prado - medium
  { src: CAR_GALLERIES[2].images[0], name: CAR_GALLERIES[2].name, size: 'medium' }, // 2025 Prado - medium
  { src: CAR_GALLERIES[0].images[3], name: CAR_GALLERIES[0].name, size: 'small' },  // 2016 Prado interior
  { src: CAR_GALLERIES[1].images[2], name: CAR_GALLERIES[1].name, size: 'small' },  // 2018 Prado angle
  { src: CAR_GALLERIES[2].images[3], name: CAR_GALLERIES[2].name, size: 'small' },  // 2025 Prado angle
];

const GalleryCarousel = memo(() => {
  const [sectionRef, isVisible] = useOptimizedScrollAnimation({ threshold: 'standard' });

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

        {/* Bento Box Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Bento Layout - 2 rows */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[450px]">
            {/* Large image - spans 2 cols, 2 rows */}
            <div className={`col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.1s' }}>
              <Image
                src={bentoImages[0].src}
                alt={bentoImages[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 50vw, 600px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">{bentoImages[0].name}</p>
              </div>
            </div>

            {/* Top right - Medium image 1 */}
            <div className={`col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-lg group ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              <Image
                src={bentoImages[1].src}
                alt={bentoImages[1].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 25vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">{bentoImages[1].name}</p>
              </div>
            </div>

            {/* Top right - Medium image 2 */}
            <div className={`col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-lg group ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.3s' }}>
              <Image
                src={bentoImages[2].src}
                alt={bentoImages[2].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 25vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-medium text-sm">{bentoImages[2].name}</p>
              </div>
            </div>

            {/* Bottom right - Small image */}
            <div className={`col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-lg group ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <Image
                src={bentoImages[3].src}
                alt={bentoImages[3].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 25vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Bottom right - View Gallery Card */}
            <Link href="/gallery" className={`col-span-1 row-span-1 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.5s' }}>
              <div className="h-full bg-[#d10e22] rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:bg-[#b00c1b] transition-all duration-300 group">
                <span className="text-white font-bold text-lg mb-2">View Gallery</span>
                <ArrowRight className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                <span className="text-white/80 text-sm mt-2">More →</span>
              </div>
            </Link>
          </div>

          {/* Mobile Layout - 3 mini cards + traditional button */}
          <div className="md:hidden">
            {/* 3 Mini Image Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className={`relative aspect-square rounded-xl overflow-hidden shadow-lg group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.1s' }}>
                <Image
                  src={bentoImages[0].src}
                  alt={bentoImages[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className={`relative aspect-square rounded-xl overflow-hidden shadow-lg group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.2s' }}>
                <Image
                  src={bentoImages[1].src}
                  alt={bentoImages[1].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className={`relative aspect-square rounded-xl overflow-hidden shadow-lg group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.3s' }}>
                <Image
                  src={bentoImages[2].src}
                  alt={bentoImages[2].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Traditional More Button */}
            <div className={`text-center ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <Link 
                href="/gallery"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#d10e22] text-white font-semibold rounded-full shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-105"
              >
                View Full Gallery
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GalleryCarousel.displayName = 'GalleryCarousel';

export default GalleryCarousel;
