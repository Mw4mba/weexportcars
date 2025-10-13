"use client";

import React from 'react';
import AboutUsSection from '@/components/home/AboutUsSection';
import AboutHero from '@/components/about/AboutHero';
import Navigation from '@/components/home/navigation';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      <AboutHero />
      <AboutUsSection />
    </main>
  );
}
