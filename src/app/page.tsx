"use client";

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/home/navigation';
import HeroSection from '../components/home/HeroSection';
import WhoWeAreAndOfferings from '../components/home/WhoWeAreAndOfferings';
import OurProcessSection from '../components/home/OurProcessSection';
import Hero2 from '@/components/home/Hero2';
import OurProcess from '@/components/home/OurProcess';
import Showroom from '@/components/home/Showroom';
import WeServeSection from '@/components/home/WeServe';
import ResponsiveProcessSection from '@/components/home/ResponsiveProcessSection';

// Lazy load heavy components that are below the fold
const ContactFormSection = dynamic(() => import('@/components/home/ContactFormSection'), {
  ssr: true,
  loading: () => <div className="h-screen"></div> // Prevent layout shift
});

const InternationalMap = dynamic(() => import('@/components/home/InternationalMap'), {
  ssr: true,
  loading: () => <div className="h-screen"></div> // Prevent layout shift
});const App = () => {
    // Section refs for scrolling/navigation
    const weServeRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
    const sectionRefs = { weServe: weServeRef };

    // Scroll to section helper
    const scrollToSection = (section: string) => {
        const ref = sectionRefs[section as keyof typeof sectionRefs];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Hovered country state for WeServeSection
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    return (
        <>
            <Navigation />
            <Hero2 />
            <WhoWeAreAndOfferings />
            <Showroom />
            <ResponsiveProcessSection />
            <InternationalMap sectionRefs={{ international: undefined }} scrollToSection={scrollToSection} />
            <ContactFormSection />
        </>
    );
};

export default App;
