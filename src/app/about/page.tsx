import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/home/navigation';
import { Metadata } from 'next';

// Enable ISR with 1-hour revalidation (same as Services page)
export const revalidate = 3600;

// Metadata for About page
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about We Export Cars - your trusted partner for premium vehicle export services. Discover our mission, values, and commitment to excellence in international car shipping from Africa.",
  keywords: ["about we export cars", "vehicle export company", "car export services Africa", "international vehicle shipping", "about us"],
  openGraph: {
    title: "About Us | We Export Cars",
    description: "Learn about We Export Cars - your trusted partner for premium vehicle export services from Africa to worldwide destinations.",
    type: "website",
  },
};

// Lazy load heavy components to improve initial page load
const AboutHero = dynamic(() => import('./components/AboutHero'), {
  loading: () => (
    <div className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse rounded-lg" />
  ),
});

const AboutUsSection = dynamic(() => import('@/components/home/AboutUsSection'), {
  loading: () => (
    <div className="w-full h-[600px] bg-gray-900 animate-pulse" />
  ),
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      <AboutHero />
      <AboutUsSection />
    </main>
  );
}
