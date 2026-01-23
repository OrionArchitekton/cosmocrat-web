'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  FileJson2,
  ShieldCheck,
  Key,
  RotateCcw,
  Lock,
  Terminal,
  History,
  CheckCircle,
  XCircle,
  Scale,
  Link as LinkIcon,
  RefreshCw,
  Fingerprint,
} from 'lucide-react';

// A single immutable receipt display component
const ImmutableReceipt = ({
  receipt,
  isNew,
}: {
  receipt: {
    hash: string;
    timestamp: string;
    action: string;
    status: string;
    policy: string;
    actor: string;
  };
  isNew?: boolean;
}) => {
  return (
    <div
      className={`
        bg-slate-900 border border-slate-700/50 rounded-lg p-5 
        font-mono text-xs transition-all duration-500 relative overflow-hidden
        ${isNew ? 'ring-2 ring-amber-500/50 shadow-[0_0_30px_rgba(217,119,6,0.2)]' : ''}
      `}
    >
      {/* Animated "NEW" Tag */}
      {isNew && (
        <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 px-2 py-0.5 font-bold text-[9px] rounded-bl uppercase tracking-wider animate-pulse">
          NEW
        </div>
      )}

      {/* Hash Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Lock size={12} className="text-amber-500" />
          <span className="text-slate-500">Receipt Hash</span>
        </div>
        <span className="text-amber-400 tracking-wider">{receipt.hash}</span>
      </div>

      {/* Data Fields */}
      <div className="space-y-2 text-slate-400">
        <div className="flex">
          <span className="w-24 text-slate-600 shrink-0">Timestamp</span>
          <span className="text-slate-300">{receipt.timestamp}</span>
        </div>
        <div className="flex">
          <span className="w-24 text-slate-600 shrink-0">Action</span>
          <span className="text-slate-200">{receipt.action}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-slate-600 shrink-0">Status</span>
          <span
            className={`flex items-center gap-1 ${
              receipt.status === 'APPROVED'
                ? 'text-green-400'
                : receipt.status === 'DENIED'
                  ? 'text-red-400'
                  : 'text-yellow-400'
            }`}
          >
            {receipt.status === 'APPROVED' && <CheckCircle size={12} />}
            {receipt.status === 'DENIED' && <XCircle size={12} />}
            {receipt.status === 'ESCALATED' && <RefreshCw size={12} />}
            {receipt.status}
          </span>
        </div>
        <div className="flex">
          <span className="w-24 text-slate-600 shrink-0">Policy</span>
          <span className="text-blue-300">{receipt.policy}</span>
        </div>
        <div className="flex">
          <span className="w-24 text-slate-600 shrink-0">Actor</span>
          <span className="text-purple-300">{receipt.actor}</span>
        </div>
      </div>

      {/* Immutability Badge */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-600">
        <Fingerprint size={10} />
        <span className="text-[10px] tracking-widest uppercase">Cryptographically Bound</span>
      </div>
    </div>
  );
};

export default function ChronicleReceiptsContent() {
  const [receipts, setReceipts] = useState([
    {
      hash: 'c0a9f3...2d7e',
      timestamp: 'T-120s',
      action: 'search_customer',
      status: 'APPROVED',
      policy: 'crm.read.any',
      actor: 'SupportBot-01',
    },
    {
      hash: 'b7e1a2...f9c4',
      timestamp: 'T-60s',
      action: 'draft_response',
      status: 'APPROVED',
      policy: 'comms.draft.l1',
      actor: 'SupportBot-01',
    },
  ]);
  const [tick, setTick] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate incoming receipts
  useEffect(() => {
    const newReceiptExamples = [
      {
        hash: 'a3c8d1...e5b7',
        timestamp: 'NOW',
        action: 'issue_refund',
        status: 'ESCALATED',
        policy: 'finance.refunds.l2',
        actor: 'SupportBot-01',
      },
      {
        hash: 'f2d9e8...1a6c',
        timestamp: 'NOW',
        action: 'approve_refund',
        status: 'APPROVED',
        policy: 'finance.refunds.l2',
        actor: 'Human:Orion',
      },
      {
        hash: 'd4b7c2...9f3e',
        timestamp: 'NOW',
        action: 'stripe.refunds.create',
        status: 'APPROVED',
        policy: 'tools.stripe.exec',
        actor: 'SupportBot-01',
      },
    ];

    const interval = setInterval(() => {
      setTick((prev) => {
        const nextTick = prev + 1;
        if (nextTick <= newReceiptExamples.length) {
          setReceipts((current) => [newReceiptExamples[nextTick - 1], ...current]);
        }
        return nextTick > newReceiptExamples.length + 2 ? 0 : nextTick; // Reset loop
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll on new receipt
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [receipts.length]);

  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans text-slate-200">
      {/* Add Component Styles */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .scan-line {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="ledger-lines"
              width="100"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="9" x2="100" y2="9" stroke="#334155" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ledger-lines)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-cosmo-accent mb-6 uppercase tracking-widest">
            <FileJson2 size={14} />
            Accountability Layer
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Chronicle Receipts.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            Cryptographic proofs that bind intent to execution. <br />
            Every authorized action leaves an immutable, replayable record.
          </p>
          <p className="text-lg text-amber-500 font-medium">
            Not a log. A legal record.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What are Chronicle Receipts?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Chronicle receipts are structured execution records that cryptographically bind an
              AI&apos;s intent, the evaluated policy, the authorization context, and the verifiable
              outcome of an action. They form the backbone of{' '}
              <Link
                href="/decision-exhaust"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Decision Exhaust
              </Link>
              .
            </p>
            <p>
              Generated at the final stage of the{' '}
              <Link
                href="/gate-system"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Gate System
              </Link>
              , each receipt includes: the action requested, the policy evaluated (and its version),
              the actor identity (bot or human), the authorization status, the hash of inputs, and
              the hash of outputs.
            </p>
            <p>
              Because receipts are hashed and optionally signed, they are tamper-evident. You can
              prove that a specific action was authorized by a specific policy version at a specific
              time—independent of any database state.
            </p>
            <p>
              This is essential for{' '}
              <Link
                href="/drift-guard"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Drift Guard
              </Link>
              , which relies on receipt integrity to detect behavioral changes over time.
            </p>
          </div>
        </div>
      </section>

      {/* Live Receipt Stream Visualization */}
      <section className="py-24 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Live Stream */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-xl font-bold text-white">Live Receipt Stream</h3>
            </div>
            <div
              ref={scrollRef}
              className="h-[500px] overflow-y-auto space-y-4 pr-2 custom-scrollbar"
            >
              {receipts.map((receipt, index) => (
                <ImmutableReceipt
                  key={`${receipt.hash}-${index}`}
                  receipt={receipt}
                  isNew={index === 0 && tick > 0}
                />
              ))}
            </div>
          </div>

          {/* Right: Explanation */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              The Audit Trail You Actually Need
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Traditional logs tell you what happened in your infrastructure. Chronicle receipts
              tell you why an AI decision was authorized—and prove it cryptographically.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg shrink-0">
                  <Lock className="text-amber-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Tamper-Evident</h4>
                  <p className="text-sm text-slate-400">
                    Each receipt is hashed. Any modification to the record is detectable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg shrink-0">
                  <LinkIcon className="text-amber-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Causally Linked</h4>
                  <p className="text-sm text-slate-400">
                    Receipts chain to their predecessors. You can trace the full decision path.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg shrink-0">
                  <RotateCcw className="text-amber-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Replayable</h4>
                  <p className="text-sm text-slate-400">
                    Given a receipt, you can reconstruct the exact inputs and policy state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Anatomy of a Receipt */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Anatomy of a Receipt</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every governed action produces a structured execution record.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-700 rounded-xl p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px]"></div>

          {/* Receipt Structure */}
          <div className="relative z-10 font-mono text-sm space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 text-slate-500">
              <Terminal size={16} />
              <span>cosmocrat.chronicle.receipt.v1</span>
            </div>

            {/* Fields with explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Identity
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div>receipt_id: &quot;rc_7f8g9h...&quot;</div>
                    <div>parent_id: &quot;rc_6e7f8g...&quot;</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Unique ID + causal chain link to prior receipt.
                  </p>
                </div>
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Action
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div>action: &quot;stripe.refunds.create&quot;</div>
                    <div>input_hash: &quot;sha256:a3b4c5...&quot;</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    The requested action and the hash of its inputs.
                  </p>
                </div>
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Policy
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div>policy_id: &quot;finance.refunds.l1&quot;</div>
                    <div>policy_version: &quot;2.4.1&quot;</div>
                    <div>policy_hash: &quot;sha256:d4e5f6...&quot;</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    The specific policy version that evaluated the action.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Actor
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div>actor_type: &quot;agent&quot;</div>
                    <div>actor_id: &quot;SupportBot-01&quot;</div>
                    <div>authority_level: &quot;L1&quot;</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Who or what requested the action, and their clearance.
                  </p>
                </div>
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Decision
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div className="text-green-400">status: &quot;APPROVED&quot;</div>
                    <div>gates_passed: [&quot;G0&quot;...&quot;G6&quot;]</div>
                    <div>human_auth_required: false</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    The outcome of the Gate System evaluation.
                  </p>
                </div>
                <div>
                  <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    Proof
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
                    <div>receipt_hash: &quot;sha256:9d7e8f...&quot;</div>
                    <div>signature: &quot;sig:...&quot;</div>
                    <div>timestamp: &quot;2026-01-18T05:12:44Z&quot;</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Cryptographic binding of all receipt data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases: Why Receipts Matter */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Receipts Matter</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From compliance audits to debugging failures, receipts are your source of truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Audit */}
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
              <div className="p-4 bg-slate-800 rounded-lg w-fit mb-6">
                <Scale size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Compliance & Audit</h3>
              <p className="text-slate-400 text-sm">
                Regulators ask: &quot;Why did the AI do this?&quot; You hand them the receipt.
                Policy version, actor, authorization—all cryptographically bound.
              </p>
            </div>

            {/* Forensics */}
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
              <div className="p-4 bg-slate-800 rounded-lg w-fit mb-6">
                <History size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Incident Forensics</h3>
              <p className="text-slate-400 text-sm">
                When something goes wrong, receipts let you trace the exact decision chain. No
                guessing, no log archaeology.
              </p>
            </div>

            {/* Replay */}
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
              <div className="p-4 bg-slate-800 rounded-lg w-fit mb-6">
                <RotateCcw size={28} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Replay & Rollback</h3>
              <p className="text-slate-400 text-sm">
                Given a receipt, you can reconstruct the exact inputs and re-run the decision under
                a new policy. Perfect for &quot;what-if&quot; analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-2">
              <FaqItem
                question="Are receipts the same as logs?"
                answer="No. Logs are mutable, unstructured system events. Receipts are immutable, structured governance records that bind intent to outcome with cryptographic proof."
              />
              <FaqItem
                question="Where are receipts stored?"
                answer="Receipts are stored in the Chronicle—a dedicated, append-only datastore designed for governance records. It can be backed by ClickHouse, Postgres, or other durable stores."
              />
              <FaqItem
                question="Can I query receipts?"
                answer="Yes. The Chronicle supports queries by action, actor, policy, time range, status, and causal chain (parent_id). You can reconstruct the full history of any decision path."
              />
              <FaqItem
                question="What happens if a receipt is tampered with?"
                answer="Receipts are hashed and optionally signed. Tampering breaks the hash chain, which is immediately detectable. The system can be configured to halt if integrity is compromised."
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
              Related Platform Concepts
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/memory-infrastructure"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Memory as Infrastructure
              </Link>
              <Link
                href="/decision-exhaust"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Decision Exhaust
              </Link>
              <Link
                href="/runtime-governance"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Runtime Governance
              </Link>
              <Link
                href="/gate-system"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Gate System
              </Link>
              <Link
                href="/drift-guard"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Drift Guard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
