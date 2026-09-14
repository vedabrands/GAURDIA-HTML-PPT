import React from 'react';
import { motion } from 'framer-motion';

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  blurAmount?: number;
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = '',
  blurAmount = 14,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: yOffset,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
