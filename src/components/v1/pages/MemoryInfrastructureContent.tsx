'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Database,
  Layers,
  Lock,
  Clock,
  FileCheck,
  Ban,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  FileText,
  FileCode,
  Mail,
  Music,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Briefcase,
  Settings,
  Brain,
  Scale,
  ArrowRight,
  Filter,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ActivitySquare,
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

// Deep Dive Section Component
const DeepDiveSection = ({
  title,
  thesis,
  children,
  expandedContent,
}: {
  title: string;
  thesis: string;
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 border-b border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-slate-800 text-slate-400 text-[10px] uppercase font-bold px-2 py-1 rounded border border-slate-700">
              Deep Dive
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-lg text-amber-500/90 font-medium max-w-3xl">{thesis}</p>
        </div>

        {/* The Main Visual (Always Visible) */}
        <div className="mb-8">{children}</div>

        {/* Collapsible Text Detail */}
        {expandedContent && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors mb-4 focus:outline-none"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {isExpanded ? 'Hide Technical Detail' : 'Read Technical Detail'}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="prose prose-invert prose-sm text-slate-400 border-l-2 border-slate-800 pl-6 py-2">
                {expandedContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function MemoryInfrastructureContent() {
  return (
    <div className="bg-[#0B1120] min-h-screen pb-24 font-sans selection:bg-amber-500/30">
      {/* Custom Styles */}
      <style>{`
        .bronze-text {
          background: linear-gradient(to right, #fcd34d, #fbbf24, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .engram-stack {
          perspective: 2000px;
        }
        .engram-layer {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
        
        /* Initial State: Compressed Stack */
        .layer-3 { 
          transform: translateY(0px) translateZ(0px); 
          z-index: 30;
        }
        .layer-2 { 
          transform: translateY(10px) translateZ(-10px) scale(0.96); 
          z-index: 20;
          filter: brightness(0.7);
        }
        .layer-1 { 
          transform: translateY(20px) translateZ(-20px) scale(0.92); 
          z-index: 10;
          filter: brightness(0.5);
        }

        /* Expanded State: Accordion */
        .engram-container:hover .layer-3 { 
          transform: translateY(-110px) translateZ(0px) scale(1); 
        }
        .engram-container:hover .layer-2 { 
          transform: translateY(0px) translateZ(0px) scale(1); 
          filter: brightness(1);
        }
        .engram-container:hover .layer-1 { 
          transform: translateY(110px) translateZ(0px) scale(1); 
          filter: brightness(1);
        }
        
        .grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @keyframes float-dust {
           0% { transform: translateY(0px) translateX(0px); opacity: 0; }
           50% { opacity: 0.5; }
           100% { transform: translateY(-50px) translateX(20px); opacity: 0; }
        }
        .dust-particle {
           animation: float-dust 3s infinite linear;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-slow 15s linear infinite reverse;
        }
        .lane-circuit {
           background-image: 
              linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
           background-size: 20px 20px;
        }
        @keyframes vertical-scroll {
           0% { transform: translateY(-50%); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: translateY(150%); opacity: 0; }
        }
        .animate-vertical-flow {
           animation: vertical-scroll 8s linear infinite;
        }
        @keyframes work-lane-drop {
           0% { transform: translateY(-150%); opacity: 0; }
           10% { opacity: 1; }
           40% { transform: translateY(0); opacity: 1; animation-timing-function: cubic-bezier(0.1, 0.8, 0.2, 1); }
           85% { transform: translateY(0); opacity: 1; }
           95% { opacity: 0; transform: translateY(20px); }
           100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-work-drop {
           animation: work-lane-drop 6s infinite;
        }
        @keyframes deny-pulse {
           0%, 100% { text-shadow: 0 0 10px rgba(239,68,68,0.5); transform: scale(1); }
           50% { text-shadow: 0 0 20px rgba(239,68,68,0.8); transform: scale(1.05); }
        }
        .deny-text {
           animation: deny-pulse 2s ease-in-out infinite;
        }
        @keyframes path-dash {
           to { stroke-dashoffset: -40; }
        }
        .attack-path {
           stroke-dasharray: 8 4;
           animation: path-dash 1s linear infinite;
        }
        @keyframes flow-particle {
          0% { left: 0%; opacity: 0; background-color: #64748b; }
          10% { opacity: 1; }
          45% { left: 45%; opacity: 1; background-color: #64748b; }
          50% { left: 50%; opacity: 0; transform: scale(2); }
          55% { left: 50%; opacity: 0; transform: scale(1); background-color: #d97706; }
          60% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; background-color: #d97706; }
        }
        .animate-flow-particle {
          animation: flow-particle 4s linear infinite;
        }
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-opacity {
          animation: pulse-opacity 2s ease-in-out infinite;
        }
        @keyframes scan-meo {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-meo {
          animation: scan-meo 6s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Hero Section: The Core Doctrine */}
      <div className="pt-32 pb-16 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(217,119,6,0.2)]">
            The Core Doctrine
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Memory is not <span className="text-slate-500 line-through decoration-red-500 decoration-4">logs</span>. <br />
            <span className="bronze-text drop-shadow-sm">Memory is infrastructure.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed italic border-l-4 border-amber-500 pl-6 py-2 bg-slate-900/30">
            &quot;Memory may exist and still be forbidden to use.&quot;
          </p>
        </div>
      </div>

      {/* 2. Definition Block (Quiet Anchor) */}
      <section className="py-16 bg-[#0B1120] border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8">
            What does &quot;memory as infrastructure&quot; mean?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Memory in Cosmocrat is an{' '}
              <span className="text-white font-medium">enforceable state, not stored text</span>.
            </p>
            <p>
              It governs what may influence decisions, not just what is stored. Memory is scoped by
              lane, phase, authority, and policy, and every change is recorded with cryptographic
              receipts. It is the connective tissue between the{' '}
              <Link href="/gate-system" className="text-amber-500 hover:underline">
                Gate System
              </Link>{' '}
              and{' '}
              <Link href="/runtime-governance" className="text-amber-500 hover:underline">
                Runtime Governance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 3 Non-Negotiables */}
      <section className="py-12 bg-slate-900/20 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-xs">
              <Lock size={14} /> 01
            </div>
            <h3 className="text-lg font-bold text-white">Authority-Bound</h3>
            <p className="text-sm text-slate-400">
              Memory exists within explicit lanes and permissions. Access is denied by default.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-xs">
              <Clock size={14} /> 02
            </div>
            <h3 className="text-lg font-bold text-white">Phase-Aware</h3>
            <p className="text-sm text-slate-400">
              What can be remembered depends on the moment (drafting vs. execution) and intent.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-xs">
              <FileCheck size={14} /> 03
            </div>
            <h3 className="text-lg font-bold text-white">Receipt-Backed</h3>
            <p className="text-sm text-slate-400">
              Memory changes are provable, replayable, and bound to policy hash.
            </p>
          </div>
        </div>
      </section>

      {/* 4. RAG vs Cosmocrat Comparison */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Card 1: Standard AI (RAG) */}
          <div className="relative bg-[#0f1219] border border-red-900/30 rounded-2xl overflow-hidden group">
            {/* Header/Badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/50 border border-red-900/50 text-red-500 text-xs font-bold uppercase tracking-widest">
                <Ban size={14} /> Standard AI (RAG)
              </div>
            </div>

            {/* Visual Area */}
            <div className="h-80 relative flex items-center justify-center bg-gradient-to-b from-red-900/5 to-transparent">
              {/* Trash Can Composition */}
              <div className="relative z-10 transform translate-y-4">
                {/* The Bin */}
                <div className="w-40 h-48 border-x-4 border-b-4 border-slate-700 rounded-b-xl relative bg-slate-800/40 backdrop-blur-sm flex items-end justify-center overflow-hidden">
                  {/* Vertical ribs on bin */}
                  <div className="absolute inset-0 flex justify-around opacity-30">
                    <div className="w-1 h-full bg-slate-700"></div>
                    <div className="w-1 h-full bg-slate-700"></div>
                    <div className="w-1 h-full bg-slate-700"></div>
                  </div>

                  {/* Trash inside (clipped) */}
                  <div className="absolute bottom-0 w-full h-3/4 bg-slate-200/5"></div>
                </div>

                {/* Lid (Hovering/Open) */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-44 h-4 border-4 border-slate-700 rounded-full bg-slate-800 -rotate-12 transform origin-bottom-left group-hover:-rotate-45 transition-transform duration-700">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-4 border-x-4 border-t-4 border-slate-700 rounded-t-lg"></div>
                </div>
              </div>

              {/* Flying Garbage Items */}
              <div className="absolute top-20 left-12 w-20 h-24 bg-slate-200 rounded shadow-xl flex flex-col p-2 transform -rotate-12 animate-[float-dust_4s_infinite_ease-in-out]">
                <div className="w-full h-2 bg-slate-300 mb-2"></div>
                <div className="w-3/4 h-2 bg-slate-300 mb-2"></div>
                <div className="w-1/2 h-2 bg-slate-300"></div>
                <div className="absolute bottom-2 right-2 text-[8px] text-red-600 font-bold border border-red-500 px-1 rounded transform rotate-12">
                  CONFIDENTIAL
                </div>
              </div>

              <div className="absolute top-32 right-12 w-24 h-16 bg-slate-100 rounded shadow-xl flex items-center justify-center transform rotate-6 animate-[float-dust_5s_infinite_ease-in-out_1s]">
                <div className="text-[10px] font-mono text-slate-800">passwords.env</div>
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                  LEAK
                </div>
              </div>

              <div className="absolute bottom-24 left-24 w-16 h-16 bg-red-100 rounded shadow-lg transform rotate-45 flex items-center justify-center animate-[float-dust_6s_infinite_ease-in-out_0.5s]">
                <span className="text-red-600 font-bold text-lg">404</span>
              </div>

              {/* Red Glow/X Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Ban size={250} className="text-red-500" strokeWidth={0.5} />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 border-t border-slate-800 bg-[#0f1219]">
              <h3 className="text-xl font-bold text-slate-200 mb-2">Passive Retrieval</h3>
              <p className="text-slate-500 text-sm mb-4">
                &quot;If the AI reads it, it uses it.&quot; <br />
                In standard RAG, availability equals permission.
              </p>
              <div className="flex items-center gap-2 text-xs text-red-400 font-mono uppercase tracking-wider">
                <ShieldAlert size={14} /> Risk: Context Bleed & Hallucination
              </div>
            </div>
          </div>

          {/* Card 2: Cosmocrat */}
          <div className="relative bg-[#0f1219] border border-amber-500/30 rounded-2xl overflow-hidden group shadow-[0_0_30px_rgba(217,119,6,0.05)]">
            {/* Header/Badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-950/50 border border-amber-900/50 text-amber-500 text-xs font-bold uppercase tracking-widest shadow-lg">
                <Lock size={14} /> Cosmocrat
              </div>
            </div>

            {/* Visual Area */}
            <div className="h-80 relative flex items-center justify-center bg-gradient-to-b from-amber-900/5 to-transparent">
              {/* Vault Composition */}
              <div className="relative z-10 transform scale-100 group-hover:scale-105 transition-transform duration-700 translate-y-4">
                {/* Main Safe Box */}
                <div className="w-56 h-56 bg-slate-900 rounded-xl border-4 border-amber-700 shadow-2xl flex flex-col relative overflow-hidden">
                  {/* Metallic Texture Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] group-hover:bg-[position:200%_0,0_0] duration-[1500ms] transition-[background-position]"></div>

                  {/* Drawer 1 */}
                  <div className="flex-1 border-b border-amber-800/50 relative bg-slate-800/50 flex items-center px-4 gap-3">
                    <div className="w-8 h-5 bg-slate-900 rounded border border-slate-700 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-amber-500/50"></div>
                    </div>
                    <div className="h-2 flex-1 bg-slate-900/50 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-slate-700"></div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                  </div>

                  {/* Drawer 2 (Open slightly) */}
                  <div className="flex-1 border-b border-amber-800/50 relative bg-slate-800/80 flex items-center px-4 gap-3 transform translate-x-2 transition-transform group-hover:translate-x-4 shadow-lg z-10">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600"></div>
                    <div className="w-8 h-5 bg-slate-900 rounded border border-slate-700 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-amber-500"></div>
                    </div>
                    <div className="text-[10px] text-amber-500 font-mono tracking-wider">
                      RESTRICTED_L1
                    </div>
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  </div>

                  {/* Drawer 3 */}
                  <div className="flex-1 relative bg-slate-800/50 flex items-center px-4 gap-3">
                    <div className="w-8 h-5 bg-slate-900 rounded border border-slate-700 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-amber-500/50"></div>
                    </div>
                    <div className="h-2 flex-1 bg-slate-900/50 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-slate-700"></div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>

                  {/* Side Keypad Panel */}
                  <div className="absolute top-4 right-2 w-8 h-12 bg-slate-950 border border-slate-800 rounded flex flex-col items-center justify-evenly p-1 shadow-inner">
                    <div className="w-1 h-1 rounded-full bg-green-500"></div>
                    <div className="w-4 h-4 rounded border border-slate-700 flex items-center justify-center">
                      <Lock size={8} className="text-slate-400" />
                    </div>
                    <div className="w-1 h-1 rounded-full bg-red-500 opacity-20"></div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
            </div>

            {/* Content Area */}
            <div className="p-8 border-t border-slate-800 bg-[#0f1219]">
              <h3 className="text-xl font-bold text-white mb-2">Governed Infrastructure</h3>
              <p className="text-slate-400 text-sm mb-4">
                Defines allowed usage, not just storage. <br />
                Infrastructure enforces &quot;Permission-First&quot; access.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono uppercase tracking-wider">
                <ShieldCheck size={14} /> Security: Fail-Closed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEEP DIVE: Engrams --- */}
      <DeepDiveSection
        title="The Three Layers of Truth (The Engrams)"
        thesis="We do not just store data; we store the cognition and the permission attached to it."
        expandedContent={
          <>
            <p>
              Standard memory systems flatten context into simple vector embeddings. This loses the
              distinction between a fact (&quot;User balance is $0&quot;), a derivation (&quot;User
              is bankrupt&quot;), and an authority (&quot;Admin verified balance&quot;).
            </p>
            <p>Cosmocrat separates these into three distinct engrams:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Semantic Engrams (Layer 1):</strong> Raw memory and state snapshots. The
                &quot;What&quot;.
              </li>
              <li>
                <strong>Epistemic Engrams (Layer 2):</strong> Reasoning chains and decisions. The
                &quot;Why&quot;.
              </li>
              <li>
                <strong>Governance Engrams (Layer 3):</strong> Receipts, authority scopes, and
                hashes. The &quot;Authority&quot;.
              </li>
            </ul>
            <p>
              This separation allows the{' '}
              <Link href="/gate-system" className="text-amber-500 hover:underline">
                Gate System
              </Link>{' '}
              to validate authority without needing to parse the semantic content of the memory
              itself.
            </p>
          </>
        }
      >
        <div
          className="engram-stack h-[400px] flex items-center justify-center engram-container cursor-pointer group"
          style={{ perspective: '2000px' }}
        >
          <div
            className="relative w-80 h-24 transition-transform duration-700 ease-out"
            style={{ transform: 'rotateX(5deg)', transformStyle: 'preserve-3d' }}
          >
            {/* Layer 3: Governance (Top) */}
            <div className="engram-layer layer-3">
              <div className="w-full h-24 bg-gradient-to-r from-amber-600 to-amber-900 rounded-xl border-2 border-amber-400/50 shadow-[0_10px_40px_rgba(245,158,11,0.2)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-900/20 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-amber-500/30 rounded-full flex items-center justify-center animate-[spin-slow_20s_linear_infinite]">
                    <div className="w-24 h-24 border-2 border-dashed border-amber-400/50 rounded-full"></div>
                  </div>
                  <Scale
                    size={48}
                    className="text-amber-100 absolute drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                  />
                </div>
                <div className="absolute bottom-2 text-amber-200 font-bold text-xs uppercase tracking-[0.2em] bg-amber-950/50 px-3 py-1 rounded border border-amber-500/30 backdrop-blur-sm">
                  Authority
                </div>
                <div className="absolute top-full left-0 right-0 h-2 bg-amber-950/80 border-x border-b border-amber-800 opacity-90 rounded-b-md"></div>
              </div>
            </div>
            {/* Layer 2: Epistemic (Middle) */}
            <div className="engram-layer layer-2">
              <div className="w-full h-24 bg-gradient-to-r from-orange-800 to-slate-900 rounded-xl border-2 border-orange-500/40 shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  <Settings
                    size={120}
                    className="absolute -left-10 -top-10 text-orange-400 animate-spin-slow opacity-20"
                  />
                </div>
                <div className="relative z-10 text-center">
                  <Brain size={40} className="text-orange-200 mx-auto mb-1 drop-shadow-md" />
                  <div className="text-orange-200 font-bold text-xs uppercase tracking-[0.2em] bg-orange-950/50 px-3 py-1 rounded border border-orange-500/30 backdrop-blur-sm">
                    Cognition
                  </div>
                </div>
                <div className="absolute top-full left-0 right-0 h-2 bg-orange-950/80 border-x border-b border-orange-900 opacity-90 rounded-b-md"></div>
              </div>
            </div>
            {/* Layer 1: Semantic (Bottom) */}
            <div className="engram-layer layer-1">
              <div className="w-full h-24 bg-gradient-to-r from-slate-800 to-slate-950 rounded-xl border-2 border-slate-600 shadow-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <div className="relative z-10 text-center">
                  <Database size={40} className="text-slate-400 mx-auto mb-1 drop-shadow-md" />
                  <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] bg-slate-900/50 px-3 py-1 rounded border border-slate-600/30 backdrop-blur-sm">
                    Facts
                  </div>
                </div>
                <div className="absolute top-full left-0 right-0 h-2 bg-slate-950 border-x border-b border-slate-800 opacity-90 rounded-b-md"></div>
              </div>
            </div>
          </div>
        </div>
      </DeepDiveSection>

      {/* --- DEEP DIVE: Lane Awareness --- */}
      <DeepDiveSection
        title="Lane-Awareness: Whose World Is This?"
        thesis="Deny-by-Default. No global soup of context."
        expandedContent={
          <>
            <p>
              Most AI systems operate in a global context window where all retrieved data is visible
              to the model. This creates a &quot;context soup&quot; where sensitive data (Legal) can
              accidentally inform unrelated decisions (Personal).
            </p>
            <p>
              Cosmocrat enforces strict Lane Isolation at the infrastructure level. A lane is a
              cryptographically isolated memory space with its own policies and authority roots.
            </p>
            <p>
              Crossing lanes (e.g., using Health data in a Work context) requires an explicit,
              audited bridge event in the{' '}
              <Link href="/gate-system" className="text-amber-500 hover:underline">
                Gate System
              </Link>
              . Without it, cross-lane retrieval is mathematically impossible.
            </p>
          </>
        }
      >
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[400px] select-none">
          {/* Lane 1: Personal */}
          <div className="relative flex flex-col h-full bg-slate-900/40 border-x border-slate-800 lane-circuit group overflow-hidden">
            <div className="mx-4 mt-6 mb-8 py-2 bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg text-center shadow-[0_0_15px_rgba(34,211,238,0.1)] relative z-20">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
                Personal
              </span>
              <div className="absolute inset-0 border border-cyan-500/20 rounded-lg"></div>
            </div>
            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center gap-16 opacity-40">
              <div className="animate-vertical-flow flex flex-col items-center gap-8">
                <ImageIcon className="text-cyan-600" size={24} />
                <MessageCircle className="text-cyan-600" size={24} />
                <Music className="text-cyan-600" size={24} />
                <Heart className="text-pink-600" size={24} />
                <Mail className="text-cyan-600" size={24} />
              </div>
            </div>
            <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-slate-700"></div>
              ))}
            </div>
            <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-slate-700"></div>
              ))}
            </div>
          </div>

          {/* Lane 2: Work (Deep) */}
          <div className="relative flex flex-col h-full bg-slate-900/60 border-x border-slate-700 lane-circuit shadow-2xl z-10 overflow-hidden">
            <div className="mx-4 mt-6 mb-8 py-2 bg-slate-800/90 border-2 border-blue-600/50 rounded-lg text-center shadow-[0_0_20px_rgba(59,130,246,0.2)] relative z-20">
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">
                Work (Deep)
              </span>
              <div className="absolute inset-0 border border-blue-400/30 rounded-lg"></div>
            </div>
            <div className="absolute inset-x-0 top-20 bottom-0 flex flex-col items-center opacity-80 z-0">
              <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
              <div className="animate-work-drop flex flex-col items-center gap-10 mt-2">
                <FileText className="text-blue-300" size={28} />
                <Settings className="text-slate-400" size={24} />
                <Briefcase className="text-blue-300" size={28} />
                <Database className="text-slate-400" size={24} />
                <Lock className="text-amber-500" size={24} />
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-800 border-r border-slate-700"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-slate-800 border-l border-slate-700"></div>
          </div>

          {/* Lane 3: Legal */}
          <div className="relative flex flex-col h-full bg-slate-900/40 border-x border-slate-800 lane-circuit">
            <div className="mx-4 mt-6 mb-8 py-2 bg-slate-800/80 border-2 border-amber-900/50 rounded-lg text-center relative z-20">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-sm">
                Legal
              </span>
            </div>
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <path
                  d="M 50% 0 V 100%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-500"
                />
                <path
                  d="M 50% 20% H 80% V 30%"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-slate-500"
                />
                <path
                  d="M 50% 60% H 20% V 70%"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-slate-500"
                />
              </svg>
            </div>
          </div>

          {/* Lane 4: Health */}
          <div className="relative flex flex-col h-full bg-slate-900/40 border-x border-slate-800 lane-circuit">
            <div className="mx-4 mt-6 mb-8 py-2 bg-slate-800/80 border-2 border-emerald-900/50 rounded-lg text-center relative z-20">
              <span className="text-emerald-400/50 font-bold uppercase tracking-wider text-sm">
                Health
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <ActivitySquare size={100} className="text-slate-700" strokeWidth={0.5} />
            </div>
          </div>

          {/* Attack Visualization */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <svg className="w-full h-full overflow-visible">
              <defs>
                <marker
                  id="arrow-attack"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                </marker>
                <filter id="glow-red">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 12.5% 45% C 12.5% 45%, 15% 45%, 25% 50%"
                stroke="#ef4444"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrow-attack)"
                className="attack-path hidden md:block"
                filter="url(#glow-red)"
              />
              <path
                d="M 25% 45% C 35% 45%, 45% 48%, 50% 50%"
                stroke="#ef4444"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrow-attack)"
                className="attack-path md:hidden"
                filter="url(#glow-red)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/4 md:left-[25%] -translate-y-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 deny-text drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  DENY
                </h3>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-red-500 rounded-full p-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <Ban size={24} className="text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DeepDiveSection>

      {/* --- DEEP DIVE: Side-Brain Interface --- */}
      <DeepDiveSection
        title="The Side-Brain Interface"
        thesis="The Governor of Visibility. A projection layer filtering massive memory into a safe subset."
        expandedContent={
          <>
            <p>
              AI models have limited context windows and no concept of data privacy. Giving an AI
              access to &quot;all memory&quot; is a security violation.
            </p>
            <p>
              The Side-Brain Interface acts as a governor. It intercepts the model&apos;s memory
              requests and filters the &quot;Total Memory&quot; (massive, chaotic, mixed-sensitivity)
              into &quot;Admissible Context&quot; (safe, relevant, authorized).
            </p>
            <p>
              This prevents{' '}
              <Link href="/drift-guard" className="text-amber-500 hover:underline">
                Context Drift
              </Link>{' '}
              and ensures that even if the AI <em>asks</em> for forbidden data, the interface returns
              only what it is allowed to see.
            </p>
          </>
        }
      >
        <div className="bg-[#050505] p-8 rounded-xl border border-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.1),transparent_70%)]"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            {/* LEFT: Total Memory */}
            <div className="relative group">
              <div className="bg-[#0f1219] border border-slate-800 rounded-xl p-6 h-80 flex flex-col overflow-hidden shadow-2xl">
                <div className="text-center mb-6 border-b border-slate-800 pb-4">
                  <h3 className="text-slate-300 font-bold">Total Memory</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">(Massive Dataset)</p>
                </div>
                <div className="flex-1 grid grid-cols-4 gap-4 content-start opacity-50 relative">
                  <FileText size={20} className="text-slate-600 rotate-12" />
                  <ImageIcon size={20} className="text-slate-500 -rotate-6" />
                  <Mail size={20} className="text-slate-600 rotate-45" />
                  <Database size={20} className="text-slate-500" />
                  <Lock size={20} className="text-red-900" />
                  <Music size={20} className="text-slate-600 -rotate-12" />
                  <FileCode size={20} className="text-slate-500" />
                  <Trash2 size={20} className="text-slate-700 rotate-180" />
                </div>
              </div>
            </div>

            {/* CENTER: The Side-Brain Filter */}
            <div className="relative flex flex-col items-center justify-center py-8 lg:py-0">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:block">
                <ArrowRight size={40} className="text-slate-700 animate-pulse" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:block">
                <ArrowRight size={40} className="text-amber-700 animate-pulse" />
              </div>

              {/* The Filter Visual */}
              <div className="relative w-48 h-64 bg-gradient-to-b from-slate-900 to-[#0f172a] border-2 border-amber-500/50 rounded-2xl shadow-[0_0_40px_rgba(217,119,6,0.15)] flex flex-col items-center justify-center overflow-hidden">
                {/* Scan line */}
                <div className="absolute inset-x-0 h-1 bg-amber-500/50 animate-scan-meo shadow-[0_0_10px_rgba(217,119,6,0.5)]"></div>

                {/* Filter Icon */}
                <Filter size={48} className="text-amber-500 mb-4 relative z-10" />
                <div className="text-amber-500 font-bold text-sm uppercase tracking-[0.3em] relative z-10">
                  Side-Brain
                </div>
                <div className="text-slate-500 text-xs mt-1 relative z-10">Memory Governor</div>

                {/* Flow Particle */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full animate-flow-particle"></div>
              </div>
            </div>

            {/* RIGHT: Admissible Context */}
            <div className="relative group">
              <div className="bg-[#0f1219] border border-amber-500/30 rounded-xl p-6 h-80 flex flex-col overflow-hidden shadow-[0_0_20px_rgba(217,119,6,0.1)]">
                <div className="text-center mb-6 border-b border-amber-500/30 pb-4">
                  <h3 className="text-amber-400 font-bold">Admissible Context</h3>
                  <p className="text-xs text-amber-500/70 uppercase tracking-wider">
                    (Safe, Relevant, Authorized)
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                    <FileText size={16} className="text-amber-500" />
                    <span className="text-xs text-slate-300">Work_Task_A.md</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                    <Database size={16} className="text-amber-500" />
                    <span className="text-xs text-slate-300">Context_Snapshot</span>
                  </div>
                  <div className="text-[10px] text-slate-600 mt-4 flex items-center gap-1">
                    <EyeOff size={10} /> 47 items filtered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DeepDiveSection>

      {/* FAQ Section */}
      <section className="py-24 bg-[#0B1120] border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FaqItem
              question="Is this different from a vector database?"
              answer="Yes. Vector databases optimize for retrieval relevance. Cosmocrat memory adds governance: lane isolation, authority checks, and provenance tracking. You can use a vector database as the underlying store, but access is mediated by the kernel."
            />
            <FaqItem
              question="How does lane isolation work technically?"
              answer="Each lane is a logical partition with its own namespace. Memory writes are tagged with lane ID. Retrieval queries are filtered by lane membership. Cross-lane access requires explicit policy grants."
            />
            <FaqItem
              question="What happens if an agent needs cross-lane context?"
              answer="The agent requests cross-lane access through the Gate System. If policy permits (e.g., 'SupportBot may read Finance/refund_policy'), the memory is retrieved with a cross-lane receipt. If denied, the request fails and is logged."
            />
            <FaqItem
              question="Does memory governance slow down retrieval?"
              answer="Governance checks add microseconds to retrieval latency—negligible compared to vector search or LLM inference. The trade-off is provability: you can now prove what context informed every decision."
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
                href="/chronicle-receipts"
                className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
              >
                Chronicle Receipts
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
