'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Shield,
  Lock,
  AlertTriangle,
  History,
  Fingerprint,
  Search,
  Database,
  Box,
  Wrench,
  Activity,
  GitCommit,
  CheckCircle,
  Cpu,
  Network,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <h3 className="text-base font-medium text-slate-300 group-hover:text-amber-500 transition-colors">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="text-slate-500" size={16} />
        ) : (
          <ChevronDown className="text-slate-500" size={16} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-slate-400 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

export default function ChronicleReceiptsContent() {
  return (
    <div className="bg-[#0B1120] min-h-screen pb-24 font-sans selection:bg-amber-500/30">
      {/* Custom Styles */}
      <style>{`
        .bronze-text {
          background: linear-gradient(to right, #fcd34d, #fbbf24, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .receipt-card {
           background: rgba(15, 23, 42, 0.6);
           border: 1px solid rgba(217, 119, 6, 0.2);
           box-shadow: 0 0 20px rgba(0,0,0,0.2);
           backdrop-filter: blur(10px);
        }
        .receipt-module {
          background: linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.8) 100%);
          border: 1px solid rgba(217,119,6,0.3);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .blueprint-grid {
           background-image: 
              linear-gradient(rgba(30, 41, 59, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 41, 59, 0.3) 1px, transparent 1px);
           background-size: 40px 40px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes flow-dash {
          to { stroke-dashoffset: -24; }
        }
        .animate-flow-dash {
          stroke-dasharray: 6 6;
          animation: flow-dash 1s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.3); }
          50% { box-shadow: 0 0 25px rgba(217,119,6,0.3); border-color: rgba(217,119,6,0.6); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite;
        }
      `}</style>

      {/* Hero Section: The Canonical Rule */}
      <div className="pt-32 pb-24 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(217,119,6,0.2)]">
            The Canonical Rule
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
            If it is not receipted in the Chronicle, <br />
            <span className="bronze-text drop-shadow-sm">it did not happen.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The Chronicle Registry is an append-only, tamper-evident ledger. <br />
            It converts &quot;trust us&quot; into &quot;verify this&quot;.
          </p>

          <p className="mt-8 text-lg text-amber-500 font-medium max-w-4xl mx-auto">
            Chronicle Receipts are cryptographically bound records that prove who authorized an
            action, under which policy, and why it was allowed to occur.
          </p>
        </div>
      </div>

      {/* 1.5 Definition Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What are Chronicle Receipts?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Chronicle Receipts form the append-only, tamper-evident authority ledger of the
              Cosmocrat OS. While logs track mutable system events, receipts are generated
              specifically for decisions. They bind policy, authority, context, and outcome into a
              single cryptographic proof.
            </p>
            <p>
              This establishes the admissible &quot;why&quot; behind an action. By anchoring into{' '}
              <Link
                href="/runtime-governance"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Runtime Governance
              </Link>
              , receipts prove that the{' '}
              <Link
                href="/gate-system"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Gate System
              </Link>{' '}
              explicitly authorized the state transition.
            </p>
            <p>
              It serves as the immutable truth for{' '}
              <Link
                href="/decision-exhaust"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Decision Exhaust
              </Link>
              , providing the foundational evidence that{' '}
              <Link
                href="/drift-guard"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Drift Guard
              </Link>{' '}
              relies on to detect divergence over time.
            </p>
          </div>
        </div>
      </section>

      {/* Section: The Trust Gap (Logs vs Receipts) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">The Trust Gap</h2>
          <p className="text-slate-400">Logs tell stories. Receipts establish facts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
          {/* Divider Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800"></div>

          {/* Left: Standard AI Log */}
          <div>
            <h3 className="text-xl font-bold text-slate-400 mb-8 flex items-center gap-2">
              <FileText className="text-slate-500" /> Standard AI: The Log
            </h3>
            <div className="bg-[#0f1219] p-6 rounded border border-slate-800 font-mono text-xs text-slate-500 leading-loose opacity-70">
              <p>INFO: User123 accessed resource X at 10:45:22 UTC</p>
              <p className="text-red-900/50">ERROR: Connection timeout for service Y</p>
              <p>DEBUG: Payload content size 2048 bytes</p>
              <p>WARNING: Potential security policy violation detected...</p>
              <p>INFO: User123 accessed resource X (duplicate)</p>
              <p className="blur-[1px]">... log rotation ...</p>
            </div>
            <ul className="mt-8 space-y-4 text-slate-500">
              <li className="flex items-center gap-3">
                <AlertTriangle size={16} /> Mutable (Can be edited/deleted)
              </li>
              <li className="flex items-center gap-3">
                <AlertTriangle size={16} /> Reactive (Written after the fact)
              </li>
              <li className="flex items-center gap-3">
                <AlertTriangle size={16} /> Unstructured text
              </li>
              <li className="mt-4 pt-4 border-t border-slate-800 font-bold text-slate-400">
                Answers: &quot;What happened?&quot;
              </li>
            </ul>
          </div>

          {/* Right: Cosmocrat Receipt */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Shield className="text-amber-500" /> Cosmocrat: The Chronicle
            </h3>

            <div className="relative space-y-4">
              {/* Chain links */}
              <div className="absolute left-6 top-4 bottom-4 w-1 bg-amber-900/20 flex flex-col items-center justify-between py-2">
                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
              </div>

              {/* Receipt Card 1 */}
              <div className="ml-12 receipt-card p-4 rounded-lg relative">
                <div className="absolute -left-[1.65rem] top-1/2 -translate-y-1/2 w-4 h-1 bg-amber-600"></div>
                <div className="text-[10px] text-amber-500 font-bold mb-2 flex justify-between">
                  <span>BLOCK 20A8</span>
                  <span>PREV: 0x4A20...</span>
                </div>
                <div className="font-mono text-xs text-slate-300">
                  <div>TX_ID: tx-c8d7e6f5</div>
                  <div>POLICY: finance_l1_v2 (hash: 0x9c88)</div>
                  <div className="text-green-400">STATE_TRANSITION: Approved</div>
                </div>
              </div>

              {/* Receipt Card 2 */}
              <div className="ml-12 receipt-card p-4 rounded-lg relative border-amber-500/50 shadow-[0_0_15px_rgba(217,119,6,0.15)] animate-pulse-glow">
                <div className="absolute -left-[1.65rem] top-1/2 -translate-y-1/2 w-4 h-1 bg-amber-600"></div>
                <div className="text-[10px] text-amber-500 font-bold mb-2 flex justify-between">
                  <span>BLOCK 20A9</span>
                  <span>PREV: 0x8a92...</span>
                </div>
                <div className="font-mono text-xs text-white">
                  <div>TX_ID: tx-b9a0f1e2</div>
                  <div>ACTOR: authorized_agent_01</div>
                  <div>PROOF: &apos;signature&apos;: &apos;0x1F2E...&apos;</div>
                  <div className="text-green-400">STATE_TRANSITION: Verified</div>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <Lock size={16} className="text-amber-500" /> Immutable & Append-Only
              </li>
              <li className="flex items-center gap-3">
                <Shield size={16} className="text-amber-500" /> Proactive (Required for state
                change)
              </li>
              <li className="flex items-center gap-3">
                <Fingerprint size={16} className="text-amber-500" /> Cryptographic Proof
              </li>
              <li className="mt-4 pt-4 border-t border-slate-800 font-bold text-white">
                Answers: &quot;Why was it authorized?&quot;
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400 text-lg font-medium">
            Receipts make AI actions non-repudiable — they cannot be denied, rewritten, or detached
            from authority.
          </p>
        </div>
      </section>

      {/* Section: Anatomy of a Receipt */}
      <section className="py-32 bg-[#080a0f] border-b border-slate-900 relative overflow-hidden">
        {/* Blueprint Background */}
        <div className="absolute inset-0 blueprint-grid opacity-20"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-20 text-center">
            The Anatomy of a Receipt
          </h2>

          <div className="relative flex flex-col items-center max-w-4xl mx-auto">
            {/* SVG Connections Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <marker
                  id="arrow-amber"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
                </marker>
              </defs>

              {/* Path from Header to Split point */}
              <path d="M 50% 120 L 50% 160" stroke="#334155" strokeWidth="2" />

              {/* Split to Binding (Left) and Governance (Right) */}
              <path
                d="M 50% 160 L 25% 160 L 25% 200"
                stroke="#334155"
                strokeWidth="2"
                fill="none"
                className="md:block hidden"
              />
              <path
                d="M 50% 160 L 75% 160 L 75% 200"
                stroke="#334155"
                strokeWidth="2"
                fill="none"
                className="md:block hidden"
              />

              {/* Animated Flow on Split */}
              <path
                d="M 50% 160 L 25% 160 L 25% 200"
                stroke="#d97706"
                strokeWidth="2"
                fill="none"
                className="animate-flow-dash md:block hidden opacity-60"
              />
              <path
                d="M 50% 160 L 75% 160 L 75% 200"
                stroke="#d97706"
                strokeWidth="2"
                fill="none"
                className="animate-flow-dash md:block hidden opacity-60"
              />

              {/* Merge from Binding/Governance to Proof */}
              <path
                d="M 25% 450 L 25% 490 L 50% 490 L 50% 530"
                stroke="#334155"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow-amber)"
              />
              <path
                d="M 75% 450 L 75% 490 L 50% 490"
                stroke="#334155"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* 1. Header (Top) */}
            <div className="w-full max-w-lg mb-20 relative group z-10">
              <div className="receipt-module p-0.5 rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-700">
                <div className="bg-[#0B1120] rounded-[10px] p-6 relative overflow-hidden group-hover:bg-[#111827] transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Fingerprint size={64} className="text-amber-500" />
                  </div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">
                        01
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-widest">
                        Header
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">RX-ID: 9f887d0c</div>
                  </div>
                  <div className="font-mono text-xs text-slate-400 grid grid-cols-2 gap-y-2">
                    <span className="text-slate-600">Timestamp:</span>{' '}
                    <span className="text-right text-slate-300">2026-05-12T08:42:00Z</span>
                    <span className="text-slate-600">Origin:</span>{' '}
                    <span className="text-right text-slate-300">us-east-1a</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Binding & Governance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10 mb-20">
              {/* 2. Binding */}
              <div className="receipt-module p-0.5 rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-700 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-[#0B1120] rounded-[10px] p-6 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Box size={64} className="text-blue-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                      02
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      Binding
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-400 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Lane ID</span>
                      <span className="text-blue-300">enterprise_legal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Context Hash</span>
                      <span className="text-slate-300">0x7f8a91...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Governance */}
              <div className="receipt-module p-0.5 rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-700 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-[#0B1120] rounded-[10px] p-6 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield size={64} className="text-red-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs">
                      03
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      Governance
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-400 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Policy Hash</span>
                      <span className="text-red-300">0x9b2c...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Authority</span>
                      <span className="text-slate-300">[&quot;read_sensitive&quot;]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Causality (Bottom) */}
            <div className="w-full max-w-lg relative z-10">
              <div className="receipt-module p-0.5 rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-700 shadow-[0_0_30px_rgba(217,119,6,0.1)]">
                <div className="bg-[#0B1120] rounded-[10px] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <GitCommit size={64} className="text-green-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs">
                      04
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      Proof
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-400 space-y-4">
                    <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-3 rounded border border-slate-800/50">
                      <div>
                        <div className="text-slate-600 text-[10px] uppercase mb-1">Input Refs</div>
                        <div className="text-slate-300 truncate">[&quot;0xAA3B...&quot;]</div>
                      </div>
                      <div>
                        <div className="text-slate-600 text-[10px] uppercase mb-1">Output Refs</div>
                        <div className="text-slate-300 truncate">[&quot;0xFE71...&quot;]</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50">
                      <div className="text-slate-600 text-[10px] uppercase mb-1">
                        Cryptographic Signature
                      </div>
                      <div className="text-green-400 break-all font-bold">
                        0x1F2E998877AA66BB55CC...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-slate-400 text-xs italic">
              &quot;Every receipt captures the admissibility of the action at that specific
              microsecond.&quot;
            </div>
          </div>
        </div>
      </section>

      {/* Section: Policy Binding / Immutable Why */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-amber-500 font-bold text-sm mb-2 uppercase tracking-wider">
              Policy Binding
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">The Immutable &quot;Why&quot;</h2>
            <p className="text-lg text-slate-400 mb-6">
              In standard systems, policies change, but old logs don&apos;t update. This creates
              &quot;Policy Drift&quot;—you can&apos;t prove <em>why</em> an action was allowed last
              month if the rules changed today.
            </p>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <History size={18} className="text-amber-500" /> Key Insight
              </h4>
              <p className="text-sm text-slate-400">
                Cosmocrat receipts stamp every action with the{' '}
                <code className="text-amber-500">policy_hash</code> active at that moment.
                <br />
                <br />
                <strong>Result:</strong> No retroactive rule changes. No silent amendments. Perfect
                historical replayability.
              </p>
            </div>
          </div>

          <div className="relative bg-slate-900 rounded-xl p-8 border border-slate-800">
            {/* Timeline Visual */}
            <div className="absolute top-8 left-8 bottom-8 w-1 bg-slate-700"></div>

            {/* V1 */}
            <div className="relative pl-12 mb-12">
              <div className="absolute left-6 top-0 w-4 h-4 rounded-full bg-slate-500 -translate-x-1/2"></div>
              <div className="bg-slate-800 p-3 rounded border border-slate-700 text-xs text-slate-400 mb-2 w-24 text-center">
                Policy V1
              </div>

              {/* Receipt Linked to V1 */}
              <div className="receipt-card p-4 rounded ml-4 border-l-4 border-l-amber-500">
                <div className="text-[10px] text-amber-500 font-bold">RECEIPT #101</div>
                <div className="font-mono text-xs text-slate-300 mt-1">
                  &quot;policy_hash&quot;: &quot;hash_of_v1&quot;{' '}
                  <span className="text-green-400">✓ MATCH</span>
                </div>
              </div>
            </div>

            {/* V2 */}
            <div className="relative pl-12">
              <div className="absolute left-6 top-0 w-4 h-4 rounded-full bg-amber-500 -translate-x-1/2 shadow-[0_0_10px_#d97706]"></div>
              <div className="bg-amber-900/30 p-3 rounded border border-amber-500/50 text-xs text-amber-500 mb-2 w-24 text-center">
                Policy V2
              </div>

              {/* Receipt Linked to V2 */}
              <div className="receipt-card p-4 rounded ml-4 border-l-4 border-l-amber-500">
                <div className="text-[10px] text-amber-500 font-bold">RECEIPT #102</div>
                <div className="font-mono text-xs text-slate-300 mt-1">
                  &quot;policy_hash&quot;: &quot;hash_of_v2&quot;{' '}
                  <span className="text-green-400">✓ MATCH</span>
                </div>
              </div>

              {/* Mismatch Visual */}
              <div className="mt-4 ml-4 p-3 bg-red-900/10 border border-red-900/30 rounded flex items-center gap-3">
                <AlertTriangle size={16} className="text-red-500" />
                <div className="text-xs text-red-400">Verification against V1 fails.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Incident as Data (Forensic Architecture) */}
      <section className="py-24 bg-[#080a0f] border-t border-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 blueprint-grid opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] mb-4">
            Forensic Architecture
          </div>
          <h2 className="text-4xl font-bold text-white mb-20">Incident-as-Data</h2>

          {/* Complex Radial Visualization */}
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto mb-16 flex items-center justify-center">
            {/* 1. Orbit Ring (Animated) */}
            <div className="absolute inset-0 border border-slate-700/50 rounded-full animate-spin-slow">
              {/* Nodes on the ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B1120] p-2 border border-slate-600 rounded">
                <Search size={16} className="text-slate-400" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0B1120] p-2 border border-slate-600 rounded">
                <Wrench size={16} className="text-slate-400" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#0B1120] p-2 border border-slate-600 rounded">
                <Activity size={16} className="text-slate-400" />
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#0B1120] p-2 border border-slate-600 rounded">
                <Box size={16} className="text-slate-400" />
              </div>
            </div>

            {/* 2. Inner Cog (Animated Reverse) */}
            <div
              className="absolute w-2/3 h-2/3 border-2 border-dashed border-amber-900/30 rounded-full animate-spin-slow"
              style={{ animationDirection: 'reverse', animationDuration: '30s' }}
            ></div>

            {/* 3. Central Core (Future Strength) */}
            <div className="relative w-48 h-48 bg-[#0f172a] rounded-full border-2 border-amber-500 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(217,119,6,0.2)] z-10 animate-pulse-glow">
              <Cpu size={48} className="text-amber-500 mb-2" />
              <div className="text-amber-500 font-bold text-lg uppercase tracking-wider">Future</div>
              <div className="text-amber-500 font-bold text-lg uppercase tracking-wider">
                Strength
              </div>
            </div>

            {/* Labels (Absolute Positioning relative to container) */}
            {/* Top */}
            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 text-center">
              <div className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs text-white rounded font-bold uppercase tracking-wider mb-1">
                Detect
              </div>
            </div>
            {/* Right Top */}
            <div className="absolute top-[20%] right-[-10%] md:right-[-2rem] text-left">
              <div className="px-3 py-1 bg-amber-900/20 border border-amber-600 text-xs text-amber-500 rounded font-bold uppercase tracking-wider mb-1">
                Record
              </div>
              <div className="text-[10px] text-slate-500">(Receipt)</div>
            </div>
            {/* Right Bottom */}
            <div className="absolute bottom-[20%] right-[-10%] md:right-[-2rem] text-left">
              <div className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs text-white rounded font-bold uppercase tracking-wider mb-1">
                Contain
              </div>
            </div>
            {/* Bottom */}
            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-center">
              <div className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs text-white rounded font-bold uppercase tracking-wider mb-1">
                Remediate
              </div>
            </div>
            {/* Left */}
            <div className="absolute top-1/2 left-[-15%] md:left-[-3rem] -translate-y-1/2 text-right">
              <div className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs text-white rounded font-bold uppercase tracking-wider mb-1">
                Ratify
              </div>
            </div>

            {/* Connecting Arrows (SVG overlay) */}
            <svg
              className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none"
              viewBox="0 0 100 100"
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#475569" />
                </marker>
              </defs>
              {/* Curved paths representing the cycle */}
              <path
                d="M 50 10 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 90 50 A 40 40 0 0 1 50 90"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 50 90 A 40 40 0 0 1 10 50"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 50 10"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
                markerEnd="url(#arrow)"
              />
            </svg>
          </div>

          <p className="mt-8 text-xl text-slate-300 italic">
            &quot;Every incident becomes future strength—with an author and a receipt.&quot;
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FaqItem
              question="How is a receipt different from a system log?"
              answer="A log records that something happened. A receipt records *why* it was allowed. Receipts bind the policy hash, authority context, and input state to the outcome, making the action non-repudiable."
            />
            <FaqItem
              question="Are receipts stored on a blockchain?"
              answer="No. They use cryptographic chaining (Merkle trees) for tamper-evidence but are stored in your own high-performance data infrastructure (e.g., S3, ClickHouse) for speed and privacy."
            />
            <FaqItem
              question="Can I replay a receipt?"
              answer="Yes. Because the receipt captures the full state context (inputs + memory snapshot + policy), you can replay the decision path to debug or audit the AI's reasoning."
            />
            <FaqItem
              question="What format are receipts in?"
              answer="Receipts are generated in a standardized, machine-readable JSON format, allowing for automated auditing and integration with compliance tools."
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
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
