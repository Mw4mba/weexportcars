import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export const smoothScrollTo = (target: string | HTMLElement, duration: number = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: 80, // Account for fixed navbar height
    },
    ease: 'power2.inOut',
  });
};

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href && href.startsWith('#')) {
    smoothScrollTo(href);
  }
};
