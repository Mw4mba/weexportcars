import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="gradient-hero pt-16 pb-8 bg-[#2a3443]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <a href="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Go to homepage">
              <Image 
                src="/logo-dark.png" 
                alt="We Export Cars"
                width={150}
                height={48}
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-white leading-relaxed">
              South Africa's premier vehicle export specialist, connecting automotive excellence with global markets since 1998.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white/80 transition-quick" aria-label="Follow us on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick" aria-label="Follow us on Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-white hover:text-white/80 transition-quick">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-white/80 transition-quick">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-white hover:text-white/80 transition-quick">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/#process" className="text-white hover:text-white/80 transition-quick">
                  How it works
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white" />
                <a href="tel:+27100859932" className="text-white hover:text-white/80 transition-quick">
                  +27 10 085 9932
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-white" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=66+Park+Lane+Sandton+Johannesburg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-quick"
                >
                  66 Park Lane, Sandton, Johannesburg
                </a>
              </div>
            </div>
          </div>

          {/* Our Classics */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Our Classics</h4>
            <a
              href="https://pinnacle-classics.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/cars/classics/pctTextLogo.PNG"
                alt="Pinnacle Classics"
                width={180}
                height={60}
                className="h-auto w-auto max-w-[180px]"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          {/* Copyright and Links Row */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
            <p className="text-white text-sm">
              © 2024 We Export Cars. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                Cookie Policy
              </a>
            </div>
          </div>
          
          {/* Centered Powered By Row */}
          <div className="flex justify-center">
            <p className="text-white/80 text-xs">
              Powered by{' '}
              <a 
                href="https://luboya.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#d10e22] transition-quick font-medium"
              >
                Luboya.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;