'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { handleSmoothScroll } from '@/utils/smoothScroll';
import NextImage from 'next/image';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  
  // Determine if we're on the About, Gallery, or Testimonials page
  const isAboutPage = pathname === '/about';
  const isGalleryPage = pathname === '/gallery';
  const isTestimonialsPage = pathname === '/testimonials';
  
  // navbg_dark() - Called whenever the background is dark to the point that it affects visibility
  // Makes text white when background is dark, returns to natural color when background becomes white
  const navbg_dark = () => {
    if ((isAboutPage || isGalleryPage || isTestimonialsPage) && !scrolled) {
      return true; // Dark background - use white text
    }
    return false; // Light background - use natural dark text
  };
  
  // Determine text color based on page status and scroll position
  const getTextColor = () => {
    if (navbg_dark()) {
      return 'text-white'; // White when on pages with dark background and not scrolled
    }
    return 'text-[#2a3443]'; // Dark text otherwise (natural color)
  };

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

  // GSAP animation for mobile menu
  useEffect(() => {
    if (!mobileNavRef.current) return;
    
    if (isOpen) {
      gsap.fromTo(
        mobileNavRef.current,
        { y: '-100%', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileNavRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.28,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

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
          {/* Logo - Clickable home button */}
          <a href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity" aria-label="Go to homepage">
            <NextImage 
              src="https://www.weexportcars.africa/wp-content/uploads/2024/04/logo-dark.png" 
              alt="We Export Cars"
              width={150}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 justify-center flex-1">
            <a href="/" className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
              Home
            </a>
            <a href="/about" className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
              About Us
            </a>
            <a href="/gallery" className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
              Gallery
            </a>
            <a href="/testimonials" className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
              Testimonials
            </a>
            <a href="/#process" onClick={handleSmoothScroll} className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
              How it works
            </a>
            <a href="/#contact" onClick={handleSmoothScroll} className={`${getTextColor()} hover:text-[#d10e22] transition-quick font-medium`}>
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
              {isOpen ? <X className={`h-6 w-6 ${getTextColor()}`} /> : <Menu className={`h-6 w-6 ${getTextColor()}`} />}
            </button>
          </div>
        </div>
        {/* end header container */}
      </div>
    </nav>

    {/* Mobile Navigation as sibling to prevent stacking-context issues */}
    {isOpen && (
      <div
        ref={mobileNavRef}
        id="mobile-nav"
        role="menu"
        aria-hidden={!isOpen}
        className="fixed left-0 right-0 z-40 md:hidden flex justify-center"
        style={{ top: '4rem' }} // 4rem = 64px = h-16, mobile navbar height
      >
        <div className="bg-white rounded-b-2xl border-b-2 border-[#e6e6e6] w-full max-w-full shadow-2xl flex flex-col items-center px-2 pt-8 pb-3 space-y-1">
          <a href="/" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/about" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="/gallery" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Gallery</a>
          <a href="/testimonials" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={() => setIsOpen(false)}>Testimonials</a>
          <a href="/#process" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={(e) => { handleSmoothScroll(e); setIsOpen(false); }}>How it works</a>
          <a href="/#contact" className="block px-3 py-2 text-[#2a3443] hover:text-[#d10e22] transition-quick font-medium" onClick={(e) => { handleSmoothScroll(e); setIsOpen(false); }}>Contact</a>
        </div>
      </div>
    )}
    </>
  );
};

export default Navigation;