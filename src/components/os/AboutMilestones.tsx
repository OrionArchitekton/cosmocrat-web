'use client';

import { motion, useReducedMotion } from 'motion/react';

export interface MilestoneItem {
  index: string;
  title: string;
  detail: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutMilestones({
  milestones,
}: {
  milestones: readonly MilestoneItem[];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
          },
        },
      }}
    >
      {milestones.map((item) => (
        <motion.div
          key={item.index}
          variants={{
            hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: shouldReduceMotion ? 0 : 0.42,
                ease: EASE_OUT_EXPO,
              },
            },
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -2,
                  transition: { duration: 0.18, ease: EASE_OUT_EXPO },
                }
          }
          className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-5 transition-colors duration-200 hover:border-[#f0b66a]/45"
        >
          <div className="font-mono text-xs tabular-nums text-[#f0b66a] mb-2">{item.index}</div>
          <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
          <p className="text-xs leading-relaxed text-[#94a3b8] m-0">{item.detail}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
