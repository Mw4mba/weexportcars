// Gallery images organized by car
export interface CarGallery {
  id: string;
  name: string;
  images: string[];
}

export const CAR_GALLERIES: CarGallery[] = [
  {
    id: '2016-prado',
    name: '2016 Toyota Land Cruiser Prado',
    images: [
      '/cars/2016Prado/IMG-20251020-WA0011.jpg',
      '/cars/2016Prado/IMG-20251020-WA0012.jpg',
      '/cars/2016Prado/IMG-20251020-WA0013.jpg',
      '/cars/2016Prado/IMG-20251020-WA0014.jpg',
      '/cars/2016Prado/IMG-20251020-WA0015.jpg',
      '/cars/2016Prado/IMG-20251020-WA0016.jpg',
      '/cars/2016Prado/IMG-20251020-WA0017.jpg',
      '/cars/2016Prado/IMG-20251020-WA0018.jpg',
      '/cars/2016Prado/IMG-20251020-WA0024.jpg',
      '/cars/2016Prado/IMG-20251020-WA0025.jpg',
      '/cars/2016Prado/IMG-20251020-WA0026.jpg',
      '/cars/2016Prado/IMG-20251020-WA0027.jpg',
      '/cars/2016Prado/IMG-20251020-WA0028.jpg',
      '/cars/2016Prado/IMG-20251020-WA0029.jpg',
    ],
  },
  {
    id: '2018-prado',
    name: '2018 Toyota Land Cruiser Prado',
    images: [
      '/cars/2018Prado/IMG-20251022-WA0001.jpg',
      '/cars/2018Prado/IMG-20251022-WA0002.jpg',
      '/cars/2018Prado/IMG-20251022-WA0003.jpg',
      '/cars/2018Prado/IMG-20251022-WA0004.jpg',
      '/cars/2018Prado/IMG-20251022-WA0005.jpg',
      '/cars/2018Prado/IMG-20251022-WA0006.jpg',
      '/cars/2018Prado/IMG-20251022-WA0007.jpg',
      '/cars/2018Prado/IMG-20251022-WA0008.jpg',
      '/cars/2018Prado/IMG-20251022-WA0009.jpg',
    ],
  },
  {
    id: '2025-prado',
    name: '2025 Toyota Land Cruiser Prado',
    images: [
      '/cars/2025Prado/IMG-20251013-WA0011.jpg',
      '/cars/2025Prado/IMG-20251013-WA0013.jpg',
      '/cars/2025Prado/IMG-20251013-WA0014.jpg',
      '/cars/2025Prado/IMG-20251013-WA0016.jpg',
      '/cars/2025Prado/IMG-20251013-WA0017.jpg',
      '/cars/2025Prado/IMG-20251013-WA0018.jpg',
      '/cars/2025Prado/IMG-20251013-WA0019.jpg',
      '/cars/2025Prado/IMG-20251013-WA0020.jpg',
    ],
  },
];

// Flatten all images for components that still need a simple array
export const GALLERY_IMAGES = CAR_GALLERIES.flatMap(car => car.images);

// Get all images with their car info for lightbox navigation
export interface GalleryImage {
  src: string;
  carName: string;
  carId: string;
  index: number;
}

export const ALL_GALLERY_IMAGES: GalleryImage[] = CAR_GALLERIES.flatMap(car =>
  car.images.map((src, index) => ({
    src,
    carName: car.name,
    carId: car.id,
    index,
  }))
);
