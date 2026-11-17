'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Anchor,
  BrainCircuit,
  CheckCircle2,
  Eye,
  FileCode,
  Filter,
  LayoutGrid,
  Lock,
  Scale,
  ShieldAlert,
} from 'lucide-react';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

interface DriftDomain {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  mechanism: string;
  boundary: string;
  icon: 'behavioral' | 'policy' | 'context' | 'authority' | 'structural';
}

const driftDomains: readonly DriftDomain[] = [
  {
    id: 'behavioral',
    title: 'Behavioral Drift',
    subtitle: 'Vibe shifts & output variance',
    problem: 'Same inputs produce materially different action trajectories under load or prompt edits.',
    mechanism: 'AIMD controllers and repeated baseline checks flag variance across executions.',
    boundary: 'Detects divergence only on signals configured in the active deployment.',
    icon: 'behavioral',
  },
  {
    id: 'policy',
    title: 'Policy Drift',
    subtitle: 'Silent rule changes',
    problem: 'Rules change silently without promotion tracking or clear attribution.',
    mechanism: 'Receipt Binding locks every evaluated admission to a cryptographic policy_hash.',
    boundary: 'Historical comparison relies on retaining old policy definitions.',
    icon: 'policy',
  },
  {
    id: 'context',
    title: 'Context Drift',
    subtitle: 'Memory pollution',
    problem: 'Memory from outside an allowed lane leaks into unrelated decision prompts.',
    mechanism: 'Explicitly enrolled retrieval paths enforce lane policy filters before injection.',
    boundary: 'Requires removing un-enrolled retrieval routes and preloaded caches.',
    icon: 'context',
  },
  {
    id: 'authority',
    title: 'Authority Drift',
    subtitle: 'Implicit permission creep',
    problem: 'A permission granted yesterday remains active after current risk thresholds shift.',
    mechanism: 'Runtime re-evaluation refuses grandfathered authority when risk exceeds limits.',
    boundary: 'Must be wired cleanly at the enforcement boundary without residual tokens.',
    icon: 'authority',
  },
  {
    id: 'structural',
    title: 'Structural Drift',
    subtitle: 'Broken audit trails',
    problem: 'Receipt lineage or expected Chronicle events go missing across handoffs.',
    mechanism: 'Checks detect missing correlation between admitted intent and downstream outcome.',
    boundary: 'Outcome verification still relies on retained downstream logs.',
    icon: 'structural',
  },
];

const domainIcons = {
  behavioral: Activity,
  policy: FileCode,
  context: BrainCircuit,
  authority: Anchor,
  structural: LayoutGrid,
};

const responseModes = [
  {
    id: 'shadow',
    badge: 'Response A · MODE: OBSERVE',
    title: 'Degrade to SHADOW',
    description:
      'Observe-only mode. The action is executed in an isolated sandbox while drift is recorded without external mutation.',
    actionTaken: 'SHADOW_OBSERVE_ONLY',
    icon: Eye,
  },
  {
    id: 'quarantine',
    badge: 'Response B · MODE: ISOLATE',
    title: 'Quarantine Lane',
    description:
      'Proposed response: deny new memory writes and external tool calls on enrolled paths. Isolation requires an enforced boundary without bypass paths.',
    actionTaken: 'QUARANTINE_LANE_ACTIVE',
    icon: Scale,
  },
  {
    id: 'halt',
    badge: 'Response C · MODE: HALT',
    title: 'Halt & Require G4',
    description:
      'Proposed response: stop the enrolled action and require explicit human authority before proceeding.',
    actionTaken: 'HALT_G4_REQUIRED',
    icon: Lock,
  },
] as const;

export default function DriftGuardContent() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('policy');
  const [selectedResponseId, setSelectedResponseId] = useState<'shadow' | 'quarantine' | 'halt'>(
    'halt'
  );

  const activeDomain =
    driftDomains.find((d) => d.id === selectedDomainId) ?? driftDomains[1];
  const ActiveDomainIcon = domainIcons[activeDomain.icon];
  const activeResponse =
    responseModes.find((r) => r.id === selectedResponseId) ?? responseModes[2];

  return (
    <div className="pb-20">
      <ArchitectureNav current="/drift-guard" />

      {/* 1. Hero */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap text-center max-w-4xl">
          <div className="eyebrow justify-center">Runtime Integrity / 06</div>
          <h1>
            Failures are loud. <em>Drift is quiet.</em>
          </h1>
          <p className="text-lg text-[#b2c0d4] max-w-2xl mx-auto leading-relaxed mb-6">
            System behavior, memory, policy, and authority tend to silently diverge over time. Drift
            Guard exists to hear the quiet before it becomes a failure.
          </p>
          <p className="text-base text-[#f0b66a] font-medium max-w-3xl mx-auto">
            Drift Guard describes checks for divergence between authorized intent and observed AI
            behavior over time. Detection and response depend on the enrolled integration.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What is Drift Guard?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              Drift Guard is the continuous integrity layer of the Cosmocrat operating system. While
              the{' '}
              <Link
                href="/gate-system"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Gate System
              </Link>{' '}
              evaluates enrolled actions at a point in time, Drift Guard proposes repeated checks for
              behavior that diverges from what was authorized, observed, or intended as the system
              evolves.
            </p>
            <p className="text-white font-medium">
              Drift emerges across time and state transitions — not within a single execution.
            </p>
            <p>
              It spans five critical domains: behavior, memory, policy, authority, and structure. Its
              design looks beyond crashes for divergence from authorized behavior. Actual coverage
              depends on the signals, checks and boundaries configured in a deployment.
            </p>
            <p>
              A configured response can halt an enrolled action when divergence is detected. The
              design retains{' '}
              <Link
                href="/decision-exhaust"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Decision Exhaust
              </Link>{' '}
              to document the event and informs the{' '}
              <Link
                href="/runtime-governance"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Runtime Governance
              </Link>{' '}
              integration so its operator can review future enforcement.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Five Domains of Drift */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap max-w-5xl">
          <div className="text-center mb-10">
            <div className="eyebrow justify-center">Detection surface</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
              The Five Domains of Drift
            </h2>
            <p className="text-sm text-[#94a3b8]">
              Select a domain to inspect how silent divergence forms and what mechanism watches it.
            </p>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6"
            role="tablist"
            aria-label="Five domains of drift"
          >
            {driftDomains.map((domain) => {
              const Icon = domainIcons[domain.icon];
              const active = domain.id === selectedDomainId;
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`rounded-lg border p-3.5 text-left transition-colors ${
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
                  <div className="text-xs font-semibold">{domain.title}</div>
                  <div className="text-[11px] text-[#94a3b8] mt-1">{domain.subtitle}</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="tool-icon">
                <ActiveDomainIcon size={18} aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a]">
                  {activeDomain.subtitle}
                </div>
                <h3 className="text-xl font-semibold text-white m-0">{activeDomain.title}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8] mb-1">
                  Failure Mode
                </div>
                <p className="text-sm text-[#e2e8f0] m-0">{activeDomain.problem}</p>
              </div>
              <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#f0b66a] mb-1">
                  Mitigation Design
                </div>
                <p className="text-sm text-[#e2e8f0] m-0">{activeDomain.mechanism}</p>
              </div>
            </div>
            <div className="text-xs text-[#94a3b8]">
              <strong className="text-[#f0b66a]">Scope limit:</strong> {activeDomain.boundary}
            </div>
          </div>
        </div>
      </section>

      {/* Side-Brain & Authority Decay */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/65 p-7">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f0b66a] mb-3">
              <ShieldAlert size={14} aria-hidden="true" />
              <span>Authority Decay</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No Grandfathered Permissions
            </h3>
            <p className="text-sm text-[#b2c0d4] leading-relaxed mb-4">
              A permission granted yesterday may not remain valid today when risk thresholds shift.
              Drift Guard re-evaluates Gate conditions at runtime; if the current threshold check
              fails, the gate closes regardless of past precedent.
            </p>
            <div className="font-mono text-xs rounded-lg border border-[#233047] bg-[#0b1120] px-4 py-3 text-[#f0b66a]">
              STATUS EXAMPLE: GATE LOCKED (G4 RE-VERIFICATION REQUIRED)
            </div>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/65 p-7">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f0b66a] mb-3">
              <Filter size={14} aria-hidden="true" />
              <span>The Side-Brain Connection</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Lane Pollution Detectors</h3>
            <p className="text-sm text-[#b2c0d4] leading-relaxed mb-4">
              The Side-Brain is a conceptual governed retrieval interface. On explicitly enrolled
              retrieval paths, configured lane policy can filter the context provided to a model.
              Other retrieval routes and preloaded context need separate controls.
            </p>
            <ul className="space-y-2 list-none p-0 m-0 text-xs text-[#cbd5e1]">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Context access follows the enrolled lane policy.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Cross-lane access requires configured permission.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Fail-Closed Response Modes + JSON Event Preview */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold text-white mb-3">
              Active Response: The Fail-Closed Doctrine
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Select a response mode to inspect how Drift Guard records divergence without trying
              to silently &quot;patch&quot; execution live.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {responseModes.map((mode) => {
              const Icon = mode.icon;
              const selected = mode.id === selectedResponseId;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedResponseId(mode.id)}
                  aria-pressed={selected}
                  className={`rounded-xl border p-6 text-left flex flex-col justify-between transition-colors ${
                    selected
                      ? 'border-[#f0b66a] bg-[#121b2e]'
                      : 'border-[#233047] bg-[#0d1526] hover:border-[#334563]'
                  }`}
                >
                  <div>
                    <div className="font-mono text-[11px] text-[#f0b66a] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Icon size={14} aria-hidden="true" />
                      <span>{mode.badge}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{mode.title}</h3>
                    <p className="text-xs leading-relaxed text-[#94a3b8] m-0">{mode.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-xl border border-[#233047] bg-[#0b1120] p-6 sm:p-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Evidence for a defined boundary
              </h3>
              <p className="text-sm text-[#b2c0d4] leading-relaxed mb-5">
                On an enrolled path, retained receipts and drift observations can support review of
                configured controls. Their integrity, coverage and external outcomes require
                separate verification.
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <span className="rounded border border-[#233047] bg-[#121b2e] px-3 py-1.5 text-[#f0b66a]">
                  DRIFT_DETECTED
                </span>
                <span className="rounded border border-[#233047] bg-[#121b2e] px-3 py-1.5 text-emerald-400">
                  DRIFT_ACKED
                </span>
              </div>
            </div>

            <pre className="m-0 rounded-lg border border-[#233047] bg-[#070b15] p-5 font-mono text-xs text-[#cbd5e1] overflow-x-auto leading-relaxed">
              {`// audit_log_v2.json (${activeResponse.title})
{
  "event": "DRIFT_DETECTED",
  "invariant_violated": "policy_hash_mismatch",
  "lane_id": "finance_ops",
  "timestamp": "2026-01-15T14:02:00Z",
  "action_taken": "${activeResponse.actionTaken}",
  "drift_vector": {
    "expected": "0x99a...",
    "actual": "0x11b..."
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* FAQ + Pager */}
      <section className="pt-16">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              question="How does Drift Guard differ from observability?"
              answer="Observability records signals such as latency and errors. Drift Guard's design adds configured checks for divergence from authorized behavior, including cases without a software error. Detection coverage must be established in the deployed integration."
            />
            <FaqItem
              question="What is 'Behavioral Drift'?"
              answer="It's when an agent's response patterns shift over time—for example, becoming more aggressive, less concise, or hallucinating facts—without any code changes."
            />
            <FaqItem
              question="Can Drift Guard automatically fix the AI?"
              answer="The proposed response is 'Halt & Require G4' (Human Authorization). A deployment must explicitly configure and verify that response. Automatic correction requires its own authority and evidence."
            />
            <FaqItem
              question="Does it work on non-deterministic models?"
              answer="The design checks configured boundaries and observed behavior across model types. Non-deterministic behavior still requires suitable detection signals and workload-specific validation; no universal safety guarantee follows."
            />
          </div>

          <ArchitecturePager current="/drift-guard" />
        </div>
      </section>
    </div>
  );
}
