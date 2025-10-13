import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesIntro from './components/ServicesIntro';
import Navigation from '@/components/home/navigation';
import ServicesGridWrapper from './components/ServicesGridWrapper';

// Turn off static page generation for this route
export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      <ServicesHero />
      <ServicesIntro />
      <ServicesGridWrapper />
    </main>
  );
}
