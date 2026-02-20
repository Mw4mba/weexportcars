'use client';

import React, { useState, useCallback } from 'react';
import Navigation from '@/components/home/navigation';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CAR_GALLERIES, ALL_GALLERY_IMAGES } from '@/lib/galleryData';

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = useCallback((imageSrc: string) => {
    const index = ALL_GALLERY_IMAGES.findIndex(img => img.src === imageSrc);
    setSelectedImageIndex(index >= 0 ? index : null);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const goToPrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev =>
      prev !== null ? (prev - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length : null
    );
  }, []);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev =>
      prev !== null ? (prev + 1) % ALL_GALLERY_IMAGES.length : null
    );
  }, []);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev =>
          prev !== null ? (prev - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length : null
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev =>
          prev !== null ? (prev + 1) % ALL_GALLERY_IMAGES.length : null
        );
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox]);

  const currentImage = selectedImageIndex !== null ? ALL_GALLERY_IMAGES[selectedImageIndex] : null;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f9fa]">
        {/* Hero Section - matches floating card style and reduced height */}
        <section className="pt-28 pb-14 px-4 bg-[#f8f9fa]">
          <div className="max-w-[1200px] mx-auto">
            <div
              className="relative overflow-hidden rounded-[32px] shadow-2xl bg-cover bg-center"
              style={{ backgroundImage: "url(/we-export_3.jpg)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a3443] via-[#2a3443]/85 to-[#2a3443]/35" />
              <div className="relative z-10 px-8 py-12 md:px-14 md:py-14 lg:px-16 lg:py-14 flex flex-col lg:flex-row items-start gap-8">
                {/* Text */}
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                    Our <span className="text-[#d10e22]">Gallery</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                    Explore our collection of premium vehicles exported from South Africa.
                    Each photograph tells a story of quality, luxury, and successful delivery.
                  </p>
                </div>

                {/* Supporting image tile for large screens */}
                <div className="hidden lg:block relative w-[320px] h-[180px] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/we-export_2.jpg"
                    alt="Featured export"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Gallery Sections */}
        {/* Car Gallery Sections */}
        {CAR_GALLERIES.map((car) => (
          <section key={car.id} className="py-16 px-4 border-b border-gray-200 last:border-b-0">
            <div className="max-w-7xl mx-auto">
              {/* Car Title & Price */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2a3443]">
                  <span className="text-[#d10e22]">{car.name}</span>
                </h2>
                <span className="text-xl md:text-2xl font-bold text-[#2a3443] whitespace-nowrap ml-4">
                  {car.price || 'N/A'}
                </span>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 lg:gap-6">
                {/* Large Main Image - Spans 3 cols on desktop */}
                <div
                  className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[500px] cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
                  onClick={() => openLightbox(car.images[0])}
                >
                  <Image
                    src={car.images[0]}
                    alt={`${car.name} - Main View`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={car === CAR_GALLERIES[0]}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Right Side Grid - Spans 2 cols on desktop */}
                <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-2 gap-3 lg:gap-4 h-full lg:h-[500px]">
                  {car.images.slice(1, 5).map((image, index) => {
                    const totalImages = car.images.length;
                    // Mobile shows 4 images (1 large + 3 small), Desktop shows 5 (1 large + 4 small)
                    const extraOnMobile = totalImages - 4; // Extra images beyond what mobile shows
                    const extraOnDesktop = totalImages - 5; // Extra images beyond what desktop shows

                    // index 2 is the 3rd small image (last visible on mobile)
                    // index 3 is the 4th small image (last visible on desktop, hidden on mobile)
                    const isLastOnMobile = index === 2;
                    const isLastOnDesktop = index === 3;

                    const showMobileOverlay = isLastOnMobile && extraOnMobile > 0;
                    const showDesktopOverlay = isLastOnDesktop && extraOnDesktop > 0;

                    return (
                      <div
                        key={index}
                        className={`relative aspect-[4/3] lg:aspect-auto cursor-pointer overflow-hidden rounded-xl shadow-md group ${index === 3 ? 'hidden lg:block' : ''
                          }`}
                        onClick={() => openLightbox(image)}
                      >
                        <Image
                          src={image}
                          alt={`${car.name} - View ${index + 2}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 1024px) 33vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Mobile overlay: show on 3rd small image (index 2) if more than 4 total */}
                        {showMobileOverlay && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center lg:hidden">
                            <span className="text-white text-3xl font-bold">+{extraOnMobile}</span>
                          </div>
                        )}

                        {/* Desktop overlay: show on 4th small image (index 3) if more than 5 total */}
                        {showDesktopOverlay && (
                          <div className="absolute inset-0 bg-black/30 hidden lg:flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">+{extraOnDesktop}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View More Button */}
              <div className="mt-8 text-center">
                <a
                  href={`/gallery/${car.id}`}
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-[#d10e22] text-white font-semibold rounded-lg shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-[1.02]"
                >
                  View All Photos of {car.name}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </section>
        ))}

        {/* View Our Classics Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#2a3443] rounded-[32px] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/we-export_3.jpg)" }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a3443] via-[#2a3443]/80 to-[#2a3443]/40"></div>
              <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Looking for <span className="text-[#d10e22]">Classic</span> Cars?
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
                  Discover our exclusive collection of timeless automotive masterpieces at Pinnacle Classics.
                </p>
                <a
                  href="https://www.pinnacleclassics.com/collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#d10e22] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(209,14,34,0.3)] hover:shadow-[0_0_30px_rgba(209,14,34,0.5)] hover:bg-[#b00c1b] transition-all duration-300 hover:scale-[1.02] text-lg"
                >
                  View Pinnacle Classics
                  <ChevronRight className="ml-2 h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {currentImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-[#d10e22] transition-colors p-2 z-10"
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Car Name & Image Counter */}
            <div className="absolute top-4 left-4 text-white z-10">
              <h3 className="text-xl md:text-2xl font-bold">{currentImage.carName}</h3>
              <p className="text-white/70 text-sm mt-1">
                {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {ALL_GALLERY_IMAGES.length}
              </p>
            </div>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-6xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={currentImage.src}
                alt={`${currentImage.carName} - Full size view`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default GalleryPage;
