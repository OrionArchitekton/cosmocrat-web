'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Database,
  FileJson,
  Layers,
  RotateCcw,
  Server,
  ShieldAlert,
  User,
  Workflow,
} from 'lucide-react';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

const cycleSteps = [
  {
    num: '01',
    title: 'Policy',
    description: 'Evaluate authority, limits, and context before execution.',
    note: 'Design goal: fail-closed.',
    icon: ShieldAlert,
  },
  {
    num: '02',
    title: 'Enforce',
    description: 'Permit, deny or defer the governed request at its explicit boundary.',
    note: 'Verify denial and error paths.',
    icon: Activity,
  },
  {
    num: '03',
    title: 'Receipt',
    description: 'Retain inputs, policy and the admission decision at a verified receipt boundary.',
    note: 'Verify integrity and retention controls.',
    icon: FileJson,
  },
  {
    num: '04',
    title: 'Rollback + Replay',
    description:
      'Reconstruct a decision when its versioned inputs and policy are retained; inspect external outcome evidence separately.',
    note: 'Continuous governance improvement.',
    icon: RotateCcw,
  },
] as const;

export default function DecisionExhaustContent() {
  const [planeView, setPlaneView] = useState<'both' | 'data' | 'decision'>('both');
  const [receiptTab, setReceiptTab] = useState<'compare' | 'log' | 'receipt'>('compare');

  return (
    <div className="pb-20">
      <ArchitectureNav current="/decision-exhaust" />

      {/* 1. Hero Section */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow">Control Plane / 02</div>
            <h1>
              ClickHouse governs data exhaust.{' '}
              <em>Cosmocrat governs decision exhaust.</em>
            </h1>
            <p className="text-lg text-[#b2c0d4] mb-8 max-w-xl leading-relaxed">
              Policy and authority records for governed decisions, with explicit integration and
              replay boundaries.
            </p>
            <div className="button-row mb-4">
              <Link href="/waitlist" className="button button-primary">
                Request Early Access <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/docs" className="button button-outline">
                Start here
              </Link>
            </div>
            <p className="text-xs font-mono text-[#94a3b8]">
              Runs in your environment. Your keys. Your data.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a] mb-4">
                Two distinct audit streams
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-4">
                  <div className="font-mono text-xs font-semibold text-[#cbd5e1] mb-1">
                    Data Exhaust
                  </div>
                  <p className="m-0 text-xs text-[#94a3b8]">
                    Logs, metrics, spans, HTTP latency, provider status codes.
                  </p>
                </div>
                <div className="rounded-lg border border-[#f0b66a]/45 bg-[#0b1120] p-4">
                  <div className="font-mono text-xs font-semibold text-[#f0b66a] mb-1">
                    Decision Exhaust
                  </div>
                  <p className="m-0 text-xs text-[#cbd5e1]">
                    Stated intent, active policy hash, caller authority, and admission verdict.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What is decision exhaust?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              Data exhaust captures observed system events through logs, metrics and traces.
              Decision exhaust retains the stated intent, policy evaluation and authority basis
              behind an enrolled governed decision.
            </p>
            <p className="text-white font-medium">
              Decision exhaust is the audit record of each enrolled governed decision, including
              intent, policy evaluation and authority. Execution and external outcomes require their
              own retained evidence.
            </p>
            <p>
              An event log alone may omit the policy and authority behind a requested action.
              Auditing a proposed customer refund also requires its admission decision and the
              separate evidence of what the provider accepted or completed.
            </p>
          </div>
        </div>
      </section>

      {/* The Governance Gap */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-7">
            <div className="flex items-center justify-between border-b border-[#233047] pb-4 mb-6">
              <span className="font-mono text-xs text-red-400 flex items-center gap-2">
                <AlertTriangle size={14} aria-hidden="true" /> Ungoverned agent dispatch
              </span>
              <span className="font-mono text-[11px] text-[#94a3b8]">No admission boundary</span>
            </div>
            <div className="grid grid-cols-3 gap-3 items-center text-center">
              <div className="rounded-lg border border-red-500/30 bg-[#0b1120] p-4">
                <Database size={18} className="text-[#94a3b8] mx-auto mb-2" aria-hidden="true" />
                <span className="font-mono text-xs text-red-300">SQL Query</span>
              </div>
              <div className="rounded-xl border border-red-500/50 bg-red-950/20 p-4">
                <div className="font-mono text-[10px] text-red-400 uppercase mb-1">Ungoverned</div>
                <div className="text-sm font-semibold text-white">AI Agent</div>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-[#0b1120] p-4">
                <CreditCard size={18} className="text-[#94a3b8] mx-auto mb-2" aria-hidden="true" />
                <span className="font-mono text-xs text-red-300">Payment</span>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow">The Governance Gap</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-4">
              Agents don&apos;t just chat.
              <br />
              They execute.
            </h2>
            <p className="text-base text-[#b2c0d4] mb-6 leading-relaxed">
              For enrolled governed decisions, decision exhaust records the evaluated request,
              authority and policy result. Reasoning, tool calls and external actions outside that
              integration require their own evidence; this reference does not establish their
              coverage.
            </p>
            <div className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-4 text-sm text-[#cbd5e1]">
              Experimental AI prompts tolerate best-effort logs; enterprise workflows require
              explicit authority trails.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dual-Plane Architecture */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow">Architecture</div>
              <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
                The Architecture of Governance
              </h2>
              <p className="text-sm text-[#94a3b8] m-0">
                A dedicated control plane for decisions, sitting alongside your data plane.
              </p>
            </div>
            <div className="flex gap-2" role="group" aria-label="Filter exhaust plane highlight">
              {(
                [
                  ['both', 'Both planes'],
                  ['data', 'Data Exhaust'],
                  ['decision', 'Decision Exhaust'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPlaneView(key)}
                  aria-pressed={planeView === key}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    planeView === key
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-[#f0b66a]'
                      : 'border-[#233047] bg-[#121b2e] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-4 rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-[#f0b66a] mb-4">
                Business Apps
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <Workflow size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs text-[#e2e8f0]">Agents</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <Server size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs text-[#e2e8f0]">Workflows</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[#233047] bg-[#0b1120] p-3">
                  <User size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs text-[#e2e8f0]">Operators (CRM)</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 gap-4">
              <div
                className={`rounded-xl border p-6 transition-opacity ${
                  planeView === 'decision'
                    ? 'border-[#233047] bg-[#0d1526]/60 opacity-45'
                    : 'border-[#334563] bg-[#121b2e]/75'
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2">
                  Data Exhaust · Logs &amp; Metrics
                </div>
                <div className="flex items-center gap-3">
                  <span className="tool-icon">
                    <Activity size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white m-0">ClickHouse</h3>
                    <p className="text-xs text-[#94a3b8] m-0">
                      Observability Speed Layer — telemetry, latency, and runtime signals.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-6 transition-opacity ${
                  planeView === 'data'
                    ? 'border-[#233047] bg-[#0d1526]/60 opacity-45'
                    : 'border-[#f0b66a]/55 bg-[#121b2e]/95'
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#f0b66a] mb-2">
                  Decision Exhaust · Prompts, Policies &amp; Receipts
                </div>
                <div className="flex items-center gap-3">
                  <span className="tool-icon">
                    <ShieldAlert size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white m-0">Cosmocrat</h3>
                    <p className="text-xs text-[#cbd5e1] m-0">
                      Decision Authority Plane — policy evaluation and attributable admission
                      receipts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Cycle */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap">
          <div className="flex items-center gap-3 mb-10">
            <Layers size={24} className="text-[#f0b66a]" aria-hidden="true" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white m-0">
                The Governance Cycle
              </h2>
              <p className="text-sm text-[#94a3b8] m-0">
                A conceptual cycle for an enrolled governed action.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cycleSteps.map(({ num, title, description, note, icon: Icon }) => (
              <div
                key={num}
                className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-5 flex flex-col"
              >
                <div className="font-mono text-xs text-[#f0b66a] mb-3">{num}</div>
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <Icon size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span>{title}</span>
                </h3>
                <p className="text-xs leading-relaxed text-[#b2c0d4] mb-4">{description}</p>
                <div className="mt-auto font-mono text-[11px] text-[#94a3b8] pt-3 border-t border-[#233047]">
                  {note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Receipts Inspector */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-white mb-3">
                Decision receipts you can inspect
              </h2>
              <p className="text-sm sm:text-base text-[#b2c0d4] m-0">
                An enrolled admission boundary is designed to retain a{' '}
                <Link
                  href="/chronicle-receipts"
                  className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
                >
                  decision receipt
                </Link>
                : the requested action, policy, authority and evaluation state. Execution and
                external outcomes require separate retained evidence.
              </p>
            </div>

            <div className="flex gap-2" role="group" aria-label="Receipt comparison view">
              {(
                [
                  ['compare', 'Side by side'],
                  ['log', 'Event log'],
                  ['receipt', 'Decision receipt'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setReceiptTab(key)}
                  aria-pressed={receiptTab === key}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    receiptTab === key
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
            className={`grid grid-cols-1 ${receiptTab === 'compare' ? 'lg:grid-cols-2' : ''} gap-6 font-mono text-xs sm:text-sm`}
          >
            {receiptTab !== 'receipt' && (
              <div className="rounded-xl border border-[#233047] bg-[#070b15] p-6">
                <div className="text-xs text-[#94a3b8] mb-4 uppercase tracking-wider">
                  Illustrative event log
                </div>
                <div className="text-[#cbd5e1] break-all leading-relaxed mb-6">
                  <span className="text-[#94a3b8]">2026-01-18T05:12:44Z</span> tool_call=refund_user
                  amount=42.00 status=200 provider=stripe latency_ms=183
                </div>
                <div className="text-xs text-[#94a3b8] pt-4 border-t border-[#233047]">
                  Useful for debugging. Not sufficient to prove authority.
                </div>
              </div>
            )}

            {receiptTab !== 'log' && (
              <div className="rounded-xl border border-[#f0b66a]/40 bg-[#0d1526] p-6">
                <div className="text-xs text-[#f0b66a] mb-4 uppercase tracking-wider font-semibold">
                  Illustrative decision receipt
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex border-b border-[#233047] pb-2">
                    <span className="w-24 text-[#94a3b8] shrink-0">Status</span>
                    <span className="text-white font-semibold">
                      ALLOW <span className="text-[#94a3b8] font-normal">(policy admission only)</span>
                    </span>
                  </div>
                  <div className="flex border-b border-[#233047] pb-2">
                    <span className="w-24 text-[#94a3b8] shrink-0">Policy</span>
                    <span className="text-[#e2e8f0]">finance.refunds.l1 — limit: $50</span>
                  </div>
                  <div className="flex border-b border-[#233047] pb-2">
                    <span className="w-24 text-[#94a3b8] shrink-0">Actor</span>
                    <span className="text-emerald-300">SupportBot-01 (authority: L1)</span>
                  </div>
                  <div className="flex border-b border-[#233047] pb-2">
                    <span className="w-24 text-[#94a3b8] shrink-0">Action</span>
                    <span className="text-[#f0b66a]">refund_user(user_id=U-1872, amount=$42)</span>
                  </div>
                  <div className="flex border-b border-[#233047] pb-2">
                    <span className="w-24 text-[#94a3b8] shrink-0">Provider</span>
                    <span className="text-[#e2e8f0]">
                      Separate provider response: request accepted (illustrative)
                    </span>
                  </div>
                  <div className="flex pt-1">
                    <span className="w-24 text-[#94a3b8] shrink-0">Receipt</span>
                    <span className="text-[#94a3b8]">
                      hash=9d7b... (illustrative); replay requires retained inputs
                    </span>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8] mt-5 pt-4 border-t border-[#233047]">
                  Decision receipts bind intent, policy and authority. Execution and outcomes
                  require separate retained evidence.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ + Pager */}
      <section className="pt-16">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              question="What is decision exhaust vs data exhaust?"
              answer={
                <>
                  <p className="mb-2">
                    Data exhaust is the byproduct of system operation (logs, traces). Decision
                    exhaust is the byproduct of governance (reasoning, policy checks, authority
                    grants).
                  </p>
                  <p className="m-0">
                    One captures <em>what</em> happened. The other captures <em>why</em> it was
                    allowed.
                  </p>
                </>
              }
            />
            <FaqItem
              question="Is decision exhaust the same as observability?"
              answer="Observability records signals. Decision exhaust retains policy and authority information for an enrolled decision. Auditability depends on the actual retention and integrity controls."
            />
            <FaqItem
              question="Why isn't logging enough for AI governance?"
              answer="An event log can omit the policy and authority behind an action. A decision receipt records that admission basis; it does not prove that execution or an external outcome occurred."
            />
            <FaqItem
              question="Does decision exhaust increase latency or cost?"
              answer="Policy evaluation and durable receipt persistence add work. Measure the enrolled workload; this reference makes no universal overhead or latency guarantee."
            />
          </div>

          <ArchitecturePager current="/decision-exhaust" />
        </div>
      </section>
    </div>
  );
}
