'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ORION_EASE_OUT_EXPO } from '@/lib/motion';

export interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionReveal({ children, delay = 0, className }: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: ORION_EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
