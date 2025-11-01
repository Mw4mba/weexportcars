import React from 'react';
import { X, Menu } from 'lucide-react';
import Image from 'next/image';

const LOGO_URL = 'https://www.weexportcars.africa/wp-content/uploads/2024/04/logo-dark.p';
const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navItems = ['home', 'about', 'services', 'process', 'contact'];
  return (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-[#e6e6e6]/90 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image 
            src={LOGO_URL} 
            alt="We Export Cars Logo" 
            width={150}
            height={40}
            className="h-10 w-auto" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/200x40/${DARK_TEXT_COLOR.substring(1)}/${BG_LIGHT_COLOR.substring(1)}?text=LOGO`;
            }} // Fallback
          />
        </div>
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium tracking-wide">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="py-2 px-3 relative group text-[#2a3443] hover:text-[#d10e22] transition duration-300 font-inter"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d10e22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </nav>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#2a3443] hover:text-[#d10e22] p-2 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#e6e6e6] shadow-xl py-4 transition-all duration-300 ease-in-out">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="block w-full text-left px-6 py-3 text-lg font-medium text-[#2a3443] hover:bg-white hover:text-[#d10e22] transition duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
