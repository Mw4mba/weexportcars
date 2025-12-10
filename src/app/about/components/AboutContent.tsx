'use client';

import React from 'react';

const AboutContent: React.FC = () => {
  return (
    <>
      {/* About Us Section */}
      <section 
        className="flex-1 py-28 bg-cover bg-center bg-no-repeat relative flex items-center min-h-screen"
        style={{
          backgroundImage: 'url(/cars/2025Prado/IMG-20251013-WA0011.jpg)',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-2xl lg:w-2/3 xl:w-1/2 2xl:w-2/5 p-8 lg:p-12 animate-fadeInUp"
            >
              {/* Title with animated "us" in red */}
              <h1 
                className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-8 tracking-tight animate-fadeInDown text-white"
              >
                About <span style={{ color: '#d10e22' }}>Us</span>
              </h1>
              
              {/* About Us Content */}
              <div 
                className="space-y-6 text-lg leading-relaxed animate-fadeIn text-white"
              >
                <p>
                  We Export Cars Africa is a comprehensive motor vehicle export company located in Sandton, South Africa. 
                  With over a decade of experience in the industry, we have established ourselves as a trusted provider 
                  of vehicle export services from South Africa to international destinations.
                </p>
                
                <p>
                  Our process is transparent, efficient, and designed to ensure seamless experience for our clients. 
                  Whether you require a brand-new vehicle or a unique classic car, We Export Cars Africa is your 
                  reliable partner for all motor vehicle export needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default AboutContent;
