import React, { useRef, useState, useEffect, useCallback } from 'react';

const COLORS = {
  light: '#e6e6e6',
  dark: '#2a3443',
  accent: '#d10e22',
};

const PROCESS_STEPS = [
  { id: 'step-1', title: "1. Consultation & Quote", detail: "We discuss your dream car, destination, and provide a transparent, all-inclusive quote, ensuring clarity from the start. This includes all logistics, insurance, and duties assessments." },
  { id: 'step-2', title: "2. Documentation & Purchase", detail: "We meticulously handle all local paperwork, including bank financing assistance, VAT exemption applications, and secure the final purchase of your vehicle, managing complexity for you. Full ownership transfer documentation is prepared." },
  { id: 'step-3', title: "3. Logistics & Delivery", detail: "Expert, fully insured shipping, tracking, and final delivery, right to your selected port or door-to-door location worldwide. We manage customs clearance and final handover for a seamless experience." },
];

function useScrollAnimation(rootMargin = '-150px'): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) setIsVisible(true);
  }, []);
  useEffect(() => {
    const observer = new window.IntersectionObserver(callback, { rootMargin });
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [callback, rootMargin]);
  return [ref, isVisible] as [React.RefObject<HTMLDivElement>, boolean];
}

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const processStepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [ref, isVisible] = useScrollAnimation('-150px');

  // Stepper/Scroll Logic
  const handleScroll = useCallback(() => {
    if (processStepRefs.current) {
      let currentActiveStep = PROCESS_STEPS[0].id;
      const triggerPoint = window.innerHeight * 0.4;
      PROCESS_STEPS.forEach((step) => {
        const element = processStepRefs.current[step.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            if (rect.bottom >= triggerPoint) {
              currentActiveStep = step.id;
            } else {
              currentActiveStep = step.id;
            }
          }
        }
      });
      setActiveStep(currentActiveStep);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const activeIndex = PROCESS_STEPS.findIndex(step => step.id === activeStep);
  const stepsCount = PROCESS_STEPS.length;
  const lineProgress = activeIndex === -1 ? 0 : ((activeIndex + 1) / stepsCount) * 100;

  // Simple icon for demo
  const renderProcessIcon = (index: number, className: string, color: string) => {
    return <span className={className} style={{ color }}>{index + 1}</span>;
  };

  return (
    <section id="process" ref={ref as React.RefObject<HTMLDivElement>} className="py-16 xs:py-20 sm:py-24 md:py-32" style={{ backgroundColor: COLORS.light }}>
      <div className="max-w-4xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-center break-words text-balance max-w-full" style={{ color: COLORS.dark }}>
          Our Seamless Export Process
        </h2>
  <p className="text-base xs:text-lg text-center max-w-2xl mx-auto leading-relaxed break-words text-balance" style={{ color: COLORS.dark }}>
          We break down the complexity of international vehicle exporting into three simple, secure, and fully managed stages.
        </p>
  <div className="relative pt-10 xs:pt-12 sm:pt-16 pb-6 sm:pb-8">
          {/* Vertical Flowchart Line (Base) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full" style={{ top: 0, bottom: 0, backgroundColor: COLORS.dark + '30' }}></div>
          {/* Vertical Flowchart Line (Progress) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full transition-all duration-700 ease-out" style={{ top: 0, height: `calc(${lineProgress}% - 5px)`, backgroundColor: COLORS.accent, opacity: isVisible ? 1 : 0, transformOrigin: 'top', transitionDelay: '0.5s' }}></div>
          <div className="space-y-16 xs:space-y-20 sm:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isCurrent = step.id === activeStep;
              const isComplete = index < activeIndex;
              return (
                <div key={step.id} id={step.id} ref={el => { processStepRefs.current[step.id] = el; }}
                  className="relative flex flex-col sm:flex-row justify-between items-start w-full min-h-[220px] xs:min-h-[180px] sm:min-h-[200px]">
                  <div
                    className={`relative w-full sm:w-[45%] p-4 xs:p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-700 ease-in-out transform break-words text-balance`}
                    style={{
                      backgroundColor: 'white',
                      marginLeft: index % 2 === 0 ? '0' : '55%',
                      transform: isCurrent || isComplete ? 'scale(1.0) translateY(0)' : 'scale(0.95) translateY(10px)',
                      opacity: isCurrent || isComplete ? 1 : 0.4,
                      border: isCurrent ? `3px solid ${COLORS.accent}` : `3px solid ${COLORS.light}`
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 mb-3 xs:mb-4 text-center md:text-left">
                      <div className="p-1.5 xs:p-2 rounded-full transition-all duration-500 mb-1 md:mb-0" style={{ backgroundColor: isCurrent || isComplete ? COLORS.accent : COLORS.light }}>
                        {renderProcessIcon(index, 'font-bold text-sm xs:text-base sm:text-base md:text-lg', COLORS.dark)}
                      </div>
                      <h3 className="text-xs xs:text-sm sm:text-sm md:text-xl lg:text-2xl font-bold break-words text-balance max-w-full" style={{ color: COLORS.dark }}>{step.title}</h3>
                    </div>
                    <div className="overflow-hidden transition-all duration-700 ease-in-out text-sm xs:text-base sm:text-lg break-words text-balance max-w-full" style={{ maxHeight: isCurrent || isComplete ? '200px' : '0', paddingTop: isCurrent || isComplete ? '10px' : '0', color: COLORS.dark }}>
                      {step.detail}
                    </div>
                    <div className={`absolute w-0 h-0 border-transparent border-[10px] top-6 transition-opacity duration-500`} style={{ right: index % 2 === 0 ? '-20px' : 'auto', left: index % 2 !== 0 ? '-20px' : 'auto', borderLeftColor: index % 2 === 0 ? 'white' : 'transparent', borderRightColor: index % 2 !== 0 ? 'white' : 'transparent', opacity: isCurrent || isComplete ? 1 : 0.5 }}></div>
                  </div>
                  <div className={`absolute left-1/2 top-10 transform -translate-x-1/2 w-4 xs:w-5 h-4 xs:h-5 rounded-full z-10 transition-all duration-500 shadow-lg`} style={{ backgroundColor: isCurrent || isComplete ? COLORS.accent : 'white', border: isCurrent || isComplete ? `4px solid ${COLORS.dark}` : `4px solid ${COLORS.light}`, boxShadow: isCurrent ? `0 0 0 7px ${COLORS.accent}60` : 'none' }}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
