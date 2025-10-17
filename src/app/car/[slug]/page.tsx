import { vehicleData, getVehicleBySlug } from '@/lib/vehicleData';
import Navigation from '@/components/home/navigation';
import { notFound } from 'next/navigation';
import VehicleHeader from '@/components/car/VehicleHeader';
import ImageGallery from '@/components/car/ImageGallery';

type Props = {
  params: Promise<{ slug: string }>;
};

const CarDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ImageGallery vehicle={vehicle} />
              
              {/* VehicleHeader for mobile/tablet - shows right after images */}
              <div className="lg:hidden mt-8">
                <VehicleHeader vehicle={vehicle} />
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{vehicle.description}</p>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-[#d10e22] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-[#2a3443]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* VehicleHeader for desktop - sticky sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <VehicleHeader vehicle={vehicle} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CarDetailPage;

// Static generation configuration
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600; // Revalidate every hour

// This function is needed for Next.js to know which dynamic routes to pre-render at build time.
export async function generateStaticParams() {
  return vehicleData.map((car) => ({
    slug: car.slug,
  }));
}
