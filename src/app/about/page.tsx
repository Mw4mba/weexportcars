import React from 'react';
import Navigation from '@/components/home/navigation';
import Footer from '@/components/home/footer';
import AboutContent from './components/AboutContent';
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navigation />
      <AboutContent />
      <Footer />
    </main>
  );
}
