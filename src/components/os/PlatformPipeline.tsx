'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Database,
  FileText,
  Lock,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';

interface GovernanceNode {
  id: string;
  phase: string;
  name: string;
  href: string;
  summary: string;
  scopeNote: string;
  icon: 'memory' | 'exhaust' | 'runtime' | 'gates' | 'receipts' | 'drift';
}

const nodes: readonly GovernanceNode[] = [
  {
    id: 'memory',
    phase: '01 / Context',
    name: 'Memory as infrastructure',
    href: '/memory-infrastructure',
    summary: 'What context may influence a decision, within an explicitly governed boundary.',
    scopeNote:
      'Applies where the memory boundary is explicitly enrolled and wired through the governance plane.',
    icon: 'memory',
  },
  {
    id: 'exhaust',
    phase: '02 / Provenance',
    name: 'Decision exhaust',
    href: '/decision-exhaust',
    summary: 'The policy, authority and state references behind a governed decision.',
    scopeNote:
      'Captures governance context references alongside the admission verdict; outcome logs remain separate.',
    icon: 'exhaust',
  },
  {
    id: 'runtime',
    phase: '03 / Admission',
    name: 'Runtime governance',
    href: '/runtime-governance',
    summary: 'Admission before a governed mutation, with the integration boundary made explicit.',
    scopeNote:
      'Evaluates authority and policy before execution; the kernel does not replace the downstream runtime.',
    icon: 'runtime',
  },
  {
    id: 'gates',
    phase: '04 / Discipline',
    name: 'Gate system',
    href: '/gate-system',
    summary: 'A conceptual model separating intent, decision, authority, execution and outcome.',
    scopeNote:
      'A seven-stage reference flow ensuring unverified authority or malformed evidence fails closed.',
    icon: 'gates',
  },
  {
    id: 'receipts',
    phase: '05 / Evidence',
    name: 'Chronicle receipts',
    href: '/chronicle-receipts',
    summary: 'Authoritative decision records and their integrity and replay boundaries.',
    scopeNote:
      'Records bind decision, policy revision, and authority reference at evaluation time.',
    icon: 'receipts',
  },
  {
    id: 'drift',
    phase: '06 / Vigilance',
    name: 'Drift guard',
    href: '/drift-guard',
    summary: 'Specified checks for divergence, with their scope and limitations.',
    scopeNote:
      'Monitors enrolled paths for configuration, context, or policy divergence against expected state.',
    icon: 'drift',
  },
];

const iconMap = {
  memory: Database,
  exhaust: FileText,
  runtime: Shield,
  gates: Lock,
  receipts: SlidersHorizontal,
  drift: Activity,
};

export default function PlatformPipeline() {
  const [activeId, setActiveId] = useState<string>('gates');
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const ActiveIcon = iconMap[active.icon];

  return (
    <div className="my-8 rounded-xl border border-[#233047] bg-[#0e1628] overflow-hidden">
      <div className="border-b border-[#233047] bg-[#121b2e]/90 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#f0b66a]">
          Architecture map
        </span>
        <span className="font-mono text-[11px] text-[#94a3b8]">
          Select a surface to inspect its responsibility
        </span>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-b border-[#233047]">
        {nodes.map((node) => {
          const Icon = iconMap[node.icon];
          const isSelected = node.id === active.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              aria-pressed={isSelected}
              className={`rounded-lg border p-3 text-left transition-colors ${
                isSelected
                  ? 'border-[#f0b66a] bg-[#d97706]/12 text-white'
                  : 'border-[#233047] bg-[#0b1120]/70 text-[#94a3b8] hover:border-[#334563] hover:text-[#e2e8f0]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[10px] text-[#f0b66a]">{node.phase}</span>
                <Icon
                  size={14}
                  className={isSelected ? 'text-[#f0b66a]' : 'text-[#64748b]'}
                  aria-hidden="true"
                />
              </div>
              <div className="text-xs font-semibold text-inherit leading-snug">{node.name}</div>
            </button>
          );
        })}
      </div>
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#0b1120]/70">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <ActiveIcon size={16} className="text-[#f0b66a]" aria-hidden="true" />
            <span className="font-mono text-xs text-[#f0b66a]">{active.phase}</span>
            <h3 className="text-base font-semibold text-white m-0">{active.name}</h3>
          </div>
          <p className="text-sm text-[#cbd5e1] mb-2">{active.summary}</p>
          <p className="text-xs text-[#94a3b8] m-0">{active.scopeNote}</p>
        </div>
        <Link className="button button-primary shrink-0" href={active.href}>
          Inspect {active.name.toLowerCase()} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
