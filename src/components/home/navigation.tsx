import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      scrolled ? 'bg-[#e6e6e6]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://www.weexportcars.africa/wp-content/uploads/2024/04/logo-dark.png" 
              alt="We Export Cars"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 justify-center flex-1">
            <a href="#home" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Home
            </a>
            <a href="#about" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              About Us
            </a>
            <a href="#services" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Services
            </a>
            <a href="#showroom" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Showroom
            </a>
            <a href="#process" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Our Process
            </a>
            <a href="#contact" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Contact
            </a>
          </div>

          {/* Call Button (Desktop only) */}
          <div className="hidden md:flex items-center ml-4">
            <a
              href="tel:+1234567890"
              className="group inline-flex items-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 shadow-lg overflow-hidden pl-4 pr-4 h-10"
              style={{ minWidth: '40px', maxWidth: '200px' }}
              title="Call us"
            >
              <Phone className="w-5 h-5 transition-all duration-300" />
              <span
                className="ml-2 whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs group-hover:ml-2 transition-all duration-300"
                style={{ transitionProperty: 'opacity,max-width,margin' }}
              >
                Contact Us
              </span>
            </a>
          </div>

          {/* Mobile Call & Menu Buttons (Mobile only) */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-colors duration-200 shadow-lg"
              title="Call us"
              style={{ minWidth: '40px' }}
            >
              <Phone className="w-5 h-5" />
            </a>
            <Button
              variant="ghost"
              size="icon"
              className=""
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6 text-[#2a3443]" /> : <Menu className="h-6 w-6 text-[#2a3443]" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed left-0 right-0 z-40 md:hidden flex justify-center"
              style={{ top: '5rem' }} // 5rem = 80px = h-20, navbar height
            >
              <div className="bg-white rounded-b-2xl border-b-2 border-[#e6e6e6] w-full max-w-full shadow-2xl flex flex-col items-center px-2 pt-8 pb-3 space-y-1">
                <a
                  href="#home"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#showroom"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Showroom
                </a>
                <a
                  href="#process"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Our Process
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;