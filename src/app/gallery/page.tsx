'use client';

import React, { useState } from 'react';
import Navigation from '@/components/home/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/galleryData';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f8f9fa]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#2a3443] to-[#1a2332]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Our <span className="text-[#d10e22]">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Explore our collection of premium vehicles exported from South Africa. 
              Each photograph tells a story of quality, luxury, and successful delivery.
            </p>
          </div>
        </section>

        {/* Bento Box Grid Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Bento Grid Layout - Optimized for visibility and mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px]">
              {/* Row 1: Featured large + 2 regular (mobile: 2 col) */}
              <div 
                className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[0])}
              >
                <Image
                  src={GALLERY_IMAGES[0]}
                  alt="Featured vehicle 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[1])}
              >
                <Image
                  src={GALLERY_IMAGES[1]}
                  alt="Vehicle 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[2])}
              >
                <Image
                  src={GALLERY_IMAGES[2]}
                  alt="Vehicle 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Row 2: Regular images */}
              <div 
                className="hidden sm:block relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[3])}
              >
                <Image
                  src={GALLERY_IMAGES[3]}
                  alt="Vehicle 4"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[4])}
              >
                <Image
                  src={GALLERY_IMAGES[4]}
                  alt="Vehicle 5"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[5])}
              >
                <Image
                  src={GALLERY_IMAGES[5]}
                  alt="Vehicle 6"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Row 3: Wide + regular */}
              <div 
                className="col-span-2 sm:col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[6])}
              >
                <Image
                  src={GALLERY_IMAGES[6]}
                  alt="Vehicle 7 - Wide view"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="hidden md:block row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[7])}
              >
                <Image
                  src={GALLERY_IMAGES[7]}
                  alt="Vehicle 8 - Tall"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div 
                className="hidden lg:block row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[8])}
              >
                <Image
                  src={GALLERY_IMAGES[8]}
                  alt="Vehicle 9 - Tall"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Row 4: Regular grid */}
              {GALLERY_IMAGES.slice(9, 14).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Vehicle ${index + 10}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}

              {/* Row 5: Featured large + regular */}
              <div 
                className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[14])}
              >
                <Image
                  src={GALLERY_IMAGES[14]}
                  alt="Featured vehicle 15"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {GALLERY_IMAGES.slice(15, 17).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Vehicle ${index + 16}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}

              <div 
                className="hidden sm:block relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(GALLERY_IMAGES[17])}
              >
                <Image
                  src={GALLERY_IMAGES[17]}
                  alt="Vehicle 18"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Row 6: Final images */}
              {GALLERY_IMAGES.slice(18, 20).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Vehicle ${index + 19}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[#d10e22] transition-colors p-2 z-10"
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Full size view"
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
