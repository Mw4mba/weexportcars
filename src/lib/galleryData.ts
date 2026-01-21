// Gallery images organized by car
export interface CarGallery {
  id: string;
  name: string;
  images: string[];
  description?: string;
}

export const CAR_GALLERIES: CarGallery[] = [
  {
    id: '2016-prado',
    name: '2019 Toyota Hilux 2.8GD-6 4x4 auto',
    images: [
      '/cars/2016Prado/IMG-20251020-WA0011.jpg',
      '/cars/2016Prado/IMG-20251020-WA0012.jpg',
      '/cars/2016Prado/IMG-20251020-WA0013.jpg',
      '/cars/2016Prado/IMG-20251020-WA0014.jpg',
      '/cars/2016Prado/IMG-20251020-WA0015.jpg',
      '/cars/2016Prado/IMG-20251020-WA0016.jpg',
      '/cars/2016Prado/IMG-20251020-WA0017.jpg',
      '/cars/2016Prado/IMG-20251020-WA0018.jpg',
    ],
    description: "Experience the rugged reliability of the 2019 Toyota Hilux 2.8GD-6. This 4x4 automatic double cab combines power with comfort, making it perfect for both work and adventure. Features include a powerful 2.8L turbo diesel engine, spacious interior, and advanced safety features, ensuring you conquer any terrain with confidence."
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
    description: "The 2018 Toyota Land Cruiser Prado represents the pinnacle of off-road luxury. With its sophisticated styling and robust performance, this SUV is designed for those who demand excellence. It features a versatile interior with premium materials, advanced 4WD capabilities, and a smooth ride on any surface, making it an ideal choice for families and adventurers alike."
  },
  {
    id: '2022-prado',
    name: '2022 Toyota Prado GD6 VX-L',
    images: [
      '/cars/2022ToyotaPrado/IMG-20251020-WA0024.jpg',
      '/cars/2022ToyotaPrado/IMG-20251020-WA0025.jpg',
      '/cars/2022ToyotaPrado/IMG-20251020-WA0026.jpg',
      '/cars/2022ToyotaPrado/IMG-20251020-WA0027.jpg',
      '/cars/2022ToyotaPrado/IMG-20251020-WA0028.jpg',
      '/cars/2022ToyotaPrado/IMG-20251020-WA0029.jpg',
    ],
    description: "Step into luxury with the 2022 Toyota Prado GD6 VX-L. This top-of-the-range model offers unparalleled comfort and technology. From its leather-appointed seats to its state-of-the-art infotainment system and comprehensive safety suite, every detail has been crafted to provide a premium driving experience. Perfect for city driving and off-road escapades."
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
    description: "The latest 2025 Toyota Land Cruiser Prado sets a new standard for modern SUVs. Combining legendary durability with cutting-edge design, it features a bold new look and enhanced performance. Equipped with the latest driver-assist technologies and a refined powertrain, it delivers a seamless blend of power, efficiency, and luxury for the discerning driver."
  },
  {
    id: 'g-wagon',
    name: 'G-Wagon',
    images: [
      '/cars/g-wagon/20251205_131214390_iOS.jpg',
      '/cars/g-wagon/20251205_131219811_iOS.jpg',
      '/cars/g-wagon/20251205_131227689_iOS.jpg',
      '/cars/g-wagon/20251205_131235195_iOS.jpg',
      '/cars/g-wagon/20251205_131244085_iOS.jpg',
      '/cars/g-wagon/20251205_131252509_iOS.jpg',
    ],
    description: "An icon of design and performance, the G-Wagon stands alone in the world of luxury SUVs. Its unmistakable boxy silhouette houses a masterpiece of engineering. With incredible off-road capability and a cabin that rivals high-end saloons in luxury, the G-Wagon makes a bold statement wherever it goes. A true symbol of prestige and power."
  },
  {
    id: 'land-rover',
    name: 'Land-Rover',
    images: [
      '/cars/land-rover/20251205_130359474_iOS.jpg',
      '/cars/land-rover/20251205_130440699_iOS.jpg',
      '/cars/land-rover/20251205_130452093_iOS.jpg',
      '/cars/land-rover/20251205_130514315_iOS.jpg',
      '/cars/land-rover/20251205_130527240_iOS.jpg',
    ],
    description: "Embrace the spirit of adventure with the Land Rover. Known for its sophisticated design and exceptional capability, this vehicle is at home in the city as it is in the wild. It offers a refined interior, advanced technology, and the legendary Land Rover 4WD system, ensuring a composed and confident drive in all conditions."
  },
  {
    id: 'prado',
    name: 'Prado',
    images: [
      '/cars/prado/20251121_055630792_iOS.jpg',
      '/cars/prado/20251121_055646825_iOS.jpg',
      '/cars/prado/20251121_055659386_iOS.jpg',
      '/cars/prado/20251121_055711654_iOS.jpg',
      '/cars/prado/20251121_055724494_iOS.jpg',
      '/cars/prado/20251121_060233229_iOS.jpg',
      '/cars/prado/20251121_060246590_iOS.jpg',
      '/cars/prado/20251121_060435096_iOS.jpg',
      '/cars/prado/20251121_060444410_iOS.jpg',
      '/cars/prado/20251121_060456522_iOS.jpg',
      '/cars/prado/20251121_060856926_iOS.jpg',
      '/cars/prado/20251121_060903707_iOS.jpg',
      '/cars/prado/20251121_060916744_iOS.jpg',
      '/cars/prado/20251121_060927899_iOS.jpg',
      '/cars/prado/20251121_060938406_iOS.jpg',
    ],
    description: "The Toyota Prado is a testament to enduring quality and versatile performance. Ideally suited for long-distance travel and daily commuting alike, it offers a spacious cabin, comfortable seating, and a reputation for reliability that is second to none. A dependable companion for all your journeys."
  },
  {
    id: 'prado-2',
    name: 'Prado-2',
    images: [
      '/cars/prado-2/20260113_091526869_iOS.jpg',
      '/cars/prado-2/20260113_091535724_iOS.jpg',
      '/cars/prado-2/20260113_091547901_iOS.jpg',
      '/cars/prado-2/20260113_091559566_iOS.jpg',
      '/cars/prado-2/20260113_091612523_iOS.jpg',
      '/cars/prado-2/20260113_091627164_iOS.jpg',
      '/cars/prado-2/20260113_091640938_iOS.jpg',
      '/cars/prado-2/20260113_091713048_iOS.jpg',
    ],
    description: "Discover the enhanced features of this Prado model. Built for comfort and durability, it comes equipped with upgraded finishes and advanced driving aids. Whether navigating urban streets or rugged trails, this vehicle provides a secure and enjoyable driving experience for the whole family."
  },
  {
    id: 'prado-3',
    name: 'Prado-3',
    images: [
      '/cars/prado-3/20251108_093709227_iOS.jpg',
      '/cars/prado-3/20251108_093721773_iOS.jpg',
      '/cars/prado-3/20251108_093740380_iOS.jpg',
      '/cars/prado-3/20251108_093807591_iOS.jpg',
      '/cars/prado-3/20251108_093820876_iOS.jpg',
    ],
    description: "This Prado variant offers a perfect balance of utility and style. With its clean lines and practical design, it is ready for any challenge. The interior prioritizes driver convenience and passenger comfort, making long drives a pleasure. A robust vehicle for those who value performance and practicality."
  },
  {
    id: 'prado-4',
    name: 'Prado-4',
    images: [
      '/cars/prado-4/20251104_152828114_iOS.jpg',
      '/cars/prado-4/20251104_152924170_iOS.jpg',
      '/cars/prado-4/20251104_152939741_iOS.jpg',
      '/cars/prado-4/20251104_152950711_iOS.jpg',
      '/cars/prado-4/20251104_153239270_iOS.jpg',
    ],
    description: "Experience the legacy of the Land Cruiser family with this capable Prado. It combines tough construction with everyday usability. Featuring a strong engine and capable 4x4 system, it's built to take you further. Inside, you'll find a functional workspace and comfortable seating, making it a great all-rounder."
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
