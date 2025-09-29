import React from 'react';


import { DollarSign, Shield, Truck } from 'lucide-react';
const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';
const PROCESS_STEPS = [
  { title: "Step 1: Consultation & Quote", description: "We start with a detailed discussion of your requirements and provide a transparent, all-inclusive quotation for export and logistics.", icon: DollarSign },
  { title: "Step 2: Preparation & Compliance", description: "Our team handles all necessary paperwork, customs declarations, VAT clearance, and regulatory compliance to prepare the vehicle for shipment.", icon: Shield },
  { title: "Step 3: Secure Shipping & Delivery", description: "Your car is securely loaded and shipped using trusted carriers, with real-time tracking until it reaches your chosen final destination.", icon: Truck },
];

const OurProcessSection: React.FC = () => {
  const [activeProcessStep, setActiveProcessStep] = React.useState(0);
  const processStepRefs = PROCESS_STEPS.map(() => React.useRef<HTMLDivElement | null>(null));

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: 0,
    };
    const observers = processStepRefs.map((ref, index) => {
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveProcessStep(index);
          }
        });
      }, observerOptions);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return observer;
    });
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [processStepRefs]);

  return (
  <section id="process" className="py-28 bg-[#e6e6e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-5xl font-extrabold text-[#2a3443] mb-6 text-center tracking-tighter">
          The Export Journey
        </h2>
  <p className="text-xl text-[#2a3443]/70 max-w-3xl mx-auto text-center mb-16">
          Our simplified 3-step process ensures your vehicle moves efficiently and securely across borders, keeping you informed at every milestone.
        </p>
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Sticky Navigation */}
          <div className="md:col-span-4 sticky top-28 h-fit hidden md:block">
            <div className="space-y-6 p-8 rounded-xl bg-[#e6e6e6] shadow-lg">
              <h3 className="text-2xl font-bold text-[#2a3443] mb-4">Current Step</h3>
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeProcessStep === index 
                        ? 'bg-[#d10e22] text-white shadow-md transform scale-[1.02]' 
                        : 'text-[#2a3443] hover:bg-white'
                  }`}
                  onClick={() => processStepRefs[index].current?.scrollIntoView({ behavior: 'smooth' })}
                >
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${activeProcessStep === index ? 'border-white' : 'border-[#d10e22] text-[#d10e22]'}`}>
                    <span className="font-semibold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-lg font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Right Scrollable Content */}
          <div className="md:col-span-8 space-y-20">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={processStepRefs[index]}
                  className="p-8 md:p-12 border-b border-gray-200 last:border-b-0 min-h-[50vh] flex flex-col justify-center"
                >
                  <div className="flex items-center mb-4">
                                        <Icon size={40} className="text-[#d10e22] mr-4" />
                                        <h4 className="text-4xl font-bold text-[#2a3443]">{step.title}</h4>
                  </div>
                                    <p className="text-xl text-[#2a3443]/70 leading-relaxed max-w-4xl">
                    {step.description}
                  </p>
                  <div className="mt-4">
                    <div className="text-lg font-medium text-gray-500">
                      {index === activeProcessStep && (
                                                <span className="text-[#d10e22] font-semibold transition-opacity duration-500 opacity-100">
                          — You are here
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
