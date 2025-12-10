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
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-[#f8f9fa]">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#2a3443] to-[#1a2332] rounded-3xl overflow-visible">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Left side - Text */}
                <div className="flex-1 px-8 py-16 md:px-16 md:py-20 text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                    Our <span className="text-[#d10e22]">Gallery</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 max-w-xl">
                    Explore our collection of premium vehicles exported from South Africa. 
                    Each photograph tells a story of quality, luxury, and successful delivery.
                  </p>
                </div>
                
                {/* Right side - Floating Image Card */}
                <div className="relative w-full lg:w-[33%] px-8 pb-8 lg:px-0 lg:pb-0 lg:pr-16">
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transform lg:translate-y-2 h-[180px] md:h-[200px]">
                    <Image
                      src="/we-export_3.jpg"
                      alt="Premium Vehicle Export"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Gallery Sections */}
        {CAR_GALLERIES.map((car) => (
          <section key={car.id} className="py-16 px-4 border-b border-gray-200 last:border-b-0">
            <div className="max-w-7xl mx-auto">
              {/* Car Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2a3443]">
                <span className="text-[#d10e22]">{car.name}</span>
              </h2>
              
              {/* Image Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                      index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'
                    }`}
                    onClick={() => openLightbox(image)}
                  >
                    <Image
                      src={image}
                      alt={`${car.name} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes={index === 0 
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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
