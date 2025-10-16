import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesIntro from './components/ServicesIntro';
import Navigation from '@/components/home/navigation';
import ServicesGridWrapper from './components/ServicesGridWrapper';

// Static generation with revalidation for better performance
export const revalidate = 3600; // Revalidate every hour

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
