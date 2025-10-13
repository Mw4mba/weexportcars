"use client";

import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesIntro from './components/ServicesIntro';
import ServicesGrid from './components/ServicesGrid';
import Navigation from '@/components/home/navigation';

export default function ServicesPage() {

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      <ServicesHero />
      <ServicesIntro />
      <ServicesGrid />
    </main>
  );
}
