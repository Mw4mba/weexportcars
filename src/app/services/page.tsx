import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesIntro from './components/ServicesIntro';
import Navigation from '@/components/home/navigation';
import ServicesGridWrapper from './components/ServicesGridWrapper';
import { Metadata } from 'next';

// Static generation with revalidation for better performance
export const revalidate = 3600; // Revalidate every hour

// Metadata for Services page
export const metadata: Metadata = {
  title: "Our Services",
  description: "We Export Cars offers comprehensive vehicle export services including consultation, documentation, purchase assistance, insurance, logistics, customs clearance, and door-to-door delivery worldwide.",
  keywords: ["vehicle export services", "car shipping services", "international logistics", "customs clearance", "vehicle documentation", "export consultation", "door-to-door delivery"],
  openGraph: {
    title: "Our Services | We Export Cars",
    description: "Comprehensive vehicle export services from consultation to delivery. We Export Cars handles every aspect of international car shipping from Africa.",
    type: "website",
  },
};

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
