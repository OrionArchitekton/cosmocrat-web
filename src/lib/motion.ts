import type { Transition, Variants } from 'motion/react';

export const ORION_EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ORION_SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.9,
};

export const ORION_TRANSITION: Transition = {
  duration: 0.32,
  ease: ORION_EASE_OUT_EXPO,
};

export const ORION_VIEWPORT_ONCE = {
  once: true,
  amount: 0.2,
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: ORION_TRANSITION,
  },
};
