import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, LOGO_URL, NAV_LINKS } from './constants';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id.replace(/\s+/g, '-').toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 shadow-lg`}
      style={{ backgroundColor: COLORS.light }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div 
          className={`transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <Image 
            src={LOGO_URL} 
            alt="We Export Cars Africa Logo" 
            width={150}
            height={40}
            className="h-8 md:h-10 cursor-pointer"
          />
        </div>
        {/* Nav Links (Hidden on Mobile, shown on MD) */}
        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map(link => (
            <button 
              key={link}
              onClick={() => scrollToSection(link)}
              className={`text-base font-medium transition-colors duration-200 \
                          hover:text-red-600 focus:outline-none focus:ring-2 \
                          focus:ring-offset-2 focus:ring-red-600 rounded-md`}
              style={{ color: COLORS.dark }}
            >
              {link}
            </button>
          ))}
        </nav>
        {/* Mobile Menu Icon (Placeholder for functionality) */}
        <button className="md:hidden p-2 rounded-lg" style={{ color: COLORS.dark }} aria-label="Open mobile menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
