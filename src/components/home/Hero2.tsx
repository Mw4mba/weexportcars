'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { GALLERY_IMAGES } from '@/lib/galleryData';
import { handleSmoothScroll } from '@/utils/smoothScroll';


const heroTextContent = [
    {
        title: "Exporting South Africa's Finest Vehicles",
        subtitle: "Experience a seamless, transparent, and premium vehicle exporting service. We handle everything, so you can focus on the destination.",
    },
    {
        title: "Your Gateway to Global Automotive Excellence",
        subtitle: "From Johannesburg to the world. We specialize in sourcing and delivering luxury and exotic cars to discerning clients globally.",
    },
    {
        title: "Drive Your Dream Car, Anywhere in the World",
        subtitle: "Leverage our expertise in logistics, finance, and customs clearance to make your international car purchase a reality.",
    },
];

// Use images from gallery for the hero carousel (select 8 images)
const heroImageContent = [
    GALLERY_IMAGES[0],  // First image
    GALLERY_IMAGES[4],  // Fifth image
    GALLERY_IMAGES[8],  // Ninth image
    GALLERY_IMAGES[12], // Thirteenth image
    GALLERY_IMAGES[16], // Seventeenth image
    GALLERY_IMAGES[2],  // Third image
    GALLERY_IMAGES[10], // Eleventh image
    GALLERY_IMAGES[18], // Nineteenth image
];

export default function Hero ()  {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Refs for GSAP animations
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const previousIndexRef = useRef(0);

    // Initial load animation
    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, []);

    // Synchronized carousel animation whenever currentIndex changes
    useEffect(() => {
        if (previousIndexRef.current !== currentIndex) {
            const tl = gsap.timeline();
            
            // Animate both text and image simultaneously
            if (textRef.current && imageRef.current) {
                // Exit animations (parallel)
                tl.to(textRef.current, {
                    opacity: 0,
                    y: -40,
                    duration: 0.5,
                    ease: 'power2.in'
                }, 0)
                .to(imageRef.current, {
                    x: '-100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                }, 0)
                // Enter animations (parallel)
                .fromTo(
                    textRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                )
                .fromTo(
                    imageRef.current,
                    { x: '100%', opacity: 0 },
                    { x: '0%', opacity: 1, duration: 0.8, ease: 'power2.out' },
                    '<' // Start at the same time as text enter animation
                );
            }
            
            previousIndexRef.current = currentIndex;
        }
    }, [currentIndex]);

    // Synchronized carousel changes every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % Math.min(heroTextContent.length, heroImageContent.length));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="w-full bg-white pt-20 md:pt-24 pb-8 md:pb-12"
        >
            <div
                ref={heroRef}
                className="w-full max-w-7xl mx-auto px-4 sm:px-6"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    {/* Text Carousel - Left */}
                    <div className="
                    relative
                    w-full md:w-2/5 lg:w-[32%] text-left h-[320px] sm:h-[380px] md:h-[500px] flex flex-col justify-center items-center md:items-start
                    max-w-full
                    px-4 sm:px-6 md:px-0
                    ">
                        <div
                            ref={textRef}
                            className="absolute w-full"
                        >
                            <div className="flex flex-col items-center md:items-start w-full">
                                <span className="text-[#d10e22] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest mb-2 block break-words text-balance text-center md:text-left">Premium Vehicle Export</span>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a3443] mb-3 md:mb-4 leading-[1.15] sm:leading-tight break-words text-balance max-w-[500px] sm:max-w-[550px] md:max-w-full text-center md:text-left">
                                    {heroTextContent[currentIndex].title}
                                </h1>
                                <p className="text-base sm:text-lg text-[#2a3443]/80 mb-6 md:mb-8 break-words text-balance max-w-[450px] sm:max-w-[500px] md:max-w-full leading-relaxed text-center md:text-left">
                                    {heroTextContent[currentIndex].subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mt-44 sm:mt-52 md:mt-48 absolute bottom-0 w-full flex justify-center md:justify-start">
                            <a
                                href="#contact"
                                onClick={handleSmoothScroll}
                                className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/50 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60 whitespace-nowrap"
                            >
                                Export My Car
                            </a>
                        </div>
                    </div>

                    {/* Image Carousel - Right (Centered and fully visible on mobile) */}
                    <div className="w-full md:w-3/5 lg:w-[66%] order-first md:order-last flex justify-center items-center">
                        <div className="relative w-full flex justify-center items-center aspect-[16/9] md:aspect-[16/9] rounded-2xl shadow-2xl h-48 xs:h-56 sm:h-72 md:h-[500px] bg-white overflow-hidden group">
                            <div
                                ref={imageRef}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={heroImageContent[currentIndex]}
                                    alt="Premium Car"
                                    fill
                                    priority={currentIndex === 0}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover rounded-2xl"
                                />
                                
                                {/* Overlay gradient for button visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* View Gallery Button */}
                                <Link href="/gallery">
                                    <div className="absolute bottom-4 right-4 px-4 sm:px-6 py-2 sm:py-3 bg-[#d10e22] text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer">
                                        View More in Gallery
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}