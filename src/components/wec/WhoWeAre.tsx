import React from "react";
import AnimatedTitle from './AnimatedTitle';
import { COLORS } from './constants';

interface WhoWeAreProps {
  className?: string;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ className = "" }) => (
  <div className={className}>
    <AnimatedTitle id="who-we-are">
      Who We Are.
    </AnimatedTitle>
    <p className="text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: COLORS.dark }}>
      We Export Cars Africa (WEC Africa) is South Africa's leading platform for the transparent and secure global export of luxury and premium vehicles. We cut through the red tape, providing a seamless, stress-free process from local sourcing to worldwide delivery, built on integrity and world-class logistics.
    </p>
  </div>
);

export default WhoWeAre;
