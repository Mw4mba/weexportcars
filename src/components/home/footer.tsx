import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gradient-hero pt-16 pb-8 bg-[#2a3443]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <a href="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Go to homepage">
              <img 
                src="https://www.weexportcars.africa/wp-content/uploads/2024/04/logo-dark.png" 
                alt="We Export Cars"
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-white leading-relaxed">
              South Africa's premier vehicle export specialist, connecting automotive excellence with global markets since 1998.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-quick">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-red-500">Quick Links</h4>
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
                <a href="#services" className="text-white hover:text-white/80 transition-quick">
                  Services
                </a>
              </li>
              <li>
                <a href="#showroom" className="text-white hover:text-white/80 transition-quick">
                  Showroom
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-red-500">Services</h4>
            <ul className="space-y-3">
              <li className="text-white">VAT Free Export</li>
              <li className="text-white">Bank Financing</li>
              <li className="text-white">Full Insurance</li>
              <li className="text-white">Global Shipping</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-red-500">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white" />
                <a href="tel:+27100859932" className="text-white hover:text-white/80 transition-quick">
                  +27 10 085 9932
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white" />
                <a 
                  href="mailto:kamatu@weexportcars.africa?subject=Inquiry%20about%20Vehicle%20Export&body=Hello%20We%20Export%20Cars%2C%0A%0AI%20am%20interested%20in%20your%20vehicle%20export%20services.%20Please%20provide%20more%20information.%0A%0ABest%20regards" 
                  className="text-white hover:text-white/80 transition-quick"
                >
                  kamatu@weexportcars.africa
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-white text-sm">
              © 2024 We Export Cars. All rights reserved.
            </p>
            <p className="text-white/70 text-xs">
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
      </div>
    </footer>
  );
};

export default Footer;