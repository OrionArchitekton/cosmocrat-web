'use client';

import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  Database,
  ShieldAlert,
  Activity,
  AlertTriangle,
  CreditCard,
  Server,
  Workflow,
  User,
  RotateCcw,
  FileJson,
  Layers,
} from 'lucide-react';

export default function DecisionExhaustContent() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans">
      {/* Custom Styles */}
      <style>{`
        .blueprint-grid {
           background-image: 
              linear-gradient(rgba(51, 65, 85, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(51, 65, 85, 0.1) 1px, transparent 1px);
           background-size: 20px 20px;
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        .animate-flow {
           stroke-dasharray: 5;
           animation: dash-flow 1s linear infinite;
        }
      `}</style>

      {/* 1. Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        {/* Background Subtle Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="text-cosmo-accent text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cosmo-accent animate-pulse"></div>
              Control Plane
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ClickHouse governs data exhaust. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cosmo-accent">
                Cosmocrat governs decision exhaust.
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed">
              The control plane that enforces, records, and replays every AI and human
              decision—by policy, not convention.
            </p>
            <div className="flex gap-4 mb-4">
              <Link
                href="/waitlist"
                className="bg-cosmo-accent text-white px-6 py-3 rounded font-semibold hover:bg-amber-500 transition-colors"
              >
                Request Early Access
              </Link>
              <Link
                href="/docs"
                className="bg-slate-800 text-white px-6 py-3 rounded font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Docs
              </Link>
            </div>
            <p className="text-xs text-slate-500">Runs in your environment. Your keys. Your data.</p>
          </div>

          {/* Abstract Graphic Right */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 border border-slate-800 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-8 border border-cosmo-accent/20 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(217,119,6,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] duration-[1500ms]"></div>
                  <span className="text-9xl font-bold text-slate-800 group-hover:text-cosmo-accent/10 transition-colors">
                    C
                  </span>
                  <ShieldAlert className="absolute text-cosmo-accent w-16 h-16 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                </div>
              </div>
              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-cosmo-card border border-slate-700 p-2 rounded text-xs text-slate-400">
                Policy
              </div>
              <div className="absolute bottom-0 right-0 bg-cosmo-card border border-slate-700 p-2 rounded text-xs text-slate-400">
                Receipt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Definitional Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is decision exhaust?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Data exhaust captures <em>what</em> happened—logs, metrics, and traces of system
              events. Decision exhaust captures <em>why</em> it happened—the reasoning, policy
              evaluation, authority checks, and state transitions that led to an action.
            </p>
            <p className="text-slate-300 font-medium">
              Decision exhaust is the audit-grade record of every AI and human decision — including
              intent, policy evaluation, authority, execution, and outcome — produced at runtime.
            </p>
            <p>
              For deterministic software, logs are sufficient. For probabilistic AI agents that
              reason and act autonomously, data exhaust is blind to intent. You cannot audit an
              AI&apos;s decision to refund a customer by looking at a database transaction log
              alone; you need the governance record of the decision itself.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Governance Gap (Visual) */}
      <section className="py-24 bg-[#080a0f] border-b border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual: The Chaos */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-red-900/5 blur-[80px] rounded-full"></div>
              <div className="relative w-full aspect-[4/3] bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                {/* Chaos SVG */}
                <svg
                  className="absolute inset-0 w-full h-full text-red-500/20 pointer-events-none"
                  viewBox="0 0 400 300"
                >
                  <path
                    d="M 150 150 C 100 100, 50 200, 100 250 S 200 280, 250 200 S 300 100, 200 50 S 100 50, 150 150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="animate-[pulse_3s_infinite]"
                  />
                  <path
                    d="M 200 150 C 250 100, 350 150, 300 250 S 150 280, 100 200 S 50 100, 150 50 S 250 200, 200 150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="animate-[pulse_4s_infinite_reverse]"
                  />
                  <path
                    d="M 180 140 C 120 80, 80 180, 120 220 S 280 240, 280 160 S 220 80, 180 140"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />

                  {/* Connection to SQL */}
                  <path
                    d="M 160 150 L 80 150"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  {/* Connection to Payment */}
                  <path
                    d="M 240 150 L 320 150"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Central Agent Node */}
                <div className="relative z-10 w-28 h-28 bg-slate-950 rounded-full border-2 border-slate-700 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Ungoverned
                    </div>
                    <div className="text-white font-bold text-lg">AI Agent</div>
                  </div>
                  {/* Warning Icon Overlay */}
                  <div className="absolute -top-3 -right-3 bg-slate-900 text-red-500 p-2 rounded-full border border-red-500/50 shadow-lg">
                    <AlertTriangle size={18} />
                  </div>
                </div>

                {/* SQL Node */}
                <div className="absolute left-6 md:left-12 bg-slate-950 p-4 rounded-lg border border-red-900/50 flex flex-col items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.1)] z-10">
                  <Database size={20} className="text-slate-400" />
                  <span className="text-xs text-red-300 font-bold">SQL Query</span>
                </div>

                {/* Payment Node */}
                <div className="absolute right-6 md:right-12 bg-slate-950 p-4 rounded-lg border border-red-900/50 flex flex-col items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.1)] z-10">
                  <CreditCard size={20} className="text-slate-400" />
                  <span className="text-xs text-red-300 font-bold">Payment</span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded bg-red-900/20 border border-red-900/50 text-red-400 text-xs font-bold uppercase mb-6">
                The Governance Gap
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Agents don&apos;t just chat. <br />
                They execute.
              </h2>
              <p className="text-slate-400 text-lg mb-6">
                Decision exhaust exists whenever an agent reasons, calls tools, touches data, or
                executes actions. Without a control plane, these distinct events are ungoverned,
                unrecorded, and risky.
              </p>
              <div className="p-6 bg-slate-900 rounded border-l-4 border-red-500">
                <p className="text-slate-300 italic">
                  &quot;Experimental AI creates hallucinations; enterprise agents require audit
                  trails.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Architecture of Governance (Schematic) */}
      <section className="py-24 bg-slate-100 text-slate-900 border-y border-slate-300 relative overflow-hidden">
        {/* Light Mode "Blueprint" Background */}
        <div className="absolute inset-0 blueprint-grid pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Architecture of Governance</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A dedicated control plane for decisions, sitting alongside your data plane.
            </p>
          </div>

          {/* Diagram Container */}
          <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center">
            {/* LEFT: Business Apps */}
            <div className="md:col-span-3 relative z-10">
              <div className="bg-white border-2 border-slate-800 p-6 rounded shadow-[4px_4px_0px_rgba(30,41,59,1)]">
                <div className="text-sm font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wider">
                  Business Apps
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded border border-slate-300">
                      <Workflow size={16} />
                    </div>
                    <span className="font-mono text-sm">Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded border border-slate-300">
                      <Server size={16} />
                    </div>
                    <span className="font-mono text-sm">Workflows</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded border border-slate-300">
                      <User size={16} />
                    </div>
                    <span className="font-mono text-sm">Humans (CRM)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: Routing & Arrows (Desktop Only) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-between h-64 relative px-4">
              {/* Top Path */}
              <div className="absolute top-8 left-0 w-full h-8">
                <svg className="w-full h-full overflow-visible">
                  <path
                    d="M 0 15 C 50 15, 50 15, 100 15"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrow-slate)"
                  />
                  <text
                    x="50%"
                    y="-5"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-500 font-mono"
                  >
                    Logs, Metrics
                  </text>
                </svg>
              </div>

              {/* Bottom Path */}
              <div className="absolute bottom-8 left-0 w-full h-8">
                <svg className="w-full h-full overflow-visible">
                  <path
                    d="M 0 15 C 50 15, 50 15, 100 15"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    markerEnd="url(#arrow-orange)"
                  />
                  <text
                    x="50%"
                    y="30"
                    textAnchor="middle"
                    className="text-[10px] fill-amber-700 font-mono font-bold"
                  >
                    Prompts, Tools
                  </text>
                </svg>
              </div>

              {/* Feedback Path (Return) */}
              <div className="absolute bottom-[-2rem] left-[-2rem] w-[140%] h-16 pointer-events-none">
                <svg className="w-full h-full overflow-visible">
                  <path
                    d="M 100% 15 L 0 15"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrow-slate)"
                  />
                  <text
                    x="50%"
                    y="10"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-500 font-mono bg-slate-100 px-1"
                  >
                    Policies, Receipts
                  </text>
                </svg>
              </div>
            </div>

            {/* RIGHT: The Two Exhausts */}
            <div className="md:col-span-6 space-y-8 relative z-10">
              {/* Top: Data Exhaust */}
              <div className="bg-white border-2 border-slate-300 p-6 rounded flex items-center gap-6 relative">
                <div className="absolute -top-3 left-6 bg-slate-200 text-slate-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-slate-300">
                  Data Exhaust
                </div>
                <div className="p-3 bg-yellow-400 rounded-lg shadow-sm border border-yellow-500">
                  <Activity size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">ClickHouse</h3>
                  <p className="text-sm text-slate-500">Observability Speed Layer</p>
                </div>
              </div>

              {/* Bottom: Decision Exhaust */}
              <div className="bg-white border-2 border-amber-500 p-6 rounded flex items-center gap-6 shadow-[0_0_30px_rgba(217,119,6,0.15)] relative">
                <div className="absolute -top-3 left-6 bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Decision Exhaust
                </div>
                <div className="p-3 bg-slate-900 rounded-lg shadow-sm border border-slate-700">
                  <div className="text-amber-500 font-bold text-xl">C</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Cosmocrat</h3>
                  <p className="text-sm text-amber-700 font-medium">Decision Authority Plane</p>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Markers Definition */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <marker
                id="arrow-slate"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
              </marker>
              <marker
                id="arrow-orange"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. How It Works (Steps) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="flex items-center gap-4 mb-12">
          <Layers size={32} className="text-cosmo-accent" />
          <div>
            <h2 className="text-3xl font-bold text-white">The Governance Cycle</h2>
            <p className="text-slate-400">A single runtime path for every action.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-slate-900/50 p-6 rounded border-t-2 border-slate-700 hover:border-cosmo-accent transition-colors group h-full">
            <div className="text-xs font-mono text-slate-500 mb-4 group-hover:text-cosmo-accent">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Policy</h3>
            <div className="flex items-start gap-2 mb-4">
              <ShieldAlert size={16} className="text-cosmo-accent mt-1 shrink-0" />
              <p className="text-sm text-slate-400">
                Evaluate authority, limits, and context before execution.
              </p>
            </div>
            <div className="text-xs text-slate-600 mt-auto">Fail-closed by default.</div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/50 p-6 rounded border-t-2 border-slate-700 hover:border-cosmo-accent transition-colors group h-full">
            <div className="text-xs font-mono text-slate-500 mb-4 group-hover:text-cosmo-accent">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Enforce</h3>
            <div className="flex items-start gap-2 mb-4">
              <Activity size={16} className="text-cosmo-accent mt-1 shrink-0" />
              <p className="text-sm text-slate-400">
                Permit, block, retry, or escalate—across every tool and lane.
              </p>
            </div>
            <div className="text-xs text-slate-600 mt-auto">No silent failures.</div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/50 p-6 rounded border-t-2 border-slate-700 hover:border-cosmo-accent transition-colors group h-full">
            <div className="text-xs font-mono text-slate-500 mb-4 group-hover:text-cosmo-accent">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Receipt</h3>
            <div className="flex items-start gap-2 mb-4">
              <FileJson size={16} className="text-cosmo-accent mt-1 shrink-0" />
              <p className="text-sm text-slate-400">
                Produce an audit-grade record bound to inputs, policy, and outputs.
              </p>
            </div>
            <div className="text-xs text-slate-600 mt-auto">Cryptographically attributable.</div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/50 p-6 rounded border-t-2 border-slate-700 hover:border-cosmo-accent transition-colors group h-full">
            <div className="text-xs font-mono text-slate-500 mb-4 group-hover:text-cosmo-accent">
              04
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Rollback + Replay</h3>
            <div className="flex items-start gap-2 mb-4">
              <RotateCcw size={16} className="text-cosmo-accent mt-1 shrink-0" />
              <p className="text-sm text-slate-400">
                Reconstruct the full decision path and tighten policy from outcomes.
              </p>
            </div>
            <div className="text-xs text-slate-600 mt-auto">Continuous governance improvement.</div>
          </div>
        </div>
      </section>

      {/* 5. Receipts Visualization */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Receipts you can audit (and replay)</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            Every governed action produces an{' '}
            <Link href="/chronicle-receipts" className="text-cosmo-accent hover:underline">
              execution receipt
            </Link>
            : who/what/why, what policy evaluated, what state transitions occurred, and what
            actually happened.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-sm">
            {/* Left: Log Line */}
            <div className="bg-black border border-slate-800 p-6 rounded-lg h-full">
              <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider">
                Data Exhaust: A Log Line
              </div>
              <div className="text-slate-300 break-all mb-4">
                <span className="text-slate-500">2026-01-18T05:12:44Z</span> tool_call=refund_user
                amount=42.00 status=200 provider=stripe latency_ms=183
              </div>
              <div className="text-xs text-slate-600 mt-8">
                Useful for debugging. Not sufficient to prove authority.
              </div>
            </div>

            {/* Right: Receipt */}
            <div className="bg-[#1e1e1e] border border-cosmo-accent/30 p-6 rounded-lg shadow-lg relative">
              <div className="absolute top-0 right-0 w-2 h-full bg-cosmo-accent/10"></div>
              <div className="text-xs text-cosmo-accent mb-4 uppercase tracking-wider font-bold">
                Decision Exhaust: An Execution Receipt
              </div>

              <div className="space-y-3">
                <div className="flex border-b border-slate-700 pb-2">
                  <span className="w-24 text-slate-500 shrink-0">Status</span>
                  <span className="text-white font-bold">
                    APPROVED <span className="text-slate-500 font-normal">(fail-closed policy)</span>
                  </span>
                </div>
                <div className="flex border-b border-slate-700 pb-2">
                  <span className="w-24 text-slate-500 shrink-0">Policy</span>
                  <span className="text-blue-300">finance.refunds.l1 — limit: $50</span>
                </div>
                <div className="flex border-b border-slate-700 pb-2">
                  <span className="w-24 text-slate-500 shrink-0">Actor</span>
                  <span className="text-green-300">SupportBot-01 (authority: L1)</span>
                </div>
                <div className="flex border-b border-slate-700 pb-2">
                  <span className="w-24 text-slate-500 shrink-0">Action</span>
                  <span className="text-yellow-300">refund_user(user_id=U-1872, amount=$42)</span>
                </div>
                <div className="flex border-b border-slate-700 pb-2">
                  <span className="w-24 text-slate-500 shrink-0">Outcome</span>
                  <span className="text-white">stripe.refunds.create → ok (id=rf_9K2...)</span>
                </div>
                <div className="flex pt-2">
                  <span className="w-24 text-slate-500 shrink-0">Receipt</span>
                  <span className="text-slate-400">hash=9d7b... • replayable</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-800">
                Receipts make governance provable—not just observable. <br />
                Receipts establish intent, authority, and outcome—independent of system state.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ & Internal Links Cluster */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently asked questions</h2>
            <div className="space-y-2">
              <FaqItem
                question="What is decision exhaust vs data exhaust?"
                answer={
                  <>
                    <p className="mb-2">
                      Data exhaust is the byproduct of system operation (logs, traces). Decision
                      exhaust is the byproduct of governance (reasoning, policy checks, authority
                      grants).
                    </p>
                    <p>
                      One captures <em>what</em> happened. The other captures <em>why</em> it was
                      allowed.
                    </p>
                  </>
                }
              />
              <FaqItem
                question="Is decision exhaust the same as observability?"
                answer="No. Observability watches the system. Decision exhaust is the system's legal record. It provides auditability and replayability, not just visibility."
              />
              <FaqItem
                question="Why isn't logging enough for AI governance?"
                answer="Logs are mutable, unstructured, and reactive. Decision exhaust is immutable, structured, and causal—it links the intent to the outcome cryptographically."
              />
              <FaqItem
                question="Does decision exhaust increase latency or cost?"
                answer="Cosmocrat is designed for high-throughput runtime environments. Decision exhaust is captured asynchronously where possible, adding minimal overhead to the execution path."
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
