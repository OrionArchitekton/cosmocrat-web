'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ShieldAlert,
  FileCode,
  Lock,
  BrainCircuit,
  Anchor,
  AlertOctagon,
  Eye,
  LayoutGrid,
  Settings,
  Filter,
  Aperture,
  CheckCircle2,
  XCircle,
  Share2,
  Database,
  Zap,
  Scale,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
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
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-slate-400 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}

export default function DriftGuardContent() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans selection:bg-amber-500/30">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmo-dark">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>
          <Settings
            size={600}
            strokeWidth={0.5}
            className="absolute -top-24 -right-24 text-slate-800/20 animate-[spin_20s_linear_infinite]"
          />
          <Settings
            size={400}
            strokeWidth={0.5}
            className="absolute top-48 -left-24 text-slate-800/20 animate-[spin_25s_linear_infinite_reverse]"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest shadow-lg shadow-amber-900/10">
            <ShieldAlert size={14} className="text-amber-500" />
            Runtime Integrity
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Failures are loud.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-cosmo-accent drop-shadow-sm">
              Drift is quiet.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            System behavior, memory, policy, and authority tend to silently diverge over time.
            Drift Guard exists to hear the quiet before it becomes a failure.
          </p>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-amber-500/90 font-medium">
              Drift Guard continuously detects and halts divergence between authorized intent and
              actual AI behavior over time.
            </p>
          </div>
        </div>
      </section>

      {/* Definition Block */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is Drift Guard?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Drift Guard is the continuous integrity layer of the Cosmocrat operating system. While
              the{' '}
              <Link
                href="/gate-system"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Gate System
              </Link>{' '}
              authorizes individual actions at a point in time, Drift Guard ensures that system
              behavior does not diverge from what was authorized, proved, or intended as the system
              evolves.
            </p>
            <p className="text-slate-300 font-medium">
              Drift emerges across time and state transitions — not within a single execution.
            </p>
            <p>
              It spans five critical domains: behavior, memory, policy, authority, and structure.
              Unlike monitoring tools that look for crashes, Drift Guard detects divergence from
              authorized behavior even when the system appears to be functioning normally.
            </p>
          </div>
        </div>
      </section>

      {/* Divergence Visual */}
      <section className="py-24 bg-slate-950 border-b border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              Are we still doing what we proved we were doing?
            </h2>
            <p className="text-slate-500">
              Monitoring asks: &quot;Is something wrong?&quot; — Drift Guard asks: &quot;Is this
              still authorized?&quot;
            </p>
          </div>

          <div className="relative h-64 md:h-80 w-full max-w-5xl mx-auto border border-slate-800 rounded-xl bg-[#080a0f] flex items-center justify-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>

            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              <defs>
                <marker id="arrow-white" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#ffffff" />
                </marker>
                <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                </marker>
              </defs>

              <line
                x1="0"
                y1="150"
                x2="800"
                y2="150"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d="M 50 150 L 750 150"
                stroke="#fff"
                strokeWidth="3"
                markerEnd="url(#arrow-white)"
                className="opacity-80"
              />
              <text
                x="350"
                y="130"
                fill="white"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                letterSpacing="1px"
                className="uppercase font-mono"
              >
                Authorized Intent
              </text>

              <path
                d="M 50 150 Q 400 150 750 250"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
                markerEnd="url(#arrow-red)"
              />
              <text
                x="600"
                y="270"
                fill="#ef4444"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                letterSpacing="1px"
                className="uppercase font-mono"
              >
                Silent Drift
              </text>

              <g transform="translate(350, 150)">
                <circle r="4" fill="#d97706" className="animate-pulse" />
                <circle
                  r="12"
                  stroke="#d97706"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                  className="animate-ping"
                />
              </g>
            </svg>

            <div className="absolute left-4 top-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded text-xs text-slate-300 z-10 font-mono">
              <div className="text-[10px] text-slate-500 uppercase">Status</div>
              <div>MONITORING ACTIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Domains of Drift */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cosmo-dark to-[#080a0f]">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">The Five Domains of Drift</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Drift is not just &quot;hallucination.&quot; It is structural decay across five specific
            vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Activity,
              title: 'Behavioral Drift',
              desc: 'Same inputs, different actions. Model behavior shifts over time without code changes.',
            },
            {
              icon: FileCode,
              title: 'Policy Drift',
              desc: 'Rules changed without proper promotion. Silent rule modifications.',
            },
            {
              icon: LayoutGrid,
              title: 'Structural Drift',
              desc: 'Chronicle events missing. Broken audit trails and incomplete records.',
            },
            {
              icon: Anchor,
              title: 'Authority Drift',
              desc: 'Action taken with implicit permission. Permission creep over time.',
            },
            {
              icon: BrainCircuit,
              title: 'Context Drift',
              desc: 'Wrong memory influenced decision. Memory pollution across lanes.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 flex items-start gap-4 hover:border-cosmo-accent/50 transition-colors"
            >
              <item.icon className="text-amber-500 shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Response */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Active Response: The Fail-Closed Doctrine
          </h2>
          <p className="text-slate-400">
            Drift is treated as a governance event, not an ops anomaly. The system does not
            &quot;fix it live.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0f1219] border border-slate-800 p-0 rounded-lg hover:border-blue-500 transition-all group overflow-hidden relative">
            <div className="h-1 w-full bg-blue-500 absolute top-0"></div>
            <div className="p-8">
              <div className="text-blue-500 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Eye size={16} /> Response A
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                Degrade to SHADOW
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Observe-only mode. The action is executed in a sandbox, outputs are discarded, drift
                is logged.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">MODE: OBSERVE</span>
              <Activity size={14} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-[#0f1219] border border-slate-800 p-0 rounded-lg hover:border-amber-500 transition-all group overflow-hidden relative transform md:-translate-y-4 shadow-xl">
            <div className="h-1 w-full bg-amber-500 absolute top-0"></div>
            <div className="p-8">
              <div className="text-amber-500 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Scale size={16} /> Response B
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                Quarantine Lane
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Prevent contamination. The Lane is locked; no new memory can be written, no external
                tools called.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">MODE: ISOLATE</span>
              <Lock size={14} className="text-amber-500" />
            </div>
          </div>

          <div className="bg-[#0f1219] border border-slate-800 p-0 rounded-lg hover:border-red-500 transition-all group overflow-hidden relative">
            <div className="h-1 w-full bg-red-500 absolute top-0"></div>
            <div className="p-8">
              <div className="text-red-500 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Lock size={16} /> Response C
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                Halt & Require G4
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Human re-authorization required. The system stops and demands explicit authority to
                proceed.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">MODE: HALT</span>
              <XCircle size={14} className="text-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance is Evidence */}
      <section className="py-24 bg-[#050505] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Compliance is Evidence, Not Narrative
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Trust is the product. Receipts are the proof. Drift Guard provides the artifacts that
              prove control was maintained.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-sm flex items-center gap-2">
                <FileCode size={14} className="text-red-500" /> DRIFT_DETECTED
              </div>
              <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-sm flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-500" /> DRIFT_ACKED
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-amber-900/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#0f1219] rounded-lg border border-slate-800 p-6 shadow-2xl font-mono text-sm overflow-hidden">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-slate-600">audit_log_v2.json</div>
              </div>
              <div className="text-slate-300 space-y-1 text-xs">
                <div>
                  <span className="text-purple-400">let</span> event ={' '}
                  <span className="text-yellow-300">{'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;event&quot;</span>:{' '}
                  <span className="text-green-400">&quot;DRIFT_DETECTED&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;invariant_violated&quot;</span>:{' '}
                  <span className="text-green-400">&quot;policy_hash_mismatch&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;lane_id&quot;</span>:{' '}
                  <span className="text-green-400">&quot;finance_ops&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;action_taken&quot;</span>:{' '}
                  <span className="text-red-400">&quot;HALT_G4_REQUIRED&quot;</span>,
                </div>
                <div>
                  <span className="text-yellow-300">{'}'}</span>;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FaqItem
              question="How does Drift Guard differ from observability?"
              answer="Observability shows you metrics (latency, errors). Drift Guard detects semantic divergence—when the AI starts doing things it wasn't authorized to do, even if it's not throwing errors."
            />
            <FaqItem
              question="What is 'Behavioral Drift'?"
              answer="It's when an agent's response patterns shift over time—for example, becoming more aggressive, less concise, or hallucinating facts—without any code changes."
            />
            <FaqItem
              question="Can Drift Guard automatically fix the AI?"
              answer="It defaults to 'Halt & Require G4' (Human Authorization). Auto-correction is risky; we prefer to stop the drift and let a human ratify the new behavior or roll back."
            />
            <FaqItem
              question="Does it work on non-deterministic models?"
              answer="Yes. Drift Guard governs the boundaries and outcomes (the 'what' and 'how'), not just the raw text output, ensuring safety regardless of model variance."
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
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
              href="/chronicle-receipts"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Chronicle Receipts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
