"use client";

import React from 'react';
import AboutUsSection from '@/components/home/AboutUsSection';
import AboutHero from './components/AboutHero';

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutUsSection />
    </main>
  );
}
