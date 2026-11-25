'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ORION_EASE_OUT_EXPO } from '@/lib/motion';

const pillars = [
  {
    id: 'direction',
    label: 'Human direction',
    title: 'Humans stay in the driver’s seat',
    summary:
      'Agents propose work and hold bounded task claims; purpose, permission, and consequential approvals remain with you.',
  },
  {
    id: 'context',
    label: 'Preserved context',
    title: 'Carry intent across sessions',
    summary:
      'Save what was intended, what was observed, and what remains uncertain instead of starting every fresh session from zero.',
  },
  {
    id: 'authority',
    label: 'Explicit authority',
    title: 'Clear boundaries per tool',
    summary:
      'Browser profiles, Android devices, and repository worktrees keep their own leases, scopes, and documented limits.',
  },
  {
    id: 'evidence',
    label: 'Inspectable evidence',
    title: 'Recover the full result anytime',
    summary:
      'Share compact snapshots between agents while keeping the exact original output recoverable by reference.',
  },
] as const;

export default function HeroEmblemStage() {
  const [selectedId, setSelectedId] = useState<(typeof pillars)[number]['id']>('direction');
  const shouldReduceMotion = useReducedMotion();
  const active = pillars.find((p) => p.id === selectedId) ?? pillars[0];

  return (
    <div className="emblem-panel">
      <div className="emblem-stage">
        <div className="emblem-glow" aria-hidden="true" />
        <motion.div
          className="emblem-ring"
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={shouldReduceMotion ? undefined : { duration: 48, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="emblem-ring-inner"
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={shouldReduceMotion ? undefined : { duration: 36, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: ORION_EASE_OUT_EXPO }}
        >
          <picture>
            <source srcSet="/brand/cosmocrat-sigil-420w.avif" type="image/avif" />
            <source srcSet="/brand/cosmocrat-sigil-420w.webp" type="image/webp" />
            <img
              className="hero-emblem"
              src="/brand/cosmocrat-sigil.svg"
              alt="Cosmocrat OS sigil"
              width={420}
              height={452}
              decoding="async"
            />
          </picture>
        </motion.div>
      </div>

      <div className="pillar-tabs" role="group" aria-label="Explore Cosmocrat OS pillars">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            className="pillar-tab"
            aria-pressed={selectedId === pillar.id}
            onClick={() => setSelectedId(pillar.id)}
          >
            {pillar.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="pillar-readout"
      >
        <div className="pillar-readout-title">{active.title}</div>
        <p>{active.summary}</p>
      </motion.div>
    </div>
  );
}
