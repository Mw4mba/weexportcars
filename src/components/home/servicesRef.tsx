import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/home/navigation';
import Footer from '@/components/wec/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Truck, Shield, CreditCard, FileCheck, Users } from 'lucide-react';

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Package,
      title: "Sourcing & Procurement",
      description: "Our team of skilled professionals in Sourcing & Procurement is committed to providing personalised assistance in acquiring your ideal vehicle at the most competitive price. We aim to guide you through the car purchasing process, helping you navigate potential pitfalls that may arise.",
      details: "Through our tailored search process, we aim to unveil the potential savings available to you and enable you to compare the finest vehicles within your specified budget. Throughout the procurement journey, we ensure that you remain informed at every step. Furthermore, for your peace of mind, all relevant documentation is securely dispatched to you via DHL prior to your car's anticipated arrival."
    },
    {
      icon: Truck,
      title: "Freight & Logistics",
      description: "With our extensive presence spanning South Africa, the UK, Kenya, Uganda, Tanzania, Zambia, Zimbabwe, Botswana, Lesotho, Eswatini, Mozambique, and Namibia, rest assured that every aspect of your vehicle's journey is meticulously managed from the moment you engage with us until its arrival by air, sea, or road.",
      details: "Our proficient teams handle customs clearance, registration, and local compliance management upon your request, ensuring a seamless process. Furthermore, we go the extra mile by personally delivering your vehicle, allowing you to embark on your journey home with ease and confidence."
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "We prioritise what matters most to you by offering straightforward, premium vehicle coverage accompanied by insurance solutions designed to provide comprehensive peace of mind.",
      details: "When partnering with us, we collaborate closely with you to secure the optimal insurance coverage for your vehicle, whether it's procured from South Africa or the UK, ensuring protection from the point of purchase until it reaches your garage. Our insurance solutions are designed to be simple and transparent, offering you a seamless experience throughout."
    },
    {
      icon: CreditCard,
      title: "Financing",
      description: "Our tailored car finance solution caters specifically to clients in Kenya seeking to import their vehicles through our partnered financial institutions.",
      details: "For clients in other countries, we offer the convenience of securing their car with a 20% deposit, with the remaining balance payable within one month, ensuring a streamlined process regardless of location."
    },
    {
      icon: FileCheck,
      title: "Duty Free Consultations",
      description: "Save by buying a UK or South African luxury car tax free through WeExportCars.Africa. We will reclaim the VAT when the car is permanently exported, saving you money vs buying the same car directly from the dealer.",
      details: "There are no hidden costs. We will quote you honestly for the import service you want. Surprises are not our thing."
    },
    {
      icon: Users,
      title: "Diplomat Relocations",
      description: "Are you a diplomat preparing for relocation? We specialize in providing top-tier international and domestic door-to-door relocation services, meticulously managed through our network of offices and trusted partners worldwide.",
      details: "For diplomats and public officials, international moves are often inherent to their roles. However, we understand that the relocation process should not overshadow your primary responsibilities. Your primary focus should be on a swift and seamless diplomatic transition. Allow us to handle the logistical details: from the secure handling of sensitive information to comprehensive knowledge of regulations at both the origin and destination countries."
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
                Our Services
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Comprehensive solutions for your vehicle export needs
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className={`max-w-4xl mx-auto text-center ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Export Cars from South Africa and the UK?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Navigating the complexities of exporting your next vehicle becomes effortless with our comprehensive services. Our team of seasoned experts stands prepared to meticulously guide you through each phase of the export process, guaranteeing you remain fully apprised of your vehicle's progress throughout.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rest assured, we handle all intricacies with diligent attention, instilling confidence that your car will be imported with the utmost care and precision.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`gradient-card shadow-card hover:shadow-luxury transition-smooth group ${
                    isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                      <service.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <p className="text-muted-foreground/90 text-sm leading-relaxed pt-2 border-t border-border">
                      {service.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
