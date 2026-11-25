'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Ban,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  EyeOff,
  FileCheck,
  FileText,
  Filter,
  Lock,
  Scale,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { memoryInfrastructureFaq } from '@/lib/faqs';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

const engramLayers = [
  {
    id: 'layer3',
    badge: 'Layer 3 · Governance Engrams',
    title: 'Authority & Receipts',
    question: 'The "Authority": may this context influence the current action?',
    detail:
      'Holds policy hashes, active permissions, and lane scope metadata so gates can validate admissibility without inspecting raw payload bodies.',
    icon: Scale,
  },
  {
    id: 'layer2',
    badge: 'Layer 2 · Epistemic Engrams',
    title: 'Cognition & Reasoning',
    question: 'The "Why": how was a conclusion derived?',
    detail:
      'Captures reasoning chains and intermediate task decisions while separating confidence or derivation from execution authority.',
    icon: Brain,
  },
  {
    id: 'layer1',
    badge: 'Layer 1 · Semantic Engrams',
    title: 'Facts & State Snapshots',
    question: 'The "What": underlying facts and observed artifacts.',
    detail:
      'Stores raw observations and repository snapshots indexed for reference recovery rather than unfiltered global context injection.',
    icon: Database,
  },
] as const;

const lanes = [
  { id: 'personal', name: 'Personal', sample: 'Messages, music, private notes' },
  { id: 'work', name: 'Work (Deep)', sample: 'Work_Task_A.md, sprint artifacts' },
  { id: 'legal', name: 'Legal', sample: 'Contract clauses, NDA reviews' },
  { id: 'health', name: 'Health', sample: 'Clinical records, appointment summaries' },
] as const;

export default function MemoryInfrastructureContent() {
  const [selectedLayer, setSelectedLayer] = useState<'layer3' | 'layer2' | 'layer1'>('layer3');
  const [sourceLane, setSourceLane] = useState<string>('personal');
  const [targetLane, setTargetLane] = useState<string>('work');
  const [sideBrainEnabled, setSideBrainEnabled] = useState(true);

  const activeEngram =
    engramLayers.find((layer) => layer.id === selectedLayer) ?? engramLayers[0];
  const EngramIcon = activeEngram.icon;
  const sameLane = sourceLane === targetLane;

  return (
    <div className="pb-20">
      <ArchitectureNav current="/memory-infrastructure" />

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap text-center max-w-4xl">
          <div className="eyebrow justify-center">The Core Doctrine / 01</div>
          <h1>
            Memory is not logs.
            <br />
            <em>Memory is infrastructure.</em>
          </h1>
          <div className="max-w-2xl mx-auto rounded-xl border border-[#233047] bg-[#121b2e]/70 px-6 py-4 text-base text-[#cbd5e1] italic">
            &quot;Memory may exist and still be forbidden to use.&quot;
          </div>
        </div>
      </section>

      {/* Definition Block */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What does &quot;memory as infrastructure&quot; mean?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              Memory in Cosmocrat is an{' '}
              <strong className="text-white">
                enforceable policy-scoped state within an integrated boundary
              </strong>
              .
            </p>
            <p>
              The design scopes decision context by lane, phase, authority and policy. An enrolled
              memory change can retain an attributable decision receipt; coverage depends on the
              actual retrieval, storage and mutation boundaries. It connects the{' '}
              <Link
                href="/gate-system"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Gate System
              </Link>{' '}
              and{' '}
              <Link
                href="/runtime-governance"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Runtime Governance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* The 3 Non-Negotiables */}
      <section className="py-14 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
            <div className="flex items-center gap-2 text-[#f0b66a] font-mono text-xs mb-3">
              <Lock size={14} aria-hidden="true" />
              <span>01</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Authority-Bound</h3>
            <p className="text-sm text-[#94a3b8] m-0 leading-relaxed">
              For an explicitly enrolled memory boundary, configure lane permissions and verify that
              unauthorized access is denied.
            </p>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
            <div className="flex items-center gap-2 text-[#f0b66a] font-mono text-xs mb-3">
              <Clock size={14} aria-hidden="true" />
              <span>02</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Phase-Aware</h3>
            <p className="text-sm text-[#94a3b8] m-0 leading-relaxed">
              What can be remembered depends on the moment (drafting vs. execution) and intent.
            </p>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
            <div className="flex items-center gap-2 text-[#f0b66a] font-mono text-xs mb-3">
              <FileCheck size={14} aria-hidden="true" />
              <span>03</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Receipt-Backed</h3>
            <p className="text-sm text-[#94a3b8] m-0 leading-relaxed">
              An enrolled change can retain its policy hash and decision receipt. Replay depends on
              retained inputs and the recorded environment.
            </p>
          </div>
        </div>
      </section>

      {/* Passive Retrieval vs Governed Infrastructure */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-7">
            <div className="font-mono text-xs uppercase tracking-wider text-red-400 flex items-center gap-2 mb-4">
              <Ban size={14} aria-hidden="true" />
              <span>Standard AI (RAG) · Passive Retrieval</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              &quot;If the AI reads it, it uses it.&quot;
            </h3>
            <p className="text-sm text-[#94a3b8] mb-5 leading-relaxed">
              In flat vector stores, availability equals permission: credentials, drafts, and private
              notes mix inside one retrieval window.
            </p>
            <div className="rounded-lg border border-red-500/25 bg-[#0b1120] p-3.5 font-mono text-xs text-red-300 flex items-center gap-2">
              <ShieldAlert size={14} aria-hidden="true" />
              <span>Risk: Context Bleed &amp; Unscoped Injection</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#f0b66a]/45 bg-[#121b2e]/90 p-7">
            <div className="font-mono text-xs uppercase tracking-wider text-[#f0b66a] flex items-center gap-2 mb-4">
              <Lock size={14} aria-hidden="true" />
              <span>Cosmocrat · Governed Infrastructure</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Defines allowed usage, not just storage.
            </h3>
            <p className="text-sm text-[#cbd5e1] mb-5 leading-relaxed">
              An enrolled boundary checks lane policy and authority before context enters the
              decision frame.
            </p>
            <div className="rounded-lg border border-[#f0b66a]/30 bg-[#0b1120] p-3.5 font-mono text-xs text-[#f0b66a] flex items-center gap-2">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Design goal: fail-closed access checks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 1: Interactive 3 Layers of Truth (Engrams) */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap max-w-5xl">
          <div className="mb-10">
            <div className="eyebrow">Deep Dive / Engrams</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
              The Three Layers of Truth
            </h2>
            <p className="text-base text-[#f0b66a] m-0">
              We do not just store data; we store the cognition and the permission attached to it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-2.5">
              {engramLayers.map((layer) => {
                const Icon = layer.icon;
                const active = layer.id === selectedLayer;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayer(layer.id)}
                    aria-pressed={active}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      active
                        ? 'border-[#f0b66a] bg-[#d97706]/14 text-white'
                        : 'border-[#233047] bg-[#121b2e]/60 text-[#94a3b8] hover:border-[#334563] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-[#f0b66a]">{layer.badge}</span>
                      <Icon size={15} className="text-[#f0b66a]" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-semibold">{layer.title}</div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="tool-icon">
                  <EngramIcon size={18} aria-hidden="true" />
                </span>
                <div>
                  <div className="font-mono text-xs text-[#f0b66a]">{activeEngram.badge}</div>
                  <h3 className="text-xl font-semibold text-white m-0">{activeEngram.title}</h3>
                </div>
              </div>
              <p className="text-sm font-medium text-white mb-3">{activeEngram.question}</p>
              <p className="text-sm text-[#b2c0d4] leading-relaxed mb-4">{activeEngram.detail}</p>
              <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3.5 text-xs text-[#94a3b8]">
                This separation allows the{' '}
                <Link href="/gate-system" className="text-[#f0b66a] underline">
                  Gate System
                </Link>{' '}
                to validate authority without needing to parse raw semantic payloads.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 2: Interactive Lane-Awareness Simulator */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap max-w-5xl">
          <div className="mb-10">
            <div className="eyebrow">Deep Dive / Lanes</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
              Lane-Awareness: Whose World Is This?
            </h2>
            <p className="text-base text-[#f0b66a] m-0">
              Deny-by-Default. No global soup of context.
            </p>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/80 p-6 sm:p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2.5">
                  Source Memory Lane
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {lanes.map((lane) => (
                    <button
                      key={`src-${lane.id}`}
                      type="button"
                      onClick={() => setSourceLane(lane.id)}
                      aria-pressed={sourceLane === lane.id}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                        sourceLane === lane.id
                          ? 'border-[#f0b66a] bg-[#d97706]/15 text-white'
                          : 'border-[#233047] bg-[#0b1120] text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {lane.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2.5">
                  Target Task Context
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {lanes.map((lane) => (
                    <button
                      key={`tgt-${lane.id}`}
                      type="button"
                      onClick={() => setTargetLane(lane.id)}
                      aria-pressed={targetLane === lane.id}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                        targetLane === lane.id
                          ? 'border-[#f0b66a] bg-[#d97706]/15 text-white'
                          : 'border-[#233047] bg-[#0b1120] text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {lane.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                sameLane
                  ? 'border-emerald-500/40 bg-emerald-950/15'
                  : 'border-red-500/40 bg-red-950/15'
              }`}
            >
              <div className="flex items-center gap-3">
                {sameLane ? (
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0" aria-hidden="true" />
                ) : (
                  <Ban size={20} className="text-red-400 shrink-0" aria-hidden="true" />
                )}
                <div>
                  <div className="font-mono text-xs font-semibold text-white">
                    {sameLane ? 'ADMITTED: Same-lane read' : 'DENIED: Cross-lane bridge required'}
                  </div>
                  <div className="text-xs text-[#b2c0d4] mt-0.5">
                    {sameLane
                      ? 'Context stays within its policy scope and retains an admission receipt.'
                      : 'Crossing lanes requires an explicit, audited bridge event in the Gate System. A namespace tag alone does not enforce isolation; verify enforcement at the access boundary.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 3: Side-Brain Interface */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow">Deep Dive / Side-Brain</div>
              <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
                The Side-Brain Interface
              </h2>
              <p className="text-base text-[#f0b66a] m-0">
                A projection layer filtering mixed memory into authorized, task-scoped context.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSideBrainEnabled((v) => !v)}
              aria-pressed={sideBrainEnabled}
              className="button button-outline self-start sm:self-auto"
            >
              <Filter size={15} aria-hidden="true" />
              <span>
                {sideBrainEnabled ? 'Side-Brain Filter: ON' : 'Side-Brain Filter: OFF'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#233047] bg-[#0b1120] p-6">
              <div className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider mb-3">
                Total Memory Pool (Mixed Sensitivity)
              </div>
              <ul className="space-y-2 font-mono text-xs text-[#94a3b8] list-none p-0 m-0">
                <li className="flex items-center justify-between border-b border-[#233047] pb-2">
                  <span>Work_Task_A.md</span>
                  <span className="text-emerald-400">lane: work</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#233047] pb-2">
                  <span>Context_Snapshot</span>
                  <span className="text-emerald-400">lane: work</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#233047] pb-2">
                  <span>passwords.env</span>
                  <span className="text-red-400">restricted</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Legal_NDA_Draft.pdf</span>
                  <span className="text-[#f0b66a]">lane: legal</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#f0b66a]/40 bg-[#121b2e]/90 p-6">
              <div className="font-mono text-xs text-[#f0b66a] uppercase tracking-wider mb-3">
                Injected Context ({sideBrainEnabled ? 'Filtered' : 'Unfiltered'})
              </div>
              <ul className="space-y-2 font-mono text-xs text-[#e2e8f0] list-none p-0 mb-4">
                <li className="flex items-center gap-2 rounded bg-[#0b1120] px-3 py-2 border border-[#233047]">
                  <FileText size={14} className="text-[#f0b66a]" aria-hidden="true" />
                  <span>Work_Task_A.md</span>
                </li>
                <li className="flex items-center gap-2 rounded bg-[#0b1120] px-3 py-2 border border-[#233047]">
                  <Database size={14} className="text-[#f0b66a]" aria-hidden="true" />
                  <span>Context_Snapshot</span>
                </li>
                {!sideBrainEnabled && (
                  <>
                    <li className="flex items-center gap-2 rounded bg-red-950/30 px-3 py-2 border border-red-500/40 text-red-300">
                      <ShieldAlert size={14} aria-hidden="true" />
                      <span>passwords.env (LEAKED WITHOUT ENFORCEMENT)</span>
                    </li>
                    <li className="flex items-center gap-2 rounded bg-red-950/30 px-3 py-2 border border-red-500/40 text-red-300">
                      <ShieldAlert size={14} aria-hidden="true" />
                      <span>Legal_NDA_Draft.pdf (CROSS-LANE BLEED)</span>
                    </li>
                  </>
                )}
              </ul>
              <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                <EyeOff size={13} aria-hidden="true" />
                <span>
                  {sideBrainEnabled
                    ? 'Non-admissible items excluded at the enrolled boundary.'
                    : 'Filter disabled: retrieval falls back to flat context injection.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Pager */}
      <section className="pt-16">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div id="faq" className="space-y-3">
            {memoryInfrastructureFaq.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>

          <ArchitecturePager current="/memory-infrastructure" />
        </div>
      </section>
    </div>
  );
}
