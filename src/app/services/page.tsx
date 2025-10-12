"use client";

import React from 'react';
import ServicesHero from './components/ServicesHero';
import AboutUsSection from '@/components/home/AboutUsSection';

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-[#2a3443] mb-6">Our Services</h2>
        <p className="text-gray-600">We provide inspection, transport, customs clearance, and delivery. Contact us for tailored service packages.</p>
      </section>
    </main>
  );
}
