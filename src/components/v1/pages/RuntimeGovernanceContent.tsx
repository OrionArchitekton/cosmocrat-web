'use client';

import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  ShieldAlert,
  ArrowRight,
  Cpu,
  AlertTriangle,
  Lock,
  Activity,
  Server,
  User,
  Database,
  Box,
  Layers,
  Network,
  Zap,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function RuntimeGovernanceContent() {
  return (
    <div className="bg-[#0B1120] min-h-screen pb-24 font-sans selection:bg-amber-500/30">
      {/* Custom Styles for Bronze/Gold Aesthetic */}
      <style>{`
        .bronze-border {
          border: 1px solid transparent;
          background: linear-gradient(#0B1120, #0B1120) padding-box,
                      linear-gradient(135deg, #78350f, #d97706, #78350f) border-box;
        }
        .bronze-text {
          background: linear-gradient(to right, #fcd34d, #fbbf24, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .circuit-bg {
          background-image: radial-gradient(rgba(217, 119, 6, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @keyframes trace-flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .trace-animate {
          stroke-dasharray: 10;
          animation: trace-flow 2s linear infinite;
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes scan-vertical {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[#0B1120]">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            <Cpu size={14} />
            <span>System Architecture</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            The Shift from &apos;Guardrails&apos; to <br />
            <span className="bronze-text drop-shadow-sm">Kernel Governance</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Cosmocrat is not a wrapper. It is the kernel that sits between inputs and execution,
            enforcing policy pre-execution with cryptographic proof at the operating system level.
          </p>
          <p className="mt-6 text-lg text-slate-500 font-medium">
            Runtime governance enforces policy, authority, and safety before AI actions execute —
            not after they fail.
          </p>
        </div>
      </div>

      {/* 1.5 Definition Block (SEO Spine) */}
      <section className="py-16 bg-[#0B1120] border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is runtime governance?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Runtime governance is the architectural enforcement of policy at the moment of
              decision. Unlike post-hoc auditing or reactive guardrails, it acts as a preemptive
              control plane that mediates every input, memory access, and tool call before execution
              is permitted.
            </p>
            <p>
              In the Cosmocrat architecture, this means the kernel evaluates authority against the{' '}
              <Link
                href="/gate-system"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Gate System
              </Link>{' '}
              prior to any action. It ensures that memory retrieval respects lane isolation and that
              execution privileges match the agent&apos;s clearance level.
            </p>
            <p>
              This process generates{' '}
              <Link
                href="/decision-exhaust"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Decision Exhaust
              </Link>
              —a complete record of reasoning and policy checks. Because enforcement happens in the
              kernel, it produces{' '}
              <Link
                href="/chronicle-receipts"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Chronicle Receipts
              </Link>
              , which are cryptographic proofs that document exactly why an action was authorized.
            </p>
            <p>
              As defined in{' '}
              <Link
                href="/about"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                About Cosmocrat
              </Link>
              , this creates a fail-closed environment where safety is a property of the operating
              system, not a suggestion to the model.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Guardrails vs. Kernel Comparison */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Current State (Guardrails) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-slate-900/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full bg-[#0f1219] border border-slate-800 rounded-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle size={150} />
              </div>

              <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                <div className="p-2 bg-red-500/10 rounded text-red-500">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-200">Current State (Guardrails)</h3>
              </div>

              {/* Visual: Chaotic Mesh */}
              <div className="relative h-64 mb-8 bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <pattern
                      id="chaos"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1" fill="#ef4444" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#chaos)" />
                    {/* Random connection lines */}
                    <path
                      d="M 50 50 L 150 200 L 250 50"
                      stroke="#ef4444"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.5"
                    />
                    <path
                      d="M 100 250 L 200 100 L 300 250"
                      stroke="#ef4444"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                {/* Floating Nodes */}
                <div className="relative w-full h-full p-4">
                  <div className="absolute top-10 left-10 p-2 bg-slate-800 rounded border border-red-500/30 text-red-400 text-xs flex items-center gap-1 animate-pulse">
                    <Zap size={10} /> Reactive
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-slate-800 rounded border border-red-500/50 text-red-300 text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    Fail-Open
                  </div>
                  <div className="absolute bottom-10 right-10 p-2 bg-slate-800 rounded border border-red-500/30 text-red-400 text-xs flex items-center gap-1">
                    <Activity size={10} /> Post-hoc
                  </div>
                  <div className="absolute top-20 right-20 p-2 bg-slate-800 rounded border border-red-500/30 text-red-400 text-xs">
                    ? Vibes
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Reactive:</strong> Filters catch bad outputs only after generation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Vibes-based:</strong> &quot;Safety&quot; is defined by prompts, not hard
                    policy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Fail-Open:</strong> If the guardrail fails, the action proceeds.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Cosmocrat (Kernel) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full bg-[#0B1120] bronze-border rounded-2xl p-8 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Cpu size={150} className="text-amber-500" />
              </div>

              <div className="flex items-center gap-3 mb-8 border-b border-amber-900/30 pb-4">
                <div className="p-2 bg-amber-500/10 rounded text-amber-500">
                  <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Cosmocrat (Kernel)</h3>
              </div>

              {/* Visual: The Chip */}
              <div className="relative h-64 mb-8 bg-[#080a0f] rounded-lg border border-amber-900/50 flex items-center justify-center overflow-hidden">
                {/* Circuit Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <pattern
                      id="circuit"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 20 40 M 0 20 L 40 20"
                        stroke="#d97706"
                        strokeWidth="0.5"
                        fill="none"
                      />
                      <circle cx="20" cy="20" r="1" fill="#d97706" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                  </svg>
                </div>

                {/* Central Kernel Unit */}
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.3)] group-hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] transition-shadow duration-500">
                  <div className="absolute -top-1 w-10 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#d97706]"></div>
                  <div className="absolute -bottom-1 w-10 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#d97706]"></div>
                  <div className="absolute -left-1 h-10 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#d97706]"></div>
                  <div className="absolute -right-1 h-10 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#d97706]"></div>

                  <div className="text-xs text-amber-500 font-bold tracking-widest uppercase mb-1">
                    KERNEL
                  </div>
                  <Lock size={24} className="text-white mb-1" />
                  <div className="text-[10px] text-green-400 font-mono">ENFORCED</div>
                </div>

                {/* Input Streams */}
                <div className="absolute left-0 top-1/2 w-[calc(50%-4rem)] h-[1px] bg-gradient-to-r from-transparent to-amber-500"></div>
                <div className="absolute right-0 top-1/2 w-[calc(50%-4rem)] h-[1px] bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Preemptive:</strong> Policy checks happen <em>before</em> execution.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Cryptographic Proof:</strong> Every decision leaves an immutable
                    receipt.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Fail-Closed:</strong> Default deny. Safety is structural, not optional.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Kernel Architecture (Schematic Visual) */}
      <section className="py-32 bg-[#080a0f] border-y border-slate-900 overflow-hidden relative">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-amber-500"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-white mb-4">The Kernel Architecture</h2>
            <p className="text-slate-400">
              Cosmocrat centralizes authority, context, and governance—while pushing execution
              outward.
            </p>
          </div>

          {/* SCHEMATIC DIAGRAM CONTAINER */}
          <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1]">
            {/* 1. CENTER: The Kernel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-64 bg-[#0f172a] rounded-xl border-2 border-amber-600/50 shadow-[0_0_60px_rgba(217,119,6,0.15)] flex flex-col items-center z-20">
              <div className="absolute -top-3 px-4 py-1 bg-[#0f172a] border border-amber-600/50 text-amber-500 font-bold text-xs tracking-[0.2em] uppercase rounded">
                The Kernel
              </div>

              <div className="flex-1 w-full p-4 flex flex-col justify-center gap-3">
                <div className="flex gap-3 h-full">
                  {/* Lane Isolation */}
                  <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded flex flex-col items-center justify-center p-2 text-center group hover:border-amber-500/50 transition-colors relative overflow-hidden">
                    <Box
                      size={20}
                      className="text-slate-500 mb-2 group-hover:text-amber-500 transition-colors z-10"
                    />
                    <div className="text-[10px] font-bold text-slate-300 z-10">
                      Lane
                      <br />
                      Isolation
                    </div>
                  </div>

                  {/* Context Fabric */}
                  <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded flex flex-col items-center justify-center p-2 text-center group hover:border-amber-500/50 transition-colors relative overflow-hidden">
                    <Layers
                      size={20}
                      className="text-slate-500 mb-2 group-hover:text-amber-500 transition-colors z-10"
                    />
                    <div className="text-[10px] font-bold text-slate-300 z-10">
                      Context
                      <br />
                      Fabric
                    </div>
                  </div>

                  {/* Gates */}
                  <Link
                    href="/gate-system"
                    className="flex-1 bg-slate-900/80 border border-amber-500/30 rounded flex flex-col items-center justify-center p-2 text-center group hover:bg-amber-900/20 transition-colors cursor-pointer relative overflow-hidden"
                  >
                    <ShieldAlert size={20} className="text-amber-500 mb-2 z-10" />
                    <div className="text-[10px] font-bold text-amber-500 z-10">
                      Gates
                      <br />
                      (G0-G6)
                    </div>
                  </Link>
                </div>

                {/* Kernel Internal Bus */}
                <div className="h-1 w-full bg-slate-800 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/50 w-1/3 animate-[slide_2s_infinite_linear]"></div>
                </div>
              </div>
            </div>

            {/* 2. TOP: Operator Plane */}
            <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 -translate-y-full w-48 bg-[#0f172a] border border-amber-500/30 p-3 rounded-lg text-center z-20 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
              <div className="flex justify-center mb-1">
                <User size={20} className="text-amber-500" />
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Operator Plane
              </div>
              <div className="text-[10px] text-slate-500">Human Authorization</div>
              {/* Connector Line Down */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-[3rem] w-[2px] bg-amber-500/30"></div>
              <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#d97706]"></div>
            </div>

            {/* 3. BOTTOM: Memory Subsystem */}
            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 translate-y-full w-56 bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-center z-20">
              <div className="flex justify-center mb-1">
                <Database size={20} className="text-slate-400" />
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Memory Subsystem
              </div>
              <div className="text-[10px] text-slate-500">Chronicle Registry & State</div>
              {/* Connector Line Up */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-[3rem] w-[2px] bg-slate-700"></div>
            </div>

            {/* 4. LEFT: Inputs */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 hidden md:flex flex-col gap-4 z-20">
              <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-r-lg border-l-0 shadow-lg relative">
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
                  <Network size={14} /> Inputs / Connectors
                </div>
                <div className="text-[10px] text-slate-500">Slack, Email, CRM, Webhooks</div>
              </div>
            </div>

            {/* 5. RIGHT: Execution */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 hidden md:flex flex-col gap-4 z-20">
              <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-l-lg border-r-0 shadow-lg relative text-right">
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-2">
                  Execution <Server size={14} />
                </div>
                <div className="text-[10px] text-slate-500">Workers, Tool Adapters, API Calls</div>
              </div>
            </div>
          </div>

          {/* Mobile Fallback Label */}
          <div className="md:hidden text-center mt-32 text-slate-500 text-xs italic">
            (Rotate device for full architecture schematic)
          </div>
        </div>
      </section>

      {/* 4. Deep Dive on Kernel Components */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-12 border-b border-slate-800 pb-4">
          Kernel Capabilities
        </h2>

        <div className="space-y-12">
          <div className="flex gap-6 group">
            <div className="shrink-0 mt-1 p-3 bg-slate-900 border border-slate-800 rounded group-hover:border-amber-500/50 transition-colors">
              <Box className="text-amber-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Lane Isolation</h3>
              <p className="text-slate-400 leading-relaxed">
                Standard AI systems share a flat context window. Cosmocrat enforces
                &quot;Lanes&quot;—isolated execution environments. Memory from a legal workflow
                cannot bleed into an engineering workflow. Data leakage is prevented at the
                architecture level.
              </p>
            </div>
          </div>

          <div className="flex gap-6 group">
            <div className="shrink-0 mt-1 p-3 bg-slate-900 border border-slate-800 rounded group-hover:border-amber-500/50 transition-colors">
              <Layers className="text-amber-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Context Fabric (OCF)</h3>
              <p className="text-slate-400 leading-relaxed">
                The Operating Context Fabric (OCF) manages the state of the world as the AI sees
                it. Unlike a simple vector store, the OCF allows the kernel to inject mandatory
                context (policies, active alerts) into every prompt, ensuring the model never acts
                without the full picture.
              </p>
            </div>
          </div>

          <div className="flex gap-6 group">
            <div className="shrink-0 mt-1 p-3 bg-slate-900 border border-slate-800 rounded group-hover:border-amber-500/50 transition-colors">
              <ShieldAlert className="text-amber-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">The Gate System</h3>
              <p className="text-slate-400 leading-relaxed">
                The enforcement engine. A 7-stage pipeline that validates inputs, decisions, and
                authority before any action is taken.
                <br />
                <Link
                  href="/gate-system"
                  className="text-amber-500 hover:text-white text-sm font-bold mt-4 inline-flex items-center gap-1 border-b border-amber-500/30 pb-0.5 hover:border-amber-500 transition-all"
                >
                  View the Path of Resistance <ArrowRight size={14} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 bg-[#0B1120] border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-2">
              <FaqItem
                question="Is the kernel a proxy or a sidecar?"
                answer="It is an architectural wrapper that sits between the model and the world. It is not just a network proxy; it manages memory state, tool execution, and authority context."
              />
              <FaqItem
                question="Does runtime governance increase latency?"
                answer="Cosmocrat is optimized for high-throughput. Policy checks occur in microseconds. The latency introduced is negligible compared to the inference time of the model itself."
              />
              <FaqItem
                question="Can the AI bypass the kernel?"
                answer="No. In a standard deployment, the AI has no direct access to network or tools. It must request actions through the kernel, which enforces policy before execution."
              />
              <FaqItem
                question="How does it handle different models?"
                answer="Cosmocrat is model-agnostic. The kernel wraps the execution environment regardless of whether you are using OpenAI, Anthropic, or open-source models."
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
