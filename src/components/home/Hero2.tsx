'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Shield, Banknote, Car, Gauge, Zap } from 'lucide-react';


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
            className="min-h-screen bg-white flex items-center pt-20 md:pt-0"
        >
            <motion.div
                className="container mx-auto px-6 overflow-hidden"
                variants={heroLoadVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Text Carousel - Left */}
                    <div className="
                    relative top-0
                    md:w-1/2 w-full text-center md:text-left h-80 md:h-[500px] flex flex-col justify-center items-center md:items-start
                    px-2 sm:px-4
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
                                <div className="flex flex-col items-center md:items-start w-full">
                                    <span className="text-[#d10e22] text-sm xs:text-base md:text-lg font-semibold uppercase tracking-widest mb-2 block break-words text-balance">Premium Vehicle Export</span>
                                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-[#2a3443] mb-3 md:mb-4 leading-tight break-words text-balance max-w-full">
                                        {heroTextContent[index].title}
                                    </h1>
                                    <p className="text-base xs:text-lg text-[#2a3443]/80 mb-6 md:mb-8 break-words text-balance max-w-full">
                                        {heroTextContent[index].subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="mt-64 md:mt-48 absolute bottom-0">
                            <a
                                href="#contact"
                                className="inline-block px-6 xs:px-8 sm:px-10 py-3 xs:py-4 text-base xs:text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/50 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60 whitespace-nowrap"
                            >
                                Export My Car
                            </a>
                        </div>
                    </div>

                    {/* Image Carousel - Right (Centered and fully visible on mobile) */}
                    <div className="w-full md:[width:60vw] order-first md:order-last flex justify-center items-center">
                        <div className="relative flex justify-center items-center overflow-hidden aspect-[16/9] md:aspect-[16/9] rounded-2xl shadow-2xl h-56 xs:h-64 sm:h-80 md:h-[500px] bg-white">
                            <AnimatePresence initial={false} custom={1}>
                                <motion.img
                                    key={index}
                                    src={heroImageContent[index]}
                                    alt="Premium Car"
                                    custom={1}
                                    variants={slideVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="w-full h-full object-contain md:object-cover rounded-2xl shadow-2xl"
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}