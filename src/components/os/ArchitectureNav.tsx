'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export const architecturePillars = [
  { href: '/memory-infrastructure', label: 'Memory Infrastructure', short: '01 Memory' },
  { href: '/decision-exhaust', label: 'Decision Exhaust', short: '02 Exhaust' },
  { href: '/runtime-governance', label: 'Runtime Governance', short: '03 Runtime' },
  { href: '/gate-system', label: 'Gate System', short: '04 Gates' },
  { href: '/chronicle-receipts', label: 'Chronicle Receipts', short: '05 Receipts' },
  { href: '/drift-guard', label: 'Drift Guard', short: '06 Drift Guard' },
] as const;

export function ArchitectureNav({ current }: { current: string }) {
  return (
    <nav
      aria-label="Governance architecture sections"
      className="border-b border-[#233047] bg-[#0d1526]/90"
    >
      <div className="wrap py-3 flex items-center gap-2 overflow-x-auto">
        <Link
          href="/platform"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#233047] bg-[#0b1120] px-3 py-1.5 font-mono text-[11px] text-[#94a3b8] hover:border-[#f0b66a] hover:text-[#f0b66a] whitespace-nowrap shrink-0 transition-colors"
        >
          <Compass size={12} aria-hidden="true" />
          <span>Overview</span>
        </Link>
        {architecturePillars.map((pillar) => {
          const active = pillar.href === current;
          return (
            <Link
              key={pillar.href}
              href={pillar.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? 'border-[#f0b66a]/60 bg-[#d97706]/15 text-[#f0b66a]'
                  : 'border-transparent bg-transparent text-[#94a3b8] hover:border-[#334563] hover:text-[#e2e8f0]'
              }`}
            >
              {pillar.short}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function ArchitecturePager({ current }: { current: string }) {
  const index = architecturePillars.findIndex((p) => p.href === current);
  const prev = index > 0 ? architecturePillars[index - 1] : null;
  const next =
    index >= 0 && index < architecturePillars.length - 1 ? architecturePillars[index + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-[#233047]">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-3 rounded-lg border border-[#233047] bg-[#121b2e]/60 px-4 py-3 hover:border-[#f0b66a]/60 transition-colors"
          >
            <ArrowLeft size={15} className="text-[#f0b66a]" aria-hidden="true" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                Previous concept
              </div>
              <div className="text-sm font-semibold text-white">{prev.label}</div>
            </div>
          </Link>
        ) : (
          <Link
            href="/platform"
            className="flex items-center gap-3 rounded-lg border border-[#233047] bg-[#121b2e]/60 px-4 py-3 hover:border-[#f0b66a]/60 transition-colors"
          >
            <ArrowLeft size={15} className="text-[#f0b66a]" aria-hidden="true" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                Architecture hub
              </div>
              <div className="text-sm font-semibold text-white">Governance Architecture</div>
            </div>
          </Link>
        )}

        {next ? (
          <Link
            href={next.href}
            className="flex items-center justify-between sm:justify-end gap-3 rounded-lg border border-[#233047] bg-[#121b2e]/60 px-4 py-3 text-right hover:border-[#f0b66a]/60 transition-colors"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                Next concept
              </div>
              <div className="text-sm font-semibold text-white">{next.label}</div>
            </div>
            <ArrowRight size={15} className="text-[#f0b66a]" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href="/tools"
            className="flex items-center justify-between sm:justify-end gap-3 rounded-lg border border-[#233047] bg-[#121b2e]/60 px-4 py-3 text-right hover:border-[#f0b66a]/60 transition-colors"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                Available today
              </div>
              <div className="text-sm font-semibold text-white">Explore Orion Tools</div>
            </div>
            <ArrowRight size={15} className="text-[#f0b66a]" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94a3b8] mb-4">
          All Governance Concepts
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {architecturePillars
            .filter((p) => p.href !== current)
            .map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-md border border-[#233047] bg-[#121b2e]/70 px-3.5 py-2 text-xs font-medium text-[#cbd5e1] hover:border-[#f0b66a] hover:text-[#f0b66a] transition-colors"
              >
                {p.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
