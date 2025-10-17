'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/lib/vehicleData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ vehicle }: { vehicle: Vehicle }) => {
  const [mainImage, setMainImage] = useState(vehicle.image);
  const allImages = [vehicle.image, ...vehicle.gallery];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (image: string, index: number) => {
    setMainImage(image);
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setMainImage(allImages[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(newIndex);
    setMainImage(allImages[newIndex]);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
        <Image 
          src={mainImage} 
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          priority={currentImageIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          className="object-cover"
        />
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(image, index)}
            className={`flex-none w-24 aspect-[4/3] rounded-md overflow-hidden relative ${
              currentImageIndex === index 
                ? 'ring-2 ring-[#d10e22] ring-offset-2' 
                : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
            }`}
          >
            <Image 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="96px"
              loading={index > 2 ? 'lazy' : 'eager'}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
