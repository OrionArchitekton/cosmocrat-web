'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Box,
  CheckCircle,
  FileText,
  Fingerprint,
  GitCommit,
  History,
  Lock,
  Shield,
} from 'lucide-react';
import { chronicleReceiptsFaq } from '@/lib/faqs';
import FaqItem from '../FaqItem';
import { ArchitectureNav, ArchitecturePager } from '@/components/os/ArchitectureNav';

const incidentSteps = [
  {
    id: 'detect',
    label: '01 Detect',
    title: 'Identify policy or behavioral divergence',
    detail:
      'Drift signals or boundary errors flag that observed requests diverged from authorized bounds.',
  },
  {
    id: 'record',
    label: '02 Record (Receipt)',
    title: 'Bind the anomaly to a Chronicle record',
    detail:
      'Retain policy hash, actor reference, and evaluation snapshot within the configured trust boundary.',
  },
  {
    id: 'contain',
    label: '03 Contain',
    title: 'Apply configured fail-closed hold',
    detail:
      'Isolate the enrolled path or escalate pending mutations to G4 human review.',
  },
  {
    id: 'remediate',
    label: '04 Remediate',
    title: 'Update explicit rule or boundary definition',
    detail:
      'Operators author policy revisions or revoke compromised credentials outside the AI execution loop.',
  },
  {
    id: 'ratify',
    label: '05 Ratify',
    title: 'Promote revised policy version with new hash',
    detail:
      'Subsequent receipts reference the updated policy_hash so historical audits remain distinguishable.',
  },
] as const;

export default function ChronicleReceiptsContent() {
  const [verifyPolicy, setVerifyPolicy] = useState<'v1' | 'v2'>('v1');
  const [activeIncident, setActiveIncident] = useState<string>('record');

  const selectedIncident =
    incidentSteps.find((step) => step.id === activeIncident) ?? incidentSteps[0];

  return (
    <div className="pb-20">
      <ArchitectureNav current="/chronicle-receipts" />

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-[#233047]">
        <div className="wrap text-center max-w-4xl">
          <div className="eyebrow justify-center">The Canonical Rule / 05</div>
          <h1>
            If a governed decision is not receipted,{' '}
            <em>its admission is not recorded.</em>
          </h1>
          <p className="text-lg text-[#b2c0d4] max-w-3xl mx-auto leading-relaxed mb-6">
            The Chronicle Registry is an append-only, tamper-evident ledger. It converts &quot;trust
            us&quot; into &quot;verify this&quot;.
          </p>
          <p className="text-base text-[#f0b66a] font-medium max-w-3xl mx-auto">
            Chronicle receipts record the policy and authority basis for an enrolled admission
            decision. Verification depends on retained evidence and the configured integrity controls.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 border-b border-[#233047]">
        <div className="wrap max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            What are Chronicle Receipts?
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#b2c0d4]">
            <p>
              Within an enrolled governance integration, Chronicle receipts are designed as
              append-only, tamper-evident decision records. They bind policy, authority, context
              and the admission result within the configured trust boundary. Retention and
              integrity controls must be established in the actual deployment.
            </p>
            <p>
              This establishes the admissible &quot;why&quot; behind an action. By anchoring into{' '}
              <Link
                href="/runtime-governance"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Runtime Governance
              </Link>
              , receipts record the{' '}
              <Link
                href="/gate-system"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Gate System
              </Link>{' '}
              admission decision for an enrolled request, not its external completion.
            </p>
            <p>
              It supplies retained admission evidence for{' '}
              <Link
                href="/decision-exhaust"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Decision Exhaust
              </Link>
              , supporting the evidence that enrolled{' '}
              <Link
                href="/drift-guard"
                className="text-[#f0b66a] underline underline-offset-4 hover:text-white"
              >
                Drift Guard
              </Link>{' '}
              checks can use to detect divergence over time.
            </p>
          </div>
        </div>
      </section>

      {/* The Trust Gap */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-2">The Trust Gap</h2>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Logs tell stories. Receipts establish inspectable facts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard AI Log */}
            <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-[#cbd5e1] mb-5 flex items-center gap-2.5">
                <FileText className="text-[#94a3b8]" size={18} aria-hidden="true" />
                <span>Standard AI: The Log</span>
              </h3>
              <div className="rounded-lg border border-[#233047] bg-[#070b15] p-4 font-mono text-xs text-[#94a3b8] space-y-1.5 mb-6 overflow-x-auto">
                <div>INFO: User123 accessed resource X at 10:45:22 UTC</div>
                <div className="text-red-400/80">ERROR: Connection timeout for service Y</div>
                <div>DEBUG: Payload content size 2048 bytes</div>
                <div>WARNING: Potential security policy violation detected...</div>
                <div>INFO: User123 accessed resource X (duplicate)</div>
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8] list-none p-0">
                <li className="flex items-center gap-2.5">
                  <AlertTriangle size={15} className="text-red-400 shrink-0" aria-hidden="true" />
                  <span>Mutable (can be edited or rotated out)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <AlertTriangle size={15} className="text-red-400 shrink-0" aria-hidden="true" />
                  <span>Reactive (written after execution)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <AlertTriangle size={15} className="text-red-400 shrink-0" aria-hidden="true" />
                  <span>Unstructured text without authority proof</span>
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-[#233047] font-mono text-xs text-[#cbd5e1]">
                Answers: &quot;What happened?&quot;
              </div>
            </div>

            {/* Cosmocrat Chronicle Receipt */}
            <div className="rounded-xl border border-[#f0b66a]/40 bg-[#121b2e]/85 p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2.5">
                <Shield className="text-[#f0b66a]" size={18} aria-hidden="true" />
                <span>Cosmocrat: The Chronicle</span>
              </h3>

              <div className="space-y-3 mb-6">
                <div className="rounded-lg border border-[#233047] bg-[#0b1120] p-4">
                  <div className="font-mono text-[11px] text-[#f0b66a] flex justify-between mb-2">
                    <span>RECORD 20A8</span>
                    <span className="text-[#94a3b8]">PREV: 0x4A20...</span>
                  </div>
                  <div className="font-mono text-xs text-[#cbd5e1] space-y-1">
                    <div>TX_ID: tx-c8d7e6f5</div>
                    <div>POLICY: finance_l1_v2 (hash: 0x9c88)</div>
                    <div className="text-emerald-400">ADMISSION: ALLOW (illustrative)</div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#f0b66a]/45 bg-[#0b1120] p-4">
                  <div className="font-mono text-[11px] text-[#f0b66a] flex justify-between mb-2">
                    <span>RECORD 20A9</span>
                    <span className="text-[#94a3b8]">PREV: 0x8a92...</span>
                  </div>
                  <div className="font-mono text-xs text-[#e2e8f0] space-y-1">
                    <div>TX_ID: tx-b9a0f1e2</div>
                    <div>ACTOR: authorized_agent_01</div>
                    <div>PROOF: signature 0x1F2E...</div>
                    <div className="text-emerald-400">ADMISSION: ALLOW (illustrative)</div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-[#cbd5e1] list-none p-0">
                <li className="flex items-center gap-2.5">
                  <Lock size={15} className="text-[#f0b66a] shrink-0" aria-hidden="true" />
                  <span>Tamper-evident design</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Shield size={15} className="text-[#f0b66a] shrink-0" aria-hidden="true" />
                  <span>Required at an enrolled admission boundary</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Fingerprint size={15} className="text-[#f0b66a] shrink-0" aria-hidden="true" />
                  <span>Cryptographic decision record</span>
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-[#233047] font-mono text-xs text-white">
                Answers: &quot;Why was it authorized?&quot;
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[#94a3b8] max-w-3xl mx-auto">
            Receipts preserve attributable decision metadata within the configured trust boundary.
            Separate evidence is still required to establish what actually happened after admission.
          </p>
        </div>
      </section>

      {/* Anatomy of a Receipt */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap max-w-5xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">Structure</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">
              The Anatomy of a Receipt
            </h2>
            <p className="text-sm text-[#94a3b8]">
              Four discrete segments bind identity, context, active policy, and cryptographic proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
              <div className="flex items-center justify-between border-b border-[#233047] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <Fingerprint size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    01 · Header
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94a3b8]">RX-ID: 9f887d0c</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Timestamp</span>
                  <span className="text-[#e2e8f0]">2026-05-12T08:42:00Z</span>
                </div>
                <div className="flex justify-between">
                  <span>Origin</span>
                  <span className="text-[#e2e8f0]">us-east-1a</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
              <div className="flex items-center justify-between border-b border-[#233047] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <Box size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    02 · Binding
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94a3b8]">Lane &amp; State</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Lane ID</span>
                  <span className="text-[#e2e8f0]">enterprise_legal</span>
                </div>
                <div className="flex justify-between">
                  <span>Context Hash</span>
                  <span className="text-[#e2e8f0]">0x7f8a91...</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6">
              <div className="flex items-center justify-between border-b border-[#233047] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <Shield size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    03 · Governance
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94a3b8]">Authority</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Policy Hash</span>
                  <span className="text-[#f0b66a]">0x9b2c...</span>
                </div>
                <div className="flex justify-between">
                  <span>Authority</span>
                  <span className="text-[#e2e8f0]">[&quot;read_sensitive&quot;]</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#f0b66a]/35 bg-[#121b2e]/90 p-6">
              <div className="flex items-center justify-between border-b border-[#233047] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <GitCommit size={16} className="text-[#f0b66a]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    04 · Proof
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400">Signed</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Input / Output Refs</span>
                  <span className="text-[#e2e8f0]">0xAA3B... / 0xFE71...</span>
                </div>
                <div className="flex justify-between">
                  <span>Signature</span>
                  <span className="text-emerald-400">0x1F2E9988...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Binding Interactive Replay Verifier */}
      <section className="py-20 border-b border-[#233047] bg-[#090f1d]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow">Policy Binding</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-4">
              The Policy-Bound &quot;Why&quot;
            </h2>
            <p className="text-base text-[#b2c0d4] mb-6 leading-relaxed">
              In standard systems, policies change, but old logs don&apos;t update. This creates
              &quot;Policy Drift&quot;—you can&apos;t prove <em>why</em> an action was allowed last
              month if the rules changed today.
            </p>
            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/70 p-5">
              <h3 className="text-white font-semibold text-base mb-2 flex items-center gap-2">
                <History size={17} className="text-[#f0b66a]" aria-hidden="true" />
                <span>Key Insight</span>
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed m-0">
                Cosmocrat receipts bind an enrolled governed decision to the{' '}
                <code className="text-[#f0b66a]">policy_hash</code> active at that moment. A
                decision can retain its original policy reference. Replay depends on the versioned
                policy, required inputs and retained evidence; it does not reproduce all model
                reasoning or prove the external outcome.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#0d1526] p-6">
            <div className="flex items-center justify-between gap-4 border-b border-[#233047] pb-4 mb-5 flex-wrap">
              <span className="font-mono text-xs text-[#cbd5e1]">Verify against policy:</span>
              <div className="flex gap-2" role="group" aria-label="Select verification policy version">
                <button
                  type="button"
                  onClick={() => setVerifyPolicy('v1')}
                  aria-pressed={verifyPolicy === 'v1'}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    verifyPolicy === 'v1'
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-[#f0b66a]'
                      : 'border-[#334563] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Policy V1
                </button>
                <button
                  type="button"
                  onClick={() => setVerifyPolicy('v2')}
                  aria-pressed={verifyPolicy === 'v2'}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    verifyPolicy === 'v2'
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-[#f0b66a]'
                      : 'border-[#334563] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  Policy V2
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className={`rounded-lg border p-4 ${
                  verifyPolicy === 'v1'
                    ? 'border-emerald-500/45 bg-emerald-950/15'
                    : 'border-red-500/35 bg-red-950/15'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="text-[#f0b66a]">RECEIPT #101 (bound to V1)</span>
                  {verifyPolicy === 'v1' ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1">
                      <CheckCircle size={13} aria-hidden="true" /> MATCH
                    </span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center gap-1">
                      <AlertTriangle size={13} aria-hidden="true" /> MISMATCH
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs text-[#cbd5e1]">
                  &quot;policy_hash&quot;: &quot;hash_of_v1&quot;
                </div>
              </div>

              <div
                className={`rounded-lg border p-4 ${
                  verifyPolicy === 'v2'
                    ? 'border-emerald-500/45 bg-emerald-950/15'
                    : 'border-red-500/35 bg-red-950/15'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="text-[#f0b66a]">RECEIPT #102 (bound to V2)</span>
                  {verifyPolicy === 'v2' ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1">
                      <CheckCircle size={13} aria-hidden="true" /> MATCH
                    </span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center gap-1">
                      <AlertTriangle size={13} aria-hidden="true" /> Verification against V1 fails
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs text-[#cbd5e1]">
                  &quot;policy_hash&quot;: &quot;hash_of_v2&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident-as-Data */}
      <section className="py-20 border-b border-[#233047]">
        <div className="wrap max-w-5xl">
          <div className="text-center mb-10">
            <div className="eyebrow justify-center">Forensic Architecture</div>
            <h2 className="text-3xl font-semibold text-white mt-3 mb-2">Incident-as-Data</h2>
            <p className="text-sm text-[#94a3b8]">
              Every incident becomes structured forensic evidence—with an author and a receipt.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
            {incidentSteps.map((step) => {
              const selected = step.id === activeIncident;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIncident(step.id)}
                  aria-pressed={selected}
                  className={`rounded-lg border px-3 py-3 text-left font-mono text-xs transition-colors ${
                    selected
                      ? 'border-[#f0b66a] bg-[#d97706]/15 text-[#f0b66a]'
                      : 'border-[#233047] bg-[#121b2e]/70 text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/85 p-6">
            <div className="font-mono text-xs text-[#f0b66a] mb-1">{selectedIncident.label}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{selectedIncident.title}</h3>
            <p className="text-sm text-[#b2c0d4] m-0 leading-relaxed">{selectedIncident.detail}</p>
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
            {chronicleReceiptsFaq.map(({ question, answer }) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>

          <ArchitecturePager current="/chronicle-receipts" />
        </div>
      </section>
    </div>
  );
}
