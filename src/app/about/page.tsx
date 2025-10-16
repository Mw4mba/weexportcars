import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/home/navigation';

// Enable ISR with 1-hour revalidation (same as Services page)
export const revalidate = 3600;

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
