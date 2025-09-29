import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLORS, PROCESS_STEPS } from './constants';
import { useScrollAnimation } from './useScrollAnimation';
import { IconWrench, IconDocument, IconShip } from './Icons';

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const processStepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [ref, isVisible] = useScrollAnimation('-150px');
  const activeIndex = PROCESS_STEPS.findIndex(step => step.id === activeStep);
  const stepsCount = PROCESS_STEPS.length;
  const lineProgress = activeIndex === -1 ? 0 : ((activeIndex + 1) / stepsCount) * 100;

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

  const renderProcessIcon = (index: number, className?: string, color?: string) => {
    switch (index) {
      case 0: return <IconWrench className={className} color={color} />;
      case 1: return <IconDocument className={className} color={color} />;
      case 2: return <IconShip className={className} color={color} />;
      default: return null;
    }
  };

  return (
    <section id="process" ref={ref as React.RefObject<HTMLDivElement>} className="py-24 md:py-32" style={{ backgroundColor: COLORS.light }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-5xl font-extrabold text-center" style={{ color: COLORS.dark }}>
          Our Seamless Export Process
        </h2>
        <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed" style={{ color: COLORS.dark }}>
          We break down the complexity of international vehicle exporting into three simple, secure, and fully managed stages.
        </p>
        <div className="relative pt-16 pb-8">
          {/* Vertical Flowchart Line (Base) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full" style={{ top: 0, bottom: 0, backgroundColor: COLORS.dark + '30' }}></div>
          {/* Vertical Flowchart Line (Progress) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full transition-all duration-700 ease-out" style={{ top: 0, height: `calc(${lineProgress}% - 5px)`, backgroundColor: COLORS.accent, opacity: isVisible ? 1 : 0, transformOrigin: 'top', transitionDelay: '0.5s' }}></div>
          <div className="space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isCurrent = step.id === activeStep;
              const isComplete = index < activeIndex;
              return (
                <React.Fragment key={step.id}>
                  <div id={step.id} ref={el => { processStepRefs.current[step.id] = el; }} className="relative flex justify-between items-start w-full min-h-[300px] sm:min-h-[200px]">
                    <div className={`relative w-[90%] sm:w-[45%] p-6 rounded-2xl shadow-xl transition-all duration-700 ease-in-out transform`} style={{ backgroundColor: 'white', marginLeft: 'auto', marginRight: 0, ...(window.innerWidth >= 640 ? { marginLeft: index % 2 === 0 ? '0' : '55%' } : {}), transform: isCurrent || isComplete ? 'scale(1.0) translateY(0)' : 'scale(0.95) translateY(10px)', opacity: isCurrent || isComplete ? 1 : 0.4, border: isCurrent ? `3px solid ${COLORS.accent}` : `3px solid ${COLORS.light}` }}>
                      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 mb-4 text-center sm:text-left">
                        <div className="p-2 rounded-full transition-all duration-500 mb-1 sm:mb-0" style={{ backgroundColor: isCurrent || isComplete ? COLORS.accent : COLORS.light }}>
                          {renderProcessIcon(index, 'w-6 h-6', COLORS.dark)}
                        </div>
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold" style={{ color: COLORS.dark }}>{step.title}</h3>
                      </div>
                      <div className="overflow-hidden transition-all duration-700 ease-in-out" style={{ maxHeight: isCurrent || isComplete ? '200px' : '0', paddingTop: isCurrent || isComplete ? '10px' : '0', color: COLORS.dark }}>
                        {step.detail}
                      </div>
                      <div className={`absolute w-0 h-0 border-transparent border-[10px] top-6 transition-opacity duration-500 hidden sm:block`} style={{ right: index % 2 === 0 ? '-20px' : 'auto', left: index % 2 !== 0 ? '-20px' : 'auto', borderLeftColor: index % 2 === 0 ? 'white' : 'transparent', borderRightColor: index % 2 !== 0 ? 'white' : 'transparent', opacity: isCurrent || isComplete ? 1 : 0.5 }}></div>
                    </div>
                  </div>
                  {/* Checkpoint dot between steps for mobile only */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="flex sm:hidden justify-center my-2">
                      <div className="w-5 h-5 rounded-full z-10 transition-all duration-500 shadow-lg border-4" style={{ backgroundColor: isCurrent || isComplete ? COLORS.accent : 'white', borderColor: isCurrent || isComplete ? COLORS.dark : COLORS.light, boxShadow: isCurrent ? `0 0 0 7px ${COLORS.accent}60` : 'none' }}></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
