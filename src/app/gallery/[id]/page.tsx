'use client';

import React, { useState, useCallback, useEffect, use } from 'react';
import Navigation from '@/components/home/navigation';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Fuel, Settings, ShieldCheck } from 'lucide-react';
import { CAR_GALLERIES, CarGallery } from '@/lib/galleryData';
import ContactFormSection from '@/components/home/ContactFormSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function VehicleGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // For Lightbox
    const [activeHeroIndex, setActiveHeroIndex] = useState(0); // For Carousel

    const car: CarGallery | undefined = CAR_GALLERIES.find((c) => c.id === resolvedParams.id);

    const imageCount = car?.images.length ?? 0;

    // Lightbox handlers
    const openLightbox = useCallback((index: number) => {
        setSelectedImageIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedImageIndex(null);
    }, []);

    const goToPreviousLightbox = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (imageCount === 0) return;
        setSelectedImageIndex(prev =>
            prev !== null ? (prev - 1 + imageCount) % imageCount : null
        );
    }, [imageCount]);

    const goToNextLightbox = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (imageCount === 0) return;
        setSelectedImageIndex(prev =>
            prev !== null ? (prev + 1) % imageCount : null
        );
    }, [imageCount]);

    // Hero Carousel handlers
    const goToPreviousHero = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (imageCount === 0) return;
        setActiveHeroIndex(prev => (prev - 1 + imageCount) % imageCount);
    }, [imageCount]);

    const goToNextHero = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (imageCount === 0) return;
        setActiveHeroIndex(prev => (prev + 1) % imageCount);
    }, [imageCount]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeHeroIndex === null && selectedImageIndex === null) return;
            if (imageCount === 0) return;

            if (selectedImageIndex !== null) {
                // Lightbox navigation
                if (e.key === 'ArrowLeft') {
                    setSelectedImageIndex(prev => prev !== null ? (prev - 1 + imageCount) % imageCount : null);
                } else if (e.key === 'ArrowRight') {
                    setSelectedImageIndex(prev => prev !== null ? (prev + 1) % imageCount : null);
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            } else {
                // Hero navigation (optional, nice to have)
                if (e.key === 'ArrowLeft') {
                    setActiveHeroIndex(prev => (prev - 1 + imageCount) % imageCount);
                } else if (e.key === 'ArrowRight') {
                    setActiveHeroIndex(prev => (prev + 1) % imageCount);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, activeHeroIndex, closeLightbox, imageCount]);

    // After all hooks, check if car exists
    if (!car) {
        notFound();
    }

    const currentLightboxImage = selectedImageIndex !== null ? car.images[selectedImageIndex] : null;

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-[#f8f9fa] pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center text-[#2a3443] hover:text-[#d10e22] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Gallery
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#2a3443] mb-8">
                        <span className="text-[#d10e22]">{car.name}</span>
                    </h1>

                    {/* Two-column layout: Carousel + Price Card */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-12">
                        {/* Carousel Section */}
                        <div className="flex-1 min-w-0">
                            {/* Main Hero Image */}
                            <div
                                className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl group cursor-zoom-in bg-black/5"
                                onClick={() => openLightbox(activeHeroIndex)}
                            >
                                <Image
                                    src={car.images[activeHeroIndex]}
                                    alt={`${car.name} - View ${activeHeroIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                />

                                {/* Navigation Buttons */}
                                <button
                                    onClick={goToPreviousHero}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-[#d10e22] text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={goToNextHero}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-[#d10e22] text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {activeHeroIndex + 1} / {imageCount}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-2 mt-4">
                                {car.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative aspect-[4/3] cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${activeHeroIndex === idx
                                                ? 'ring-2 ring-[#d10e22] ring-offset-2 opacity-100 scale-105 z-10'
                                                : 'opacity-60 hover:opacity-100 hover:scale-105'
                                            }`}
                                        onClick={() => setActiveHeroIndex(idx)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price & Specs Card */}
                        <div className="lg:w-[340px] shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-32">
                                {/* Price */}
                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Price</p>
                                    <p className="text-3xl font-bold text-[#2a3443] mt-1">
                                        {car.price || 'N/A'}
                                    </p>
                                </div>

                                <hr className="border-gray-200 mb-6" />

                                {/* Specs Grid */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Fuel className="w-5 h-5 text-[#d10e22] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fuel Capacity</p>
                                            <p className="text-sm font-semibold text-[#2a3443]">{car.specs?.fuelCapacity || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Settings className="w-5 h-5 text-[#d10e22] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Transmission</p>
                                            <p className="text-sm font-semibold text-[#2a3443]">{car.specs?.transmission || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <ShieldCheck className="w-5 h-5 text-[#d10e22] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Condition</p>
                                            <p className="text-sm font-semibold text-[#2a3443]">{car.specs?.condition || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href="#contact"
                                    className="mt-6 block w-full text-center px-6 py-3 bg-[#d10e22] text-white font-semibold rounded-lg shadow-lg hover:bg-[#b00c1b] transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Enquire Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    {car.description && (
                        <div className="mb-16 max-w-4xl mx-auto text-center">
                            <h2 className="text-2xl font-bold mb-4 text-[#2a3443]">Vehicle Details</h2>
                            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">{car.description}</p>
                        </div>
                    )}
                </div>

                <div className="w-full">
                    <ContactFormSection backgroundImage={car.images[0]} />
                </div>

                {/* Lightbox Modal */}
                {currentLightboxImage && (
                    <div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white hover:text-[#d10e22] transition-colors p-2 z-10"
                            aria-label="Close"
                        >
                            <X className="h-8 w-8" />
                        </button>

                        <div className="absolute top-4 left-4 text-white z-10">
                            <h3 className="text-xl md:text-2xl font-bold">{car.name}</h3>
                            <p className="text-white/70 text-sm mt-1">
                                {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {car.images.length}
                            </p>
                        </div>

                        <button
                            onClick={goToPreviousLightbox}
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        <button
                            onClick={goToNextLightbox}
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        <div className="relative w-full h-full max-w-7xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={currentLightboxImage}
                                alt={`${car.name} - Full size view`}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                quality={100}
                            />
                        </div>
                    </div>
                )}
            </main >
        </>
    );
}
