'use client';
import Navigation from '@/components/home/navigation';
import ShowroomHero from '@/components/showroom/ShowroomHero';
import VehicleGrid from '@/components/showroom/VehicleGrid';

const ShowroomPage = () => {
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
