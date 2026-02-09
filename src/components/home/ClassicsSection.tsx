'use client';

import Image from 'next/image';

const BLUE = '#3185AA';

const ClassicsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content: text left, image right */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left - Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#2a3443]/50">Looking for</span>
              <br />
              <span style={{ color: BLUE }}>Classics?</span>
            </h2>
            <p className="text-lg text-[#2a3443]/80 leading-relaxed max-w-xl mb-8">
              With our vast collection and global distribution network, we can connect you with the classic car of your dreams. Whether you&apos;re searching for a pristine vintage sports car, a rare muscle car, or an iconic European grand tourer, our team sources and delivers exceptional vehicles to collectors and enthusiasts worldwide. Let us handle the logistics while you enjoy the ride.
            </p>
            <a
              href="https://pinnacle-classics.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: BLUE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#266d8a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
            >
              View Classics
            </a>
          </div>

          {/* Right - Image with pcLogo overlay */}
          <div className="w-full lg:w-1/2 flex justify-center items-start lg:mt-24">
            <div className="relative w-full aspect-[4/3] max-w-[600px]">
              <Image
                src="/cars/classics/retro-gwagon.png"
                alt="Classic retro G-Wagon"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* pcLogo on bottom-right of image */}
              <div className="absolute bottom-2 right-2 z-10">
                <Image
                  src="/cars/classics/pcLogo.png"
                  alt="Pinnacle Classics logo"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassicsSection;
