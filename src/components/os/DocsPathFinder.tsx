'use client';

import { useState } from 'react';
import Link from 'next/link';
import CommandSnippet from './CommandSnippet';
import { continuityRelease, tools } from '@/lib/toolCatalog';
import { ArrowRight, ArrowUpRight, ClipboardList, GitBranch, Layers, ShieldCheck } from 'lucide-react';

interface StartPath {
  id: string;
  label: string;
  tag: string;
  title: string;
  description: string;
  requirements: string;
  boundary: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
  icon: 'pm' | 'evidence' | 'continuity' | 'governance';
}

const paths: readonly StartPath[] = [
  {
    id: 'evidence',
    label: 'Development-evidence preview',
    tag: 'Starter 0.3.0-rc.1',
    title: 'Capture observations, hand off cleanly, and verify worktrees',
    description:
      'Combines Orion PM, Orion Worktree Report, Orion Results, and Orion Handoff. One worker captures a structured observation; the next worker recovers the exact artifact by reference and checks local git overlaps.',
    requirements: 'Local Python & Git · No browser, phone account, or external provider key required.',
    boundary:
      'Preview profile using manually invoked local examples. Does not enforce repository branch rules or merge authority.',
    ctaLabel: 'Open development-evidence guide',
    href: 'https://www.danmercede.com/guides/agent-development-evidence-handoff',
    external: true,
    icon: 'evidence',
  },
  {
    id: 'pm',
    label: 'Task ownership alone',
    tag: 'Orion PM v0.1.1',
    title: 'Coordinate two local workers on one shared task',
    description:
      'Record a task locally, grant an explicit lease claim to one worker, and preserve revision notes before releasing for the next worker.',
    requirements: 'CPython 3.11 on WSL2 Linux with local ext4.',
    boundary:
      'A claim coordinates cooperative agents only. It grants no account, merge, or deployment permissions.',
    ctaLabel: 'Start with Orion PM guide',
    href: 'https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm',
    external: true,
    icon: 'pm',
  },
  {
    id: 'continuity',
    label: 'Session continuity preview',
    tag: 'Starter 0.2.0-rc.1',
    title: 'Carry bounded task intent across disconnected sessions',
    description:
      'Walkthrough pinned to Starter 0.2.0-rc.1 focused on immutable revision snapshots so a fresh session picks up verified observations and remaining uncertainties.',
    requirements: 'Named local environment documented in the 0.2.0-rc.1 release profile.',
    boundary:
      'Preview combination rather than a universal OS installer. Past observations do not attest current file state.',
    ctaLabel: 'Open continuity guide (0.2.0-rc.1)',
    href: 'https://www.danmercede.com/guides/continue-agent-tasks-with-orion-starter',
    external: true,
    icon: 'continuity',
  },
  {
    id: 'governance',
    label: 'Governance design',
    tag: 'Architecture',
    title: 'Inspect the policy, authority, and receipt separation',
    description:
      'Explore the conceptual architecture covering fail-closed gates, enrolled memory boundaries, decision exhaust, and Chronicle receipts.',
    requirements: 'No local install required — reference architecture documentation.',
    boundary:
      'Describes the separate governance kernel design and does not promise kernel enforcement inside public standalone Orion tools.',
    ctaLabel: 'Read governance architecture',
    href: '/platform',
    external: false,
    icon: 'governance',
  },
];

const iconMap = {
  pm: ClipboardList,
  evidence: GitBranch,
  continuity: Layers,
  governance: ShieldCheck,
};

export default function DocsPathFinder() {
  const [selectedId, setSelectedId] = useState<string>('evidence');
  const active = paths.find((p) => p.id === selectedId) ?? paths[0];
  const ActiveIcon = iconMap[active.icon];
  const tool = active.id === 'governance' ? undefined :
    tools.find((entry) => entry.id === (active.id === 'pm' ? 'orion-pm' : 'orion-starter'));
  const commandTool = tool && active.id === 'continuity' ? { ...tool, ...continuityRelease } : tool;

  return (
    <div id="starting-paths" className="my-8 scroll-mt-28 rounded-xl border border-[#233047] bg-[#121b2e]/85 overflow-hidden">
      <div className="border-b border-[#233047] bg-[#0e1628] px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#f0b66a]">
          Interactive path finder
        </span>
        <span className="font-mono text-[11px] text-[#94a3b8]">Select what you want to test first</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div
          className="md:col-span-5 border-b md:border-b-0 md:border-r border-[#233047] p-3 flex flex-col gap-2"
          role="tablist"
          aria-label="Choose a starting path"
        >
          {paths.map((item) => {
            const Icon = iconMap[item.icon];
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left rounded-lg border px-3.5 py-3 transition-colors ${
                  isSelected
                    ? 'border-[#f0b66a]/60 bg-[#d97706]/12 text-white'
                    : 'border-transparent bg-[#0b1120]/50 text-[#94a3b8] hover:border-[#334563] hover:text-[#e2e8f0]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold">
                    <Icon size={14} className={isSelected ? 'text-[#f0b66a]' : 'text-[#94a3b8]'} aria-hidden="true" />
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#94a3b8]">{item.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="min-w-0 md:col-span-7 p-6 flex flex-col justify-between bg-[#0b1120]/60">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#334563] bg-[#121b2e] text-[#f0b66a]">
                <ActiveIcon size={16} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-[#f0b66a]">{active.tag}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{active.title}</h3>
            <p className="text-sm leading-relaxed text-[#b2c0d4] mb-4">{active.description}</p>
            <div className="space-y-2 rounded-lg border border-[#233047] bg-[#0e1628] p-3.5 text-xs">
              <p className="m-0 text-[#cbd5e1]">
                <strong className="text-white">Environment:</strong> {active.requirements}
              </p>
              <p className="m-0 text-[#94a3b8]">
                <strong className="text-[#f0b66a]">Boundary:</strong> {active.boundary}
              </p>
            </div>
          </div>
          {commandTool && <CommandSnippet key={active.id} tool={commandTool} />}
          <div className="mt-5">
            {active.external ? (
              <a
                className="button button-primary"
                href={active.href}
                rel="noreferrer"
              >
                {active.ctaLabel} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <Link className="button button-primary" href={active.href}>
                {active.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
