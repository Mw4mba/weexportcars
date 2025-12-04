"use client";

import dynamic from 'next/dynamic';
import Navigation from '@/components/home/navigation';
import WhoWeAreAndOfferings from '../components/home/WhoWeAreAndOfferings';
import Hero2 from '@/components/home/Hero2';
import GalleryCarousel from '@/components/home/GalleryCarousel';
import ResponsiveProcessSection from '@/components/home/ResponsiveProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

// Lazy load heavy components that are below the fold
const ContactFormSection = dynamic(() => import('@/components/home/ContactFormSection'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse" aria-label="Loading contact form" />
});

const App = () => {

    return (
        <>
            <Navigation />
            <main>
                <Hero2 />
                <WhoWeAreAndOfferings />
                <GalleryCarousel />
                <ResponsiveProcessSection />
                <TestimonialsSection />
                <ContactFormSection />
            </main>
        </>
    );
};

export default App;
