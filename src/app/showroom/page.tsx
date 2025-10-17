'use client';
import Navigation from '@/components/home/navigation';
import ShowroomHero from '@/components/showroom/ShowroomHero';
import VehicleGrid from '@/components/showroom/VehicleGrid';
import { useEffect } from 'react';

// Client-side metadata update for showroom page
const updateMetadata = () => {
  if (typeof document !== 'undefined') {
    document.title = "Showroom | We Export Cars";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Browse our premium vehicle showroom at We Export Cars. Discover luxury cars, SUVs, and specialty vehicles available for international export from Africa.');
  }
};

const ShowroomPage = () => {
  useEffect(() => {
    updateMetadata();
  }, []);

  return (
    <>
      <Navigation />
  <main className="pt-16">
        <ShowroomHero />
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <VehicleGrid />
          </div>
        </section>
      </main>
      
    </>
  );
};

export default ShowroomPage;
