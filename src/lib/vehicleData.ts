export interface Vehicle {
  slug: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  transmission: string;
  bodyType: string;
  condition: 'Used' | 'New' | 'Demo';
  image: string;
  gallery: string[];
  tags: string[];
  description: string;
  features: string[];
  featured?: boolean;
  specs: {
    engine: string;
    power: string;
    drivetrain: string;
    fuelType: string;
    color: string;
  };
}

export const vehicleData: Vehicle[] = [
  {
    slug: 'bentley-bentayga-2020',
    make: 'Bentley',
    model: 'Bentayga',
    year: 2020,
    price: 'R2,336,000',
    mileage: '66,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    featured: true,
    image: '/vehicles/mercedes-amg.jpg',
    gallery: [
      '/vehicles/range-rover.jpg',
      '/vehicles/porsche.jpg',
      '/vehicles/bmw-x7.jpg',
      '/vehicles/luxury-car.jpg',
    ],
    tags: ['Luxury', 'SUV', 'Low Mileage', 'Export Ready'],
    description:
      'Experience unparalleled luxury and performance with this meticulously maintained 2020 Bentley Bentayga. A statement of sophistication, this SUV combines a commanding presence with a handcrafted interior. Ready for immediate export to discerning buyers worldwide.',
    features: [
      'Panoramic Sunroof',
      'Naim for Bentley Premium Audio',
      'Heated and Ventilated Seats',
      'Adaptive Cruise Control',
      'Night Vision',
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo',
      power: '404 kW',
      drivetrain: 'All-Wheel Drive',
      fuelType: 'Petrol',
      color: 'Onyx Black',
    },
  },
  {
    slug: 'toyota-urban-cruiser-2023',
    make: 'Toyota',
    model: 'Urban Cruiser',
    year: 2023,
    price: 'R453,609',
    mileage: '110,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    featured: true,
    image: '/vehicles/luxury-car.jpg',
    gallery: [
        '/vehicles/mercedes-amg.jpg',
        '/vehicles/range-rover.jpg',
        '/vehicles/porsche.jpg',
        '/vehicles/bmw-x7.jpg',
    ],
    tags: ['SUV', 'Fuel Efficient', 'Available'],
    description:
      'A rugged and reliable companion for any adventure. This 2017 Toyota Fortuner is known for its durability and off-road capability, while still offering a comfortable and spacious interior for the whole family. A practical choice for export.',
    features: ['Tow Bar', 'Leather Seats', 'Reverse Camera', 'Bluetooth Connectivity', 'Cruise Control'],
    specs: {
      engine: '2.8L 4-Cylinder Turbo-Diesel',
      power: '130 kW',
      drivetrain: 'Rear-Wheel Drive',
      fuelType: 'Diesel',
      color: 'Glacier White',
    },
  },
  {
    slug: 'mercedes-benz-v-class-2021',
    make: 'Mercedes-Benz',
    model: 'V-Class',
    year: 2021,
    price: 'R3,850,000',
    mileage: '35,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    featured: true,
    image: '/vehicles/range-rover.jpg',
    gallery: [
        '/vehicles/mercedes-amg.jpg',
        '/vehicles/luxury-car.jpg',
        '/vehicles/porsche.jpg',
        '/vehicles/bmw-x7.jpg',
    ],
    tags: ['Family', 'Luxury Van', 'Spacious', 'Export Ready'],
    description:
      'The iconic G-Class, a symbol of status and supreme capability. This 2021 model features the latest technology and a luxurious cabin, wrapped in its timeless, military-derived design. An impressive vehicle for any collection.',
    features: ['Burmester Surround Sound System', 'AMG Line Interior', '360-degree Camera', 'Sunroof', 'Multibeam LED Headlights'],
    specs: {
      engine: '4.0L V8 Bi-Turbo',
      power: '430 kW',
      drivetrain: 'All-Wheel Drive',
      fuelType: 'Petrol',
      color: 'Obsidian Black Metallic',
    },
  },
  {
    slug: 'bmw-x5-2019',
    make: 'BMW',
    model: 'X5',
    year: 2019,
    price: 'R1,450,000',
    mileage: '42,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    image: '/vehicles/porsche.jpg',
    gallery: [
        '/vehicles/mercedes-amg.jpg',
        '/vehicles/luxury-car.jpg',
        '/vehicles/range-rover.jpg',
        '/vehicles/bmw-x7.jpg',
    ],
    tags: ['Sporty', 'SUV', 'Performance', 'Available'],
    description:
      'The ultimate driving machine in SUV form. The BMW X5 M50d delivers incredible torque and performance from its quad-turbo diesel engine, combined with the luxury and practicality of the X5 platform. A rare and desirable model.',
    features: ['Harman Kardon Surround Sound', 'Sky Lounge Panoramic Roof', 'BMW Laserlight', 'M-Sport Brakes', 'Integral Active Steering'],
    specs: {
      engine: '3.0L Inline-6 Quad-Turbo Diesel',
      power: '294 kW',
      drivetrain: 'xDrive All-Wheel Drive',
      fuelType: 'Diesel',
      color: 'Carbon Black Metallic',
    },
  },
  {
    slug: 'audi-q7-2022',
    make: 'Audi',
    model: 'Q7',
    year: 2022,
    price: 'R950,000',
    mileage: '58,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    image: '/vehicles/bmw-x7.jpg',
    gallery: [
        '/vehicles/mercedes-amg.jpg',
        '/vehicles/luxury-car.jpg',
        '/vehicles/range-rover.jpg',
        '/vehicles/porsche.jpg',
    ],
    tags: ['Tech-focused', 'SUV', 'AWD', 'Available'],
    description:
      'A sophisticated and technologically advanced family SUV. The Audi Q7 boasts a stunning virtual cockpit, premium materials, and a smooth, quiet ride. The S Line package adds a sporty touch to its elegant design.',
    features: ['Audi Virtual Cockpit', 'Bose 3D Sound System', 'Matrix LED Headlights', 'Adaptive Air Suspension', 'Four-Zone Climate Control'],
    specs: {
      engine: '3.0L V6 Turbo-Diesel',
      power: '200 kW',
      drivetrain: 'Quattro All-Wheel Drive',
      fuelType: 'Diesel',
      color: 'Carrara White',
    },
  },
  {
    slug: 'land-rover-defender-2022',
    make: 'Land Rover',
    model: 'Defender',
    year: 2022,
    price: 'R1,150,000',
    mileage: '20,000 km',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    gallery: [
        'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    ],
    tags: ['Off-road', 'Rugged', 'Iconic', 'Low Mileage'],
    description:
      'The Land Rover Defender is the epitome of off-road capability and durability. This 2022 model is ready to tackle any terrain with its advanced 4x4 system and robust construction, while providing a comfortable and high-tech interior.',
    features: ['Terrain Response System', 'Wade Sensing', '360-degree Camera', 'Adaptive Cruise Control', 'Pivi Pro Infotainment'],
    specs: {
      engine: '2.0L Inline-4 Turbocharged',
      power: '221 kW',
      drivetrain: '4WD',
      fuelType: 'Petrol',
      color: 'Santorini Black',
    },
  },
];

export const getVehicleBySlug = (slug: string): Vehicle | undefined => {
  return vehicleData.find((vehicle) => vehicle.slug === slug);
};

export const getFeaturedVehicles = (): Vehicle[] => {
  return vehicleData.filter((vehicle) => vehicle.featured === true);
};
