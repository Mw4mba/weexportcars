'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape and lock body scroll when menu is open
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    const prevOverflow = document.body.style.overflow;
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Restore focus to toggle when menu closes
  useEffect(() => {
    if (!isOpen) {
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      scrolled ? 'bg-[#e6e6e6]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-16 md:h-20">
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
            <a href="/" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Home
            </a>
            <a href="/about" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              About Us
            </a>
            <a href="/services" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Services
            </a>
            <a href="/showroom" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Showroom
            </a>
            <a href="/#process" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Our Process
            </a>
            <a href="/#contact" className="text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium">
              Contact
            </a>
          </div>

          {/* Call Button (Desktop only) */}
          <div className="hidden md:flex items-center ml-4">
            <a
              href="tel:+1234567890"
              className="group relative inline-flex items-center rounded-full bg-[#d10e22] hover:bg-[#b00c1b] text-white transition-all duration-300 shadow-lg overflow-visible pl-3 pr-3 h-10"
              style={{ minWidth: '40px' }}
              title="Call us"
            >
              <Phone className="w-5 h-5 transition-all duration-300" />
              <span
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 bg-[#d10e22] text-white px-3 py-1 rounded-full text-sm shadow-lg"
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
            <button
              ref={toggleRef}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-full bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6 text-[#2a3443]" /> : <Menu className="h-6 w-6 text-[#2a3443]" />}
            </button>
          </div>
        </div>
        {/* end header container */}
      </div>
    </nav>

    {/* Mobile Navigation as sibling to prevent stacking-context issues */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav"
          role="menu"
          aria-hidden={!isOpen}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.28 }}
          className="fixed left-0 right-0 z-40 md:hidden flex justify-center"
          style={{ top: '4rem' }} // 4rem = 64px = h-16, mobile navbar height
        >
              <div className="bg-white rounded-b-2xl border-b-2 border-[#e6e6e6] w-full max-w-full shadow-2xl flex flex-col items-center px-2 pt-8 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Home</a>
            <a href="/about" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>About Us</a>
            <a href="/services" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Services</a>
            <a href="/showroom" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Showroom</a>
            <a href="/#process" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Our Process</a>
            <a href="/#contact" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Contact</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navigation;