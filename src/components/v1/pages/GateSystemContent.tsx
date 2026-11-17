'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  CheckCircle,
  Database,
  GitCommit,
  Key,
  Network,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  XCircle,
  Zap,
} from 'lucide-react';
import { gateSystemFaq } from '@/lib/faqs';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

interface GateStage {
  id: string;
  phase: 'Input & Memory' | 'Decision' | 'Authority' | 'Execution';
  label: string;
  title: string;
  question: string;
  detail: string;
  boundary: string;
  icon: 'input' | 'memory' | 'formation' | 'eligibility' | 'auth' | 'execution' | 'truth';
}

const gates: readonly GateStage[] = [
  {
    id: 'G0',
    phase: 'Input & Memory',
    label: 'Input',
    title: 'G0 · Admissible Request Normalization',
    question: 'Is this request structurally well-formed and attributed?',
    detail:
      'Normalizes the caller identity, action shape, and requested mutation before downstream evaluation.',
    boundary: 'Does not yet validate semantic safety or authority to mutate external systems.',
    icon: 'input',
  },
  {
    id: 'G1',
    phase: 'Input & Memory',
    label: 'Memory',
    title: 'G1 · Context & Lane Scope',
    question: 'Which memory lanes and facts are admissible for this request?',
    detail:
      'Checks enrolled lane policy so unrelated personal, legal, or tenant context does not pollute the evaluation.',
    boundary: 'Actual isolation requires enforcement at the external store without bypass routes.',
    icon: 'memory',
  },
  {
    id: 'G2',
    phase: 'Decision',
    label: 'Formation',
    title: 'G2 · Decision Formation',
    question: 'What proposed action and rationale is being requested?',
    detail:
      'Configured criteria for a proposed decision; a confidence score does not establish truth or authority.',
    boundary: 'Separates proposal generation from permission to act.',
    icon: 'formation',
  },
  {
    id: 'G3',
    phase: 'Decision',
    label: 'Eligibility',
    title: 'G3 · Execution Eligibility',
    question: 'May this request touch the target resource under current policy?',
    detail:
      'Evaluates execution mode, risk class, and policy limits before allowing promotion toward action.',
    boundary: 'Most proposed actions terminate safely at G3 when policy denies eligibility.',
    icon: 'eligibility',
  },
  {
    id: 'G4',
    phase: 'Authority',
    label: 'Human Auth',
    title: 'G4 · Explicit Human Authorization',
    question: 'Does this risk threshold require explicit human approval?',
    detail:
      'High-impact mutations pause at the operator plane until an authorized human approves or denies the transition.',
    boundary: 'Missing authorization at an enrolled boundary denies the transition (fail-closed).',
    icon: 'auth',
  },
  {
    id: 'G5',
    phase: 'Execution',
    label: 'Execution',
    title: 'G5 · Boundary Dispatch',
    question: 'Is the admitted action dispatched through the runtime?',
    detail:
      'After admission passes, the runtime adapter invokes the external tool or service outside the narrow kernel.',
    boundary: 'Admission receipt records permission, not external completion.',
    icon: 'execution',
  },
  {
    id: 'G6',
    phase: 'Execution',
    label: 'Truth',
    title: 'G6 · Outcome & Receipt Correlation',
    question: 'Did external outcome evidence reconcile with the admitted intent?',
    detail:
      'Separately retained outcome records correlate real-world execution results back to Decision Exhaust and Drift Guard.',
    boundary: 'Outcome verification requires separate provider or repository evidence.',
    icon: 'truth',
  },
];

const gateIcons = {
  input: GitCommit,
  memory: Database,
  formation: BrainCircuit,
  eligibility: ShieldCheck,
  auth: Key,
  execution: Zap,
  truth: CheckCircle,
};

export default function GateSystemContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [g4Decision, setG4Decision] = useState<'pending' | 'approved' | 'denied'>('pending');

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % gates.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeGate = gates[selectedIndex] ?? gates[0];
  const ActiveIcon = gateIcons[activeGate.icon];

  return (
    <div className="pb-20">
      <ArchitectureNav current="/gate-system" />

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap text-center max-w-4xl">
          <div className="eyebrow justify-center">System Architecture / 04</div>
          <h1>
            The Path of
            <br />
            <em>Resistance.</em>
          </h1>
          <p className="text-lg text-[#b2c0d4] max-w-3xl mx-auto leading-relaxed mb-6">
            Power comes from delegation. Safety comes from restraint. The conceptual seven-stage
            model separates intent, decision, authority, execution and outcome. Actual governed
            coverage depends on the enrolled integration.
          </p>
          <p className="text-base text-[#f0b66a] font-medium">
            In the governed model, an enrolled decision must earn the right to become an action.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What is the Gate System?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              The Gate System describes Cosmocrat&apos;s conceptual admission pipeline. An enrolled
              integration can place a policy boundary between a proposed mutation and execution.
              Coverage depends on routing the action through that boundary without bypass paths.
            </p>
            <p>
              Operating within{' '}
              <Link
                href="/runtime-governance"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Runtime Governance
              </Link>
              , the seven-stage model separates input, memory, decisioning, authorization,
              execution and outcome. The narrow kernel evaluates proposed mutations; surrounding
              runtime integrations own retrieval, execution and external outcome evidence.
            </p>
            <p>
              An enrolled admission boundary is designed to deny a request when required evidence
              or authority is absent. Retained decisions contribute to{' '}
              <Link
                href="/decision-exhaust"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Decision Exhaust
              </Link>
              , documenting why the governed request was admitted, denied or deferred. These
              records do not establish an external outcome. The design uses this evidence for{' '}
              <Link
                href="/drift-guard"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Drift Guard
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 7-Gate Simulation */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow">Interactive sequence</div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-3 mb-2">
                Inspect G0 through G6
              </h2>
              <p className="text-sm text-[#94a3b8] m-0">
                Select any gate to pause and examine its admission check, or toggle playback.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="button button-outline self-start sm:self-auto"
            >
              {isPlaying ? (
                <>
                  <Pause size={15} aria-hidden="true" /> Pause walkthrough
                </>
              ) : (
                <>
                  <Play size={15} aria-hidden="true" /> Play walkthrough
                </>
              )}
            </button>
          </div>

          {/* Interactive Gate Stepper */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6"
            role="tablist"
            aria-label="Seven gate stages"
          >
            {gates.map((gate, idx) => {
              const Icon = gateIcons[gate.icon];
              const isCurrent = idx === selectedIndex;
              const isPassed = idx < selectedIndex;
              return (
                <button
                  key={gate.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedIndex(idx);
                  }}
                  className={`rounded-lg border p-3.5 text-left transition-colors ${
                    isCurrent
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-white'
                      : isPassed
                        ? 'border-[#334563] bg-[#121b2e]/90 text-[#e2e8f0]'
                        : 'border-[#233047] bg-[#0d1526] text-[#94a3b8] hover:border-[#334563]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-[#f0b66a]">
                      {gate.id}
                    </span>
                    <Icon
                      size={15}
                      className={isCurrent || isPassed ? 'text-[#f0b66a]' : 'text-[#64748b]'}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-xs font-semibold">{gate.label}</div>
                  <div className="font-mono text-[10px] text-[#94a3b8] mt-1">{gate.phase}</div>
                </button>
              );
            })}
          </div>

          {/* Active Gate Inspector Readout */}
          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="tool-icon">
                <ActiveIcon size={18} aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a]">
                  {activeGate.phase}
                </div>
                <h3 className="text-lg font-semibold text-white m-0">{activeGate.title}</h3>
              </div>
            </div>
            <p className="text-sm font-medium text-[#e2e8f0] mb-2">{activeGate.question}</p>
            <p className="text-sm text-[#b2c0d4] mb-4 leading-relaxed">{activeGate.detail}</p>
            <div className="rounded-lg border border-[#233047] bg-[#0b1120] px-4 py-3 text-xs text-[#94a3b8]">
              <strong className="text-[#f0b66a]">Boundary:</strong> {activeGate.boundary}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Intelligence vs Authority */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow">G2 vs G3</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-4">
              Intelligence vs. Authority
            </h2>
            <p className="text-base text-[#b2c0d4] mb-6 leading-relaxed">
              Most AI systems conflate &quot;can I do this?&quot; (capability) with &quot;may I do
              this?&quot; (permission). Cosmocrat separates them into distinct gates.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-[#233047] bg-[#121b2e]/75 p-5">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <BrainCircuit size={18} className="text-[#f0b66a]" aria-hidden="true" />
                  <span>G2: Decision Formation</span>
                </h3>
                <p className="text-sm text-[#94a3b8] m-0">
                  Configured criteria for a proposed decision; a confidence score does not establish
                  truth or authority.
                </p>
              </div>
              <div className="rounded-lg border border-[#f0b66a]/40 bg-[#121b2e]/90 p-5">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#f0b66a]" aria-hidden="true" />
                  <span>G3: Execution Eligibility</span>
                </h3>
                <p className="text-sm text-[#94a3b8] m-0">
                  May this touch the real world? Checks execution mode, risk class, and policy
                  limits.
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs font-mono text-[#94a3b8]">
              Most proposed AI actions terminate safely at G3 before external dispatch.
            </p>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-8 flex items-center justify-center min-h-[300px]">
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-20 h-20 rounded-xl border border-[#f0b66a]/50 bg-[#d97706]/10 flex items-center justify-center">
                  <BrainCircuit size={36} className="text-[#f0b66a]" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] text-[#cbd5e1]">Model Proposal (G2)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-24 w-px bg-[#334563]" />
                <span className="rounded border border-[#f0b66a]/50 bg-[#0b1120] px-2.5 py-1 font-mono text-[11px] text-[#f0b66a]">
                  Policy Wall (G3)
                </span>
                <div className="h-24 w-px bg-[#334563]" />
              </div>
              <div className="flex flex-col items-center gap-2 text-center opacity-60">
                <div className="w-20 h-20 rounded-xl border border-dashed border-[#334563] bg-[#0b1120] flex items-center justify-center">
                  <Zap size={34} className="text-[#94a3b8]" aria-hidden="true" />
                </div>
                <span className="font-mono text-[11px] text-[#94a3b8]">External Action (G5)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Functional G4 Operator Plane Simulator */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-xl border border-[#f0b66a]/40 bg-[#0b1120] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#233047] pb-5 mb-5">
                <div className="flex items-center gap-3.5">
                  <span className="tool-icon">
                    <Key size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] text-[#f0b66a] uppercase tracking-wider">
                      Gate 4 · Interactive simulation
                    </div>
                    <h3 className="text-lg font-semibold text-white m-0">Human Authorization</h3>
                  </div>
                </div>
                {g4Decision !== 'pending' && (
                  <button
                    type="button"
                    onClick={() => setG4Decision('pending')}
                    className="inline-flex items-center gap-1.5 rounded border border-[#334563] px-2.5 py-1 font-mono text-[11px] text-[#cbd5e1] hover:border-[#f0b66a] hover:text-[#f0b66a]"
                  >
                    <RotateCcw size={12} aria-hidden="true" /> Reset
                  </button>
                )}
              </div>

              <div className="space-y-3 font-mono text-xs mb-5">
                <div className="flex justify-between gap-4">
                  <span className="text-[#94a3b8]">Risk Level</span>
                  <span className="text-[#f0b66a]">HIGH (Level 3)</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#94a3b8]">Policy</span>
                  <span className="text-[#e2e8f0]">finance.transfer &gt; $1000</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#94a3b8]">Status</span>
                  <span
                    className={
                      g4Decision === 'approved'
                        ? 'text-emerald-400'
                        : g4Decision === 'denied'
                          ? 'text-red-400'
                          : 'text-[#f0b66a]'
                    }
                  >
                    {g4Decision === 'pending' && 'AWAITING OPERATOR DECISION'}
                    {g4Decision === 'approved' && 'ADMITTED BY OPERATOR (ILLUSTRATIVE)'}
                    {g4Decision === 'denied' && 'DENIED / HELD AT G4 (FAIL-CLOSED)'}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-[#233047] bg-[#121b2e]/80 p-3.5 text-xs text-[#cbd5e1] mb-5">
                {g4Decision === 'pending' &&
                  'Explicit human approval required before transition to G5 execution.'}
                {g4Decision === 'approved' &&
                  'Operator credential bound to admission receipt. Downstream runtime may now dispatch under policy limits.'}
                {g4Decision === 'denied' &&
                  'Action refused and recorded to Decision Exhaust. No downstream mutation dispatched.'}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setG4Decision('approved')}
                  aria-pressed={g4Decision === 'approved'}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold transition-colors ${
                    g4Decision === 'approved'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-transparent bg-[#d97706] text-[#0b1120] hover:bg-[#f09c38]'
                  }`}
                >
                  <CheckCircle size={14} aria-hidden="true" />
                  APPROVE
                </button>
                <button
                  type="button"
                  onClick={() => setG4Decision('denied')}
                  aria-pressed={g4Decision === 'denied'}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold transition-colors ${
                    g4Decision === 'denied'
                      ? 'border-red-500 bg-red-500/20 text-red-300'
                      : 'border-[#334563] bg-[#121b2e] text-[#cbd5e1] hover:border-red-400/60 hover:text-white'
                  }`}
                >
                  <XCircle size={14} aria-hidden="true" />
                  DENY
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="eyebrow">The Operator Plane</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-4">
              Humans do not &quot;monitor&quot;.
              <br />
              They authorize.
            </h2>
            <p className="text-base text-[#b2c0d4] mb-6 leading-relaxed">
              The conceptual G4 stage calls for human authority at configured checkpoints on an
              enrolled execution path. A deployment selects checkpoints such as the examples below.
            </p>
            <ul className="space-y-3 list-none p-0 mb-6">
              <li className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                <CheckCircle className="text-[#f0b66a] mt-0.5 shrink-0" size={16} aria-hidden="true" />
                <span>Required when Risk &gt; Threshold</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                <CheckCircle className="text-[#f0b66a] mt-0.5 shrink-0" size={16} aria-hidden="true" />
                <span>Required for new policy generation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                <CheckCircle className="text-[#f0b66a] mt-0.5 shrink-0" size={16} aria-hidden="true" />
                <span>Required for first-time actions (trust-on-first-use)</span>
              </li>
            </ul>
            <div className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-4 text-xs text-[#b2c0d4] leading-relaxed">
              <strong className="text-white">Crucial Distinction:</strong> At an enrolled, enforced
              admission boundary, missing required authorization must deny the request. Alternative
              execution paths must be removed before claiming non-bypassable enforcement.
            </div>
          </div>
        </div>
      </section>

      {/* Restraint by Design */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold text-white mb-3">Restraint by Design</h2>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Most platforms glue agents together and hope for alignment. Cosmocrat centralizes
              authority and treats execution as a privilege, not a right.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/45 p-7 flex flex-col items-center text-center">
              <span className="tool-icon mb-4">
                <Network size={20} aria-hidden="true" />
              </span>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2">
                Unbounded Connection
              </div>
              <h3 className="text-lg font-semibold text-[#e2e8f0] mb-2">The Status Quo</h3>
              <p className="text-sm text-[#94a3b8] m-0">
                Implicit permissions spread across tool calls. Agents invoke other agents without an
                explicit authorization boundary.
              </p>
            </div>

            <div className="rounded-xl border border-[#f0b66a]/40 bg-[#121b2e]/85 p-7 flex flex-col items-center text-center">
              <span className="tool-icon mb-4">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a] mb-2">
                Explicit Hierarchy
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cosmocrat</h3>
              <p className="text-sm text-[#b2c0d4] m-0">
                Governed architecture separating context, eligibility, human authority, and
                retained decision records.
              </p>
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
            {gateSystemFaq.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>

          <ArchitecturePager current="/gate-system" />
        </div>
      </section>
    </div>
  );
}
