'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ShieldAlert,
  Lock,
  BrainCircuit,
  Anchor,
  AlertOctagon,
  Eye,
  FileCode,
  Zap,
  LayoutGrid,
  Settings,
  Filter,
  Aperture,
  CheckCircle2,
  XCircle,
  Share2,
  Database,
  Scale,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const FaqItem: React.FC<{ question: string; answer: React.ReactNode }> = ({
  question,
  answer,
}) => {
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

export default function DriftGuardContent() {
  return (
    <div className="bg-[#0B1120] min-h-screen pb-24 font-sans selection:bg-amber-500/30">
      <style>{`
        .bronze-text {
          background: linear-gradient(to right, #fcd34d, #fbbf24, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .drift-grid-bg {
           background-image: 
              linear-gradient(rgba(217, 119, 6, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(217, 119, 6, 0.05) 1px, transparent 1px);
           background-size: 50px 50px;
        }
        .circuit-bg {
           background-image: radial-gradient(rgba(51, 65, 85, 0.2) 1px, transparent 1px);
           background-size: 20px 20px;
        }
        @keyframes diverge {
           0% { stroke-dashoffset: 1000; opacity: 0; }
           20% { opacity: 1; }
           100% { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-diverge {
           stroke-dasharray: 1000;
           animation: diverge 4s ease-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
           animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
           animation: spin-slow 25s linear infinite reverse;
        }
        @keyframes particle-flow {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(180px); opacity: 0; }
        }
        .particle {
           animation: particle-flow 2s linear infinite;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.5s; }
        .delay-3 { animation-delay: 0.9s; }
        .delay-4 { animation-delay: 1.4s; }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: wave 4s linear infinite;
        }
        @keyframes mesh-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .mesh-line {
          animation: mesh-pulse 3s ease-in-out infinite;
        }
         @keyframes flow-dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-flow-dash {
          stroke-dasharray: 5;
          animation: flow-dash 1s linear infinite;
        }
        @keyframes laser-scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-laser {
          animation: laser-scan 2s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Hero: Failures are Loud. Drift is Quiet. */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>
          {/* Abstract Gear Background */}
          <Settings
            size={600}
            strokeWidth={0.5}
            className="absolute -top-24 -right-24 text-slate-800/20 animate-spin-slow"
          />
          <Settings
            size={400}
            strokeWidth={0.5}
            className="absolute top-48 -left-24 text-slate-800/20 animate-spin-reverse-slow"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest shadow-lg shadow-amber-900/10">
            <ShieldAlert size={14} className="text-amber-500" />
            Runtime Integrity
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Failures are loud. <br />
            <span className="bronze-text drop-shadow-sm">Drift is quiet.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            System behavior, memory, policy, and authority tend to silently diverge over time.
            Drift Guard exists to hear the quiet before it becomes a failure.
          </p>

          {/* Canonical Definition Sentence */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-amber-500/90 font-medium">
              Drift Guard continuously detects and halts divergence between authorized intent and
              actual AI behavior over time.
            </p>
          </div>
        </div>
      </section>

      {/* 1.5 Definition Block (SEO Spine) */}
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
            <p>
              When divergence is detected, it enforces corrective action by default. This generates{' '}
              <Link
                href="/decision-exhaust"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Decision Exhaust
              </Link>{' '}
              to document the event and informs the{' '}
              <Link
                href="/runtime-governance"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Runtime Governance
              </Link>{' '}
              kernel to tighten future enforcement.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Divergence Visual */}
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
            <div className="absolute inset-0 drift-grid-bg opacity-30"></div>

            {/* Mechanical Caliper Overlay (Visual Decoration) */}
            <div className="absolute top-0 bottom-0 left-1/4 border-l border-slate-800 border-dashed opacity-50"></div>
            <div className="absolute top-0 bottom-0 right-1/4 border-r border-slate-800 border-dashed opacity-50"></div>

            {/* Divergence Animation */}
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
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Authorized Intent (Straight Line) */}
              <line x1="0" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              <path
                d="M 50 150 L 750 150"
                stroke="#fff"
                strokeWidth="3"
                markerEnd="url(#arrow-white)"
                className="opacity-80"
                filter="url(#glow)"
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

              {/* AI Behavior (Drifting Line) */}
              <path
                d="M 50 150 Q 400 150 750 250"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
                markerEnd="url(#arrow-red)"
                className="animate-diverge"
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

              {/* Spark/Correction Point */}
              <g transform="translate(350, 150)">
                <circle r="4" fill="#d97706" className="animate-pulse" />
                <circle r="12" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.5" className="animate-ping" />
              </g>
            </svg>

            {/* Labels */}
            <div className="absolute left-4 top-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded text-xs text-slate-300 z-10 font-mono">
              <div className="text-[10px] text-slate-500 uppercase">Status</div>
              <div>MONITORING ACTIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Distributed Enforcement Mesh */}
      <section className="py-24 bg-[#050505] relative border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-16">A Distributed Enforcement Mesh</h2>

          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-[#0B1120] rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.05),transparent_70%)]"></div>

            {/* Mesh SVG */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(217, 119, 6, 0.1)" />
                  <stop offset="50%" stopColor="rgba(217, 119, 6, 0.4)" />
                  <stop offset="100%" stopColor="rgba(217, 119, 6, 0.1)" />
                </linearGradient>
              </defs>

              {/* Triangle Connections */}
              <path d="M 50% 30% L 25% 70% L 75% 70% Z" fill="none" stroke="url(#meshGradient)" strokeWidth="1" />

              {/* Dense Mesh Lines (Abstract) */}
              <g className="mesh-line">
                <path d="M 50% 30% Q 35% 50% 25% 70%" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M 50% 30% Q 65% 50% 75% 70%" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M 25% 70% Q 50% 80% 75% 70%" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Cross hatching */}
                <path d="M 40% 45% L 60% 45%" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.2" />
                <path d="M 30% 60% L 70% 60%" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.2" />
              </g>
            </svg>

            {/* Nodes */}
            {/* Top: Kernel */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-slate-900 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.3)] z-10 relative">
                <ShieldAlert size={40} className="text-amber-500" />
                <div className="absolute inset-0 border border-amber-500/30 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">Kernel</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">(Gates)</div>
              </div>
            </div>

            {/* Left: Memory */}
            <div className="absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center shadow-lg z-10">
                <Database size={32} className="text-slate-400" />
              </div>
              <div className="text-center">
                <div className="text-slate-300 font-bold">Memory</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">(Side-Brain)</div>
              </div>
            </div>

            {/* Right: Execution */}
            <div className="absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center shadow-lg z-10">
                <Zap size={32} className="text-slate-400" />
              </div>
              <div className="text-center">
                <div className="text-slate-300 font-bold">Execution</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">(Runtime)</div>
              </div>
            </div>

            {/* Label */}
            <div className="absolute top-[45%] right-[20%] text-right hidden md:block">
              <div className="border border-amber-500/50 bg-amber-900/10 px-4 py-2 rounded text-amber-500 font-mono text-sm inline-flex items-center gap-2">
                <Share2 size={14} /> Drift Guard
              </div>
              <div className="w-16 h-px bg-amber-500/30 absolute right-full top-1/2"></div>
            </div>
          </div>

          <p className="mt-12 text-slate-400 max-w-2xl mx-auto">
            Drift Guard is not a single service. It is embedded into the core runtime to enforce
            integrity across behavioral, policy, and structural domains simultaneously.
          </p>
        </div>
      </section>

      {/* 4. The Five Domains of Drift (Radar Visual) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B1120] to-[#080a0f]">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">The Five Domains of Drift</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Drift is not just &quot;hallucination.&quot; It is structural decay across five specific
            vectors.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Radar Visual */}
          <div className="hidden lg:block relative w-[600px] h-[600px] mx-auto mb-12">
            {/* Radar Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="100" fill="none" stroke="#334155" strokeWidth="0.5" />
              <circle cx="300" cy="300" r="200" fill="none" stroke="#334155" strokeWidth="0.5" />
              <circle cx="300" cy="300" r="280" fill="none" stroke="#334155" strokeWidth="0.5" />
              {/* Radial Lines */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <line
                  key={angle}
                  x1="300"
                  y1="300"
                  x2={300 + 280 * Math.cos(((angle - 90) * Math.PI) / 180)}
                  y2={300 + 280 * Math.sin(((angle - 90) * Math.PI) / 180)}
                  stroke="#334155"
                  strokeWidth="0.5"
                />
              ))}
              {/* Connecting Polygon */}
              <path
                d="
                  M 300 20 
                  L 566 211 
                  L 464 526 
                  L 135 526 
                  L 33 211 
                  Z
                "
                fill="none"
                stroke="#d97706"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
            </svg>

            {/* Nodes */}
            {/* Top: Behavioral */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-64 group">
              <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all">
                <Activity className="text-amber-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Behavioral Drift</h3>
              <p className="text-xs text-slate-400">Vibe shifts &amp; variance</p>
            </div>

            {/* Top Right: Policy */}
            <div className="absolute top-[35%] right-0 translate-x-1/4 text-center w-64 group">
              <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all">
                <FileCode className="text-amber-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Policy Drift</h3>
              <p className="text-xs text-slate-400">Silent rule changes</p>
            </div>

            {/* Bottom Right: Context */}
            <div className="absolute bottom-0 right-[10%] translate-y-1/2 text-center w-64 group">
              <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all">
                <BrainCircuit className="text-amber-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Context Drift</h3>
              <p className="text-xs text-slate-400">Memory pollution</p>
            </div>

            {/* Bottom Left: Authority */}
            <div className="absolute bottom-0 left-[10%] translate-y-1/2 text-center w-64 group">
              <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all">
                <Anchor className="text-amber-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Authority Drift</h3>
              <p className="text-xs text-slate-400">Implicit permission creep</p>
            </div>

            {/* Top Left: Structural */}
            <div className="absolute top-[35%] left-0 -translate-x-1/4 text-center w-64 group">
              <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all">
                <LayoutGrid className="text-amber-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Structural Drift</h3>
              <p className="text-xs text-slate-400">Broken audit trails</p>
            </div>

            {/* Center Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-950 border border-slate-700 rounded-full flex items-center justify-center shadow-2xl z-10 animate-pulse">
              <AlertOctagon size={48} className="text-amber-600" />
            </div>
          </div>

          {/* Mobile Grid Fallback */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Activity, title: 'Behavioral Drift', desc: 'Same inputs, different actions.' },
              { icon: FileCode, title: 'Policy Drift', desc: 'Rules changed without promotion.' },
              { icon: LayoutGrid, title: 'Structural Drift', desc: 'Chronicle events missing.' },
              { icon: Anchor, title: 'Authority Drift', desc: 'Action taken with implicit permission.' },
              { icon: BrainCircuit, title: 'Context Drift', desc: 'Wrong memory influenced decision.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 flex items-start gap-4">
                <item.icon className="text-amber-500 shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mechanisms Deep Dive */}
      <section className="py-32 bg-[#080a0f] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* Title for Section */}
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preventing Vibe Shifts and Silent Rule Changes
            </h2>
            <p className="text-slate-400">Two distinct mechanisms for two distinct types of drift.</p>
          </div>

          {/* Behavioral + Policy Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Behavioral Drift (Controller) */}
            <div className="bg-[#0f1219] border border-slate-800 rounded-xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Activity size={20} className="text-amber-500" /> Behavioral Drift
              </h3>
              <p className="text-sm text-slate-400 mb-8">
                <strong>Problem:</strong> Model behaves differently under load.
                <br />
                <strong>Mechanism:</strong> AIMD Controllers.
              </p>

              {/* Mechanical Controller Visual */}
              <div className="relative h-48 bg-[#0B1120] rounded-lg border border-slate-700/50 flex flex-col justify-between py-2 px-4 shadow-inner">
                {/* Top Spring/Piston */}
                <div className="h-4 w-full flex items-center gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="h-full w-1 bg-slate-700 rounded-full opacity-50"></div>
                  ))}
                </div>
                <div className="h-2 w-full bg-gradient-to-r from-slate-800 via-amber-700/50 to-slate-800 rounded-full border border-amber-900/30"></div>

                {/* Waveform */}
                <div className="flex-1 relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0,50 Q25,10 50,50 T100,50 T150,50 T200,50 T250,50 T300,50"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    {/* Animated Wave */}
                    <path
                      d="M0,50 Q25,80 50,50 T100,20 T150,50 T200,80 T250,20 T300,50"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                      className="animate-wave"
                    ></path>
                  </svg>
                  {/* Sparks/Clamping Effect */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
                </div>

                <div className="h-2 w-full bg-gradient-to-r from-slate-800 via-amber-700/50 to-slate-800 rounded-full border border-amber-900/30"></div>
                {/* Bottom Spring/Piston */}
                <div className="h-4 w-full flex items-center gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="h-full w-1 bg-slate-700 rounded-full opacity-50"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Policy Drift (Receipt Binding) */}
            <div className="bg-[#0f1219] border border-slate-800 rounded-xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <FileCode size={20} className="text-amber-500" /> Policy Drift
              </h3>
              <p className="text-sm text-slate-400 mb-8">
                <strong>Problem:</strong> Rules change without oversight.
                <br />
                <strong>Mechanism:</strong> Receipt Binding &amp; Policy Hash.
              </p>

              {/* Receipt Binding Visual */}
              <div className="relative h-48 bg-[#0B1120] rounded-lg border border-slate-700/50 flex items-center justify-center p-4 shadow-inner overflow-hidden">
                {/* Background Circuitry */}
                <div className="absolute inset-0 circuit-bg opacity-30"></div>

                <div className="relative z-10 flex items-center gap-8 w-full justify-center">
                  {/* Policy Doc */}
                  <div className="w-16 h-20 bg-slate-800 border-2 border-amber-600 rounded flex flex-col items-center justify-center shadow-[0_0_15px_rgba(217,119,6,0.3)] relative">
                    <div className="absolute -top-3 bg-slate-950 p-1 rounded-full border border-amber-600">
                      <Lock size={12} className="text-amber-500" />
                    </div>
                    <div className="w-8 h-1 bg-slate-600 mb-1 rounded-full"></div>
                    <div className="w-8 h-1 bg-slate-600 mb-1 rounded-full"></div>
                    <div className="w-5 h-1 bg-slate-600 rounded-full"></div>
                  </div>

                  {/* Arrows/Flow */}
                  <div className="flex flex-col gap-2">
                    <div className="w-12 h-0.5 bg-amber-500/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-amber-400 w-1/2 animate-flow-dash"></div>
                    </div>
                    <div className="w-12 h-0.5 bg-amber-500/50 relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-amber-400 w-1/2 animate-flow-dash"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                    <div className="w-12 h-0.5 bg-amber-500/50 relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-amber-400 w-1/2 animate-flow-dash"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <CheckCircle2 size={10} className="text-green-500" /> Auth Data
                    </div>
                    <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <CheckCircle2 size={10} className="text-green-500" /> Inference
                    </div>
                    <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <CheckCircle2 size={10} className="text-green-500" /> Log Trans
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authority Decay: The Gate System */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="lg:order-2">
              <div className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-2 flex items-center gap-2">
                <Aperture size={14} /> Authority Decay
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">No Grandfathered Permissions</h2>
              <p className="text-lg text-slate-400 mb-6">
                <strong>Problem:</strong> A permission granted yesterday may not be valid today if
                risk thresholds change.
              </p>
              <div className="prose prose-invert text-slate-400">
                <p>
                  Drift Guard re-evaluates Gate conditions at runtime. If &quot;Risk &lt;
                  Threshold&quot; is false today, the gate shuts. The system does not respect
                  historical precedent, only current policy.
                </p>
              </div>
            </div>

            <div className="lg:order-1 bg-slate-900 border border-slate-800 rounded-xl p-8 flex items-center justify-center relative shadow-2xl overflow-hidden group">
              {/* Background Gear */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Settings size={300} className="animate-spin-slow" />
              </div>

              {/* Mechanical Iris */}
              <div className="w-64 h-64 relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-[12px] border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>

                {/* Blades (Simulated with CSS Conic Gradient or SVGs) */}
                <div className="absolute inset-4 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {/* Iris Blades SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-amber-900/40 absolute animate-spin-reverse-slow"
                  >
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <path
                        key={deg}
                        d="M50 50 L50 0 L100 0 Z"
                        fill="currentColor"
                        stroke="#0f172a"
                        strokeWidth="1"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                  </svg>

                  {/* Center Lock */}
                  <div className="relative z-10 w-20 h-20 bg-slate-950 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                    <Lock size={32} className="text-amber-500" />
                  </div>
                </div>

                {/* Scanner Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent h-1 w-full top-1/2 -translate-y-1/2 animate-pulse"></div>
                {/* Laser Scan Vertical */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 opacity-50 animate-laser"></div>
              </div>

              {/* Status Label */}
              <div className="absolute bottom-4 right-4 bg-slate-950 border border-amber-900/50 px-2 py-1 rounded text-[10px] text-amber-500 font-mono">
                GATE: LOCKED (G4)
              </div>
            </div>
          </div>

          {/* Context Drift: Side-Brain Connection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-2 flex items-center gap-2">
                <Filter size={14} /> The Side-Brain Connection
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Lane Pollution Detectors</h2>
              <p className="text-lg text-slate-400 mb-6">
                <strong>Core Concept:</strong> Did memory from outside the allowed Lane influence
                this decision?
              </p>
              <div className="prose prose-invert text-slate-400">
                <p>
                  Standard RAG dumps context into a blender. Cosmocrat treats memory as a governed
                  resource with &quot;Lane&quot; boundaries. The Side-Brain acts as a governed memory
                  interface—non-admissible memory is invisible to the model.
                </p>
                <ul className="list-none space-y-2 pl-0 mt-4">
                  <li className="flex gap-2 items-center text-sm">
                    <CheckCircle2 size={14} className="text-green-500" /> Context never bleeds across
                    lanes.
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <CheckCircle2 size={14} className="text-green-500" /> Explicit permission required
                    for memory cross-over.
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual: Particle Filter */}
            <div className="relative h-80 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              {/* The Wall */}
              <div className="absolute top-4 bottom-4 left-1/2 w-4 bg-slate-800 border-x border-amber-500/50 flex flex-col items-center justify-around z-10 shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                <div className="w-full h-1 bg-amber-500/20"></div>
                <div className="w-full h-1 bg-amber-500/20"></div>
                <div className="w-full h-1 bg-amber-500/20"></div>
                <Lock size={16} className="text-amber-500 bg-slate-950 p-0.5 rounded-full" />
                <div className="w-full h-1 bg-amber-500/20"></div>
                <div className="w-full h-1 bg-amber-500/20"></div>
              </div>

              {/* Lane Labels */}
              <div className="absolute top-6 left-12 text-blue-400 text-xs font-bold uppercase tracking-wider">
                Lane A (Legal)
              </div>
              <div className="absolute top-6 right-12 text-slate-500 text-xs font-bold uppercase tracking-wider">
                Lane B (Eng)
              </div>

              {/* Blue Particles (Allowed in Left) */}
              <div className="absolute top-1/3 left-12 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse"></div>
              <div className="absolute top-1/2 left-20 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse delay-1"></div>

              {/* Orange Particles (Trying to cross from Left to Right - Blocked) */}
              <div className="absolute left-10 top-2/3 flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b] particle"></div>
              </div>
              <div className="absolute left-10 top-2/3 flex items-center mt-8">
                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b] particle delay-2"></div>
              </div>

              {/* Impact Effects on Wall */}
              <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-6 h-6 border border-amber-500 rounded-full opacity-0 animate-ping delay-4"></div>

              <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-amber-500 font-mono">
                BLOCKED: Non-admissible context detected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Active Response: Fail-Closed Doctrine */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Active Response: The Fail-Closed Doctrine
          </h2>
          <p className="text-slate-400">
            Drift is treated as a governance event, not an ops anomaly. The system does not &quot;fix
            it live.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Response A */}
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

          {/* Response B */}
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

          {/* Response C */}
          <div className="bg-[#0f1219] border border-slate-800 p-0 rounded-lg hover:border-red-500 transition-all group overflow-hidden relative">
            <div className="h-1 w-full bg-red-500 absolute top-0"></div>
            <div className="absolute inset-0 bg-red-900/5 group-hover:bg-red-900/10 transition-colors"></div>
            <div className="p-8 relative z-10">
              <div className="text-red-500 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Lock size={16} /> Response C
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                Halt &amp; Require G4
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Human re-authorization required. The system stops and demands explicit authority to
                proceed.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 border-t border-slate-800 flex justify-between items-center relative z-10">
              <span className="text-xs text-slate-500 font-mono">MODE: HALT</span>
              <XCircle size={14} className="text-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Compliance is Evidence */}
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
              <div className="text-slate-300 space-y-2">
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
                  <span className="text-blue-400">&quot;timestamp&quot;</span>:{' '}
                  <span className="text-green-400">&quot;2026-01-15T14:02:00Z&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;action_taken&quot;</span>:{' '}
                  <span className="text-red-400">&quot;HALT_G4_REQUIRED&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">&quot;drift_vector&quot;</span>:{' '}
                  <span className="text-yellow-300">{'{'}</span>
                </div>
                <div className="pl-8">
                  <span className="text-blue-400">&quot;expected&quot;</span>:{' '}
                  <span className="text-slate-400">&quot;0x99a...&quot;</span>,
                </div>
                <div className="pl-8">
                  <span className="text-blue-400">&quot;actual&quot;</span>:{' '}
                  <span className="text-slate-400">&quot;0x11b...&quot;</span>
                </div>
                <div className="pl-4">
                  <span className="text-yellow-300">{'}'}</span>
                </div>
                <div>
                  <span className="text-yellow-300">{'}'}</span>;
                </div>
                <div className="mt-4 text-slate-500">
                  {/* Drift Guard ensures system did not "fail open" */}
                  {'// Drift Guard ensures system did not "fail open"'}
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
                href="/chronicle-receipts"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Chronicle Receipts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
