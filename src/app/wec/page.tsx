"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../../components/wec/Navbar';
import HeroSection from '../../components/wec/HeroSection';
import AboutUsSection from '../../components/wec/AboutUsSection';
import ShowroomSection from '../../components/wec/ShowroomSection';
import ProcessSection from '../../components/wec/ProcessSection';
import ContactFormSection from '../../components/wec/ContactFormSection';
// Note: In a production Next.js environment, you would use separate files for
// components and hooks, but here we keep everything in one file as requested.

                        

// Main WEC Page Component
const WecPage = () => {
    // State and handlers for modular sections
    const [isLoaded, setIsLoaded] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [currentCarIndex, setCurrentCarIndex] = useState(0);
    const [activeStep, setActiveStep] = useState('step-1');
    const processStepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Scroll to section handler
    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // Simulate loading effect
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Carousel auto-advance for HeroSection
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Carousel auto-advance for ShowroomSection
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarIndex((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar />
            <main className="pt-20">
                <HeroSection />
                <AboutUsSection />
                <ShowroomSection />
                <ProcessSection />
                <ContactFormSection />
            </main>
            
        </>
    );
};

export default WecPage;
