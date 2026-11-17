'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

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
  const active = pillars.find((p) => p.id === selectedId) ?? pillars[0];

  return (
    <div className="emblem-panel">
      <div className="emblem-stage">
        <div className="emblem-glow" aria-hidden="true" />
        <motion.div
          className="emblem-ring"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="emblem-ring-inner"
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            className="hero-emblem"
            src="/brand/cosmocrat-sigil.svg"
            alt="Cosmocrat OS sigil"
            width={885}
            height={952}
            unoptimized
          />
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
