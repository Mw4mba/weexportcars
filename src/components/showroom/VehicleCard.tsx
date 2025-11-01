import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Gauge, Fuel, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/vehicleData';

const VehicleCard: React.FC<{ vehicle: Vehicle; index?: number; visible?: boolean }> = ({ vehicle, index = 0, visible = true }) => {
  return (
    <Link href={`/car/${vehicle.slug}`} passHref>
      <Card
        className={`group shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl hover:scale-[1.02] border-t-4 border-[#d10e22] ${
          visible ? 'animate-scale-in' : 'opacity-0'
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={vehicle.image} 
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500 transform"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-4 right-4 bg-[#d10e22] text-white px-2 py-1 rounded z-10">{vehicle.condition}</Badge>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-[#2a3443]">
              {vehicle.tags.includes('Classic') ? 'Classic/Retro' : `${vehicle.make} ${vehicle.model}`}
            </h3>
            <p className="text-3xl font-bold text-[#d10e22] mt-2">{vehicle.price}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#e6e6e6]">
            <div className="flex items-center space-x-2 text-[#2a3443]/60">
              <Gauge className="h-4 w-4 text-[#2a3443]" />
              <span className="text-sm">{vehicle.mileage}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2a3443]/60">
              <Fuel className="h-4 w-4 text-[#2a3443]" />
              <span className="text-sm">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2a3443]/60">
              <Car className="h-4 w-4 text-[#2a3443]" />
              <span className="text-sm">{vehicle.bodyType}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2a3443]/60">
              <Calendar className="h-4 w-4 text-[#2a3443]" />
              <span className="text-sm">{vehicle.year}</span>
            </div>
          </div>

          <button className="w-full inline-block px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60">View Details</button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
