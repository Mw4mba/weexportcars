'use client';
import { Vehicle } from '@/lib/vehicleData';
import { Badge } from '@/components/ui/badge';
import { Tag, MapPin, Calendar, Gauge, Fuel } from 'lucide-react';
import { useContactForm } from '@/contexts/ContactFormContext';

const VehicleHeader = ({ vehicle }: { vehicle: Vehicle }) => {
  const { openContactForm } = useContactForm();

  const handleInquireClick = () => {
    openContactForm(vehicle);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2a3443] leading-tight">
            {`${vehicle.make} ${vehicle.model}`}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Cape Town, South Africa</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-[#d10e22] text-3xl md:text-4xl font-bold">
            {vehicle.price}
          </div>
          <p className="text-sm text-gray-500 mt-1">Price is negotiable</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-[#2a3443]">Year</p>
              <p className="text-sm text-gray-600">{vehicle.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-[#2a3443]">Mileage</p>
              <p className="text-sm text-gray-600">{vehicle.mileage}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-[#2a3443]">Fuel Type</p>
              <p className="text-sm text-gray-600">{vehicle.specs.fuelType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-[#2a3443]">Transmission</p>
              <p className="text-sm text-gray-600">{vehicle.transmission}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          {vehicle.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-[#e6e6e6] text-[#2a3443] hover:bg-[#d1d1d1] text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <button 
          onClick={handleInquireClick}
          className="w-full bg-[#d10e22] text-white py-4 rounded-lg font-semibold hover:bg-[#b00c1b] transition-colors"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default VehicleHeader;
