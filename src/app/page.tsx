"use client";

import { useRef, useState } from 'react';
import Navigation from '@/components/home/navigation';
import HeroSection from '../components/home/HeroSection';
import AboutUsSection from '../components/home/AboutUsSection';
import OurProcessSection from '../components/home/OurProcessSection';
import ContactFormSection from '../components/home/ContactFormSection';
import Hero2 from '@/components/home/Hero2';
import OurProcess from '@/components/home/OurProcess';
import Showroom from '@/components/home/Showroom';
import WeServeSection from '@/components/home/WeServe';
import InternationalMap from '@/components/home/InternationalMap';
import WhoWeAre from './wec2/components/WhoWeAre';
import ResponsiveProcessSection from '@/components/home/ResponsiveProcessSection';




const App = () => {
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
            <AboutUsSection />
            <Showroom />
            <ResponsiveProcessSection />
            <InternationalMap sectionRefs={{ international: undefined }} scrollToSection={scrollToSection} />
            <ContactFormSection />
        </>
    );
};

export default App;
