'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Box,
  CheckCircle,
  Cpu,
  Database,
  Layers,
  Lock,
  Network,
  Server,
  ShieldAlert,
  User,
  XCircle,
} from 'lucide-react';
import { runtimeGovernanceFaq } from '@/lib/faqs';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

interface KernelPart {
  id: string;
  label: string;
  subtitle: string;
  owns: string;
  boundary: string;
  icon: 'operator' | 'lane' | 'fabric' | 'gates' | 'memory' | 'inputs' | 'execution';
}

const kernelParts: readonly KernelPart[] = [
  {
    id: 'operator',
    label: 'Operator Plane',
    subtitle: 'Human Authorization',
    owns: 'Explicit human approval checkpoints (G4) and policy version ratification.',
    boundary: 'Must be wired cleanly to authentication and identity providers in deployment.',
    icon: 'operator',
  },
  {
    id: 'lane',
    label: 'Lane Isolation',
    subtitle: 'Policy Scope',
    owns: 'Separates personal, work, legal, or tenant scopes at enrolled boundaries.',
    boundary:
      'Isolation depends on actual retrieval and execution boundaries; affiliation with Cosmocrat alone does not establish it.',
    icon: 'lane',
  },
  {
    id: 'fabric',
    label: 'Context Fabric (OCF)',
    subtitle: 'Admissible State',
    owns: 'Injects mandatory active policies and operational alerts into enrolled decision calls.',
    boundary: 'Coverage and admissible context must be verified for the specific integration.',
    icon: 'fabric',
  },
  {
    id: 'gates',
    label: 'Gates (G0-G6)',
    subtitle: 'Admission Pipeline',
    owns: 'Conceptual admission pipeline evaluating proposed mutations before dispatch.',
    boundary:
      'Application-layer checks alone cannot stop alternative credential or network bypass paths.',
    icon: 'gates',
  },
  {
    id: 'memory',
    label: 'Memory Subsystem',
    subtitle: 'Chronicle Registry & State',
    owns: 'Retains attributable admission decisions and versioned state references.',
    boundary: 'Underlying external stores require their own access enforcement.',
    icon: 'memory',
  },
  {
    id: 'inputs',
    label: 'Inputs / Connectors',
    subtitle: 'Slack, Email, CRM, Webhooks',
    owns: 'Normalizes external triggers before they reach policy evaluation.',
    boundary: 'Connector implementations sit outside the narrow governance kernel.',
    icon: 'inputs',
  },
  {
    id: 'execution',
    label: 'Execution',
    subtitle: 'Workers, Adapters, APIs',
    owns: 'Carries out admitted work and reports external provider responses.',
    boundary: 'Permitted decisions still require separate outcome evidence from the downstream runtime.',
    icon: 'execution',
  },
];

const partIcons = {
  operator: User,
  lane: Box,
  fabric: Layers,
  gates: ShieldAlert,
  memory: Database,
  inputs: Network,
  execution: Server,
};

export default function RuntimeGovernanceContent() {
  const [selectedPart, setSelectedPart] = useState<string>('gates');
  const [compareMode, setCompareMode] = useState<'both' | 'guardrails' | 'kernel'>('both');

  const activePart = kernelParts.find((p) => p.id === selectedPart) ?? kernelParts[3];
  const ActiveIcon = partIcons[activePart.icon];

  return (
    <div className="pb-20">
      <ArchitectureNav current="/runtime-governance" />

      {/* 1. Hero Section */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap text-center max-w-4xl">
          <div className="eyebrow justify-center">System Architecture / 03</div>
          <h1>
            The Shift from &apos;Guardrails&apos; to <em>Kernel Governance</em>
          </h1>
          <p className="text-lg text-[#b2c0d4] max-w-2xl mx-auto leading-relaxed mb-6">
            Cosmocrat&apos;s governance design evaluates proposed mutations before execution on
            enrolled paths, with policy decisions retained as attributable receipts.
          </p>
          <p className="text-sm sm:text-base text-[#f0b66a] font-medium max-w-2xl mx-auto">
            Runtime governance checks policy and authority before an enrolled action executes.
            Coverage depends on the deployed integration and its actual capability boundaries.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What is runtime governance?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              Runtime governance is the architectural enforcement of policy at the moment of
              decision. An enrolled integration submits a proposed mutation for evaluation before
              execution. Memory retrieval, orchestration and tool execution retain their own
              implementation and enforcement boundaries outside the narrow kernel.
            </p>
            <p>
              In the Cosmocrat architecture, this means the kernel evaluates authority against the{' '}
              <Link
                href="/gate-system"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Gate System
              </Link>{' '}
              for that enrolled request. Retrieval permissions and execution privileges must also be
              enforced by the surrounding integration; alternative credential, tool and network
              paths can bypass an application-layer admission check.
            </p>
            <p>
              This process generates{' '}
              <Link
                href="/decision-exhaust"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Decision Exhaust
              </Link>
              , retaining the policy evaluation and decision evidence supplied on that path. The
              governed decision produces{' '}
              <Link
                href="/chronicle-receipts"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Chronicle Receipts
              </Link>
              , which document admission under the configured trust boundary. Actual execution and
              external outcomes need separate evidence.
            </p>
            <p>
              Fail-closed behavior must be verified at the deployed admission boundary, including
              missing evidence, persistence failures and bypass paths. Membership in the Cosmocrat
              OS tool family does not establish that integration or guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Guardrails vs Kernel Comparison */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow">Control comparison</div>
              <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
                Post-hoc Guardrails vs. Admission Kernel
              </h2>
            </div>
            <div className="flex gap-2" role="group" aria-label="Filter comparison view">
              {(
                [
                  ['both', 'Side by side'],
                  ['guardrails', 'Guardrails'],
                  ['kernel', 'Kernel'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCompareMode(key)}
                  aria-pressed={compareMode === key}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    compareMode === key
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-[#f0b66a]'
                      : 'border-[#233047] bg-[#121b2e] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${compareMode === 'both' ? 'lg:grid-cols-2' : ''} gap-8`}
          >
            {compareMode !== 'kernel' && (
              <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-7">
                <div className="flex items-center gap-3 border-b border-[#233047] pb-4 mb-6">
                  <span className="tool-icon">
                    <AlertTriangle className="text-red-400" size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white m-0">
                    Current State (Guardrails)
                  </h3>
                </div>
                <div className="rounded-lg border border-red-500/25 bg-[#0b1120] p-5 mb-6 font-mono text-xs text-red-300 flex flex-wrap gap-2 justify-between">
                  <span>Mode: Fail-Open</span>
                  <span>Timing: Post-hoc</span>
                  <span>Rule Source: Prompt Vibes</span>
                </div>
                <ul className="space-y-3.5 text-sm text-[#94a3b8] list-none p-0 m-0">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" size={16} aria-hidden="true" />
                    <span>
                      <strong className="text-[#e2e8f0]">Reactive:</strong> Filters catch bad
                      outputs only after generation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" size={16} aria-hidden="true" />
                    <span>
                      <strong className="text-[#e2e8f0]">Prompt-bound:</strong> &quot;Safety&quot;
                      relies on model phrasing rather than policy checks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" size={16} aria-hidden="true" />
                    <span>
                      <strong className="text-[#e2e8f0]">Fail-Open:</strong> If a classifier errors,
                      downstream actions proceed unchecked.
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {compareMode !== 'guardrails' && (
              <div className="rounded-xl border border-[#f0b66a]/45 bg-[#121b2e]/90 p-7">
                <div className="flex items-center gap-3 border-b border-[#233047] pb-4 mb-6">
                  <span className="tool-icon">
                    <Cpu size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white m-0">Cosmocrat (Kernel)</h3>
                </div>
                <div className="rounded-lg border border-[#f0b66a]/30 bg-[#0b1120] p-5 mb-6 font-mono text-xs text-[#f0b66a] flex flex-wrap gap-2 justify-between">
                  <span>Mode: Fail-Closed</span>
                  <span>Timing: Preemptive</span>
                  <span>Rule Source: Versioned Policy</span>
                </div>
                <ul className="space-y-3.5 text-sm text-[#cbd5e1] list-none p-0 m-0">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      className="text-[#f0b66a] shrink-0 mt-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-white">Preemptive:</strong> Enrolled requests are
                      evaluated <em>before</em> execution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      className="text-[#f0b66a] shrink-0 mt-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-white">Decision Evidence:</strong> Retain an
                      attributable receipt for the enrolled decision.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      className="text-[#f0b66a] shrink-0 mt-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-white">Fail-Closed Design:</strong> Verify default
                      denial at the deployed boundary.
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Kernel Architecture Explorer */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap max-w-5xl">
          <div className="text-center mb-10">
            <div className="eyebrow justify-center">Interactive schematic</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
              The Kernel Architecture
            </h2>
            <p className="text-sm text-[#94a3b8]">
              Cosmocrat centralizes authority, context, and governance while pushing execution
              outward. Click any layer to inspect its boundary.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
            {kernelParts.map((part) => {
              const Icon = partIcons[part.icon];
              const active = part.id === selectedPart;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPart(part.id)}
                  aria-pressed={active}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    active
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-white'
                      : 'border-[#233047] bg-[#121b2e]/70 text-[#94a3b8] hover:border-[#334563] hover:text-white'
                  }`}
                >
                  <Icon
                    size={16}
                    className={`mb-2 ${active ? 'text-[#f0b66a]' : 'text-[#64748b]'}`}
                    aria-hidden="true"
                  />
                  <div className="text-xs font-semibold leading-snug">{part.label}</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="tool-icon">
                <ActiveIcon size={18} aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono text-[11px] text-[#f0b66a] uppercase tracking-wider">
                  {activePart.subtitle}
                </div>
                <h3 className="text-lg font-semibold text-white m-0">{activePart.label}</h3>
              </div>
            </div>
            <p className="text-sm text-[#cbd5e1] mb-4 leading-relaxed">{activePart.owns}</p>
            <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-3.5 text-xs text-[#94a3b8]">
              <strong className="text-[#f0b66a]">Boundary:</strong> {activePart.boundary}
            </div>
          </div>
        </div>
      </section>

      {/* Kernel Capabilities Summary */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl font-semibold text-white mb-8">Kernel Capabilities</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/70 p-6 flex gap-4">
              <span className="tool-icon shrink-0">
                <Box size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Lane Isolation</h3>
                <p className="text-sm text-[#b2c0d4] m-0 leading-relaxed">
                  Standard AI systems share a flat context window. The governed-memory design uses
                  explicit lanes and permissions. Isolation depends on the actual retrieval and
                  execution boundaries; it is not guaranteed by a tool’s affiliation with Cosmocrat.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/70 p-6 flex gap-4">
              <span className="tool-icon shrink-0">
                <Layers size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Context Fabric (OCF)</h3>
                <p className="text-sm text-[#b2c0d4] m-0 leading-relaxed">
                  The Operating Context Fabric (OCF) manages the state of the world as the AI sees
                  it. Unlike a simple vector store, the OCF allows the kernel to inject mandatory
                  context (policies and active alerts) into enrolled calls. Coverage and admissible
                  context must be verified for the specific integration.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/70 p-6 flex gap-4">
              <span className="tool-icon shrink-0">
                <Lock size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">The Gate System</h3>
                <p className="text-sm text-[#b2c0d4] mb-3 leading-relaxed">
                  A conceptual seven-stage model for an enrolled integration. Validate admission,
                  execution and outcome evidence at their respective boundaries.
                </p>
                <Link href="/gate-system" className="text-link text-xs">
                  View the Path of Resistance <ArrowRight aria-hidden="true" />
                </Link>
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
            {runtimeGovernanceFaq.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>

          <ArchitecturePager current="/runtime-governance" />
        </div>
      </section>
    </div>
  );
}
