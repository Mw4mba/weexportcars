'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import Image from 'next/image';


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

const heroImageContent = [
    '/we-export_1.png',
    '/we-export_2.jpg',
    '/we-export_3.jpg',
];

// Fallbacks to external images if local ones are not provided in /public
const heroImageFallback = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Hero ()  {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % heroTextContent.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slideVariants = {
        hidden: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeInOut } },
        exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.5, ease: easeInOut } }),
    };

    // Animation for on-load fade-in and upward motion
    const heroLoadVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeInOut } },
    };

    // Animation for text carousel: fade in from bottom to top
    const textFadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeInOut } },
        exit: { opacity: 0, y: -40, transition: { duration: 0.5, ease: easeInOut } },
    };

    return (
        <section
            id="home"
            className="w-full bg-white pt-20 md:pt-24 pb-8 md:pb-12"
        >
            <motion.div
                className="w-full max-w-7xl mx-auto px-4 sm:px-6"
                variants={heroLoadVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    {/* Text Carousel - Left */}
                    <div className="
                    relative
                    w-full md:w-2/5 lg:w-[32%] text-left h-[320px] sm:h-[380px] md:h-[500px] flex flex-col justify-center items-start
                    max-w-full
                    ">
                        <AnimatePresence initial={false} custom={1}>
                            <motion.div
                                key={index}
                                custom={1}
                                variants={textFadeUpVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute w-full"
                            >
                                <div className="flex flex-col items-start w-full">
                                    <span className="text-[#d10e22] text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest mb-2 block break-words text-balance">Premium Vehicle Export</span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a3443] mb-3 md:mb-4 leading-[1.15] sm:leading-tight break-words text-balance max-w-[500px] sm:max-w-[550px] md:max-w-full">
                                        {heroTextContent[index].title}
                                    </h1>
                                    <p className="text-base sm:text-lg text-[#2a3443]/80 mb-6 md:mb-8 break-words text-balance max-w-[450px] sm:max-w-[500px] md:max-w-full leading-relaxed">
                                        {heroTextContent[index].subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="mt-44 sm:mt-52 md:mt-48 absolute bottom-0 w-full flex justify-center md:justify-start">
                            <a
                                href="#contact"
                                className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/50 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60 whitespace-nowrap"
                            >
                                Export My Car
                            </a>
                        </div>
                    </div>

                    {/* Image Carousel - Right (Centered and fully visible on mobile) */}
                    <div className="w-full md:w-3/5 lg:w-[66%] order-first md:order-last flex justify-center items-center">
                        <div className="relative w-full flex justify-center items-center aspect-[16/9] md:aspect-[16/9] rounded-2xl shadow-2xl h-48 xs:h-56 sm:h-72 md:h-[500px] bg-white overflow-hidden">
                            <AnimatePresence initial={false} custom={1}>
                                <motion.div
                                    key={index}
                                    custom={1}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={heroImageContent[index]}
                                        alt="Premium Car"
                                        fill
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover rounded-2xl"
                                        onError={(e) => { 
                                            const t = e.currentTarget as HTMLImageElement; 
                                            t.onerror = null; 
                                            t.src = heroImageFallback[index];
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}