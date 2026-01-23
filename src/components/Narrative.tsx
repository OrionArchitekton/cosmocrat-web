'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Server,
  Shield,
  Activity,
  FileCode,
  Terminal,
  ShieldAlert,
  Database,
  Lock,
  Check,
  BrainCircuit,
} from 'lucide-react';

// Hook for scroll triggers
const useInView = (options = { threshold: 0.2 }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, hasEntered] as const;
};

export default function Narrative() {
  const [bridgeRef, bridgeVisible] = useInView({ threshold: 0.3 });
  const [featureRef, featureVisible] = useInView({ threshold: 0.4 });
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    if (featureVisible) {
      const delays = [
        setTimeout(() => setTerminalStep(1), 400),
        setTimeout(() => setTerminalStep(2), 1200),
        setTimeout(() => setTerminalStep(3), 2000),
        setTimeout(() => setTerminalStep(4), 3000),
      ];
      return () => delays.forEach(clearTimeout);
    }
  }, [featureVisible]);

  return (
    <>
      {/* 1. IMMEDIATE BRIDGE: Proof-of-Concept Layer */}
      <section
        ref={bridgeRef}
        className="py-24 bg-cosmo-dark border-b border-slate-900 relative z-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-700 ease-out transform ${
              bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Governance must happen at runtime{' '}
              <span className="text-slate-400">— not after failure.</span>
            </h2>
            <p
              className={`text-lg text-slate-400 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-150 ${
                bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Cosmocrat enforces authority, memory, and execution limits before AI actions occur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Tile 1 */}
            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[200ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${
                bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fail-Closed by Default</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Actions halt without authority. The system defaults to denial unless explicitly
                authorized.
              </p>
            </div>

            {/* Tile 2 */}
            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[300ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${
                bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Governed Memory</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Context is auditable, policy-bound, and non-transitive. Memory cannot bleed between
                isolated lanes.
              </p>
            </div>

            {/* Tile 3 */}
            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[400ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${
                bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors">
                <FileCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Execution with Receipts</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                If it isn&apos;t receipted, it didn&apos;t happen. Immutable, tamper-evident audit
                logs for every decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIENTATION: What You Get */}
      <section
        ref={featureRef}
        className="py-32 bg-gradient-to-b from-cosmo-dark to-slate-900/50 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column: Feature List */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">What you get</h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    icon: Shield,
                    title: 'Governance baked in',
                    desc: 'Fail-closed AI guardrails, drift protection, and audit-grade run records and execution receipts.',
                  },
                  {
                    step: 2,
                    icon: Server,
                    title: 'Cosmocrat Engine',
                    desc: 'Workers, governed AI memory, and orchestration that run inside your environment.',
                  },
                  {
                    step: 3,
                    icon: Activity,
                    title: 'Cosmocrat API',
                    desc: 'The stable interface your client and Integrations call.',
                  },
                  {
                    step: 4,
                    icon: Terminal,
                    title: 'Cosmocrat Client',
                    desc: 'The default interface your team uses daily with human-in-the-loop AI controls.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`group flex gap-5 p-4 rounded-xl transition-all duration-500 ${
                      terminalStep === item.step
                        ? 'bg-slate-800/50 border border-slate-700/50'
                        : 'border border-transparent'
                    }`}
                  >
                    <div
                      className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                        terminalStep === item.step
                          ? 'bg-cosmo-accent text-white scale-110'
                          : 'bg-slate-800 text-cosmo-accent'
                      }`}
                    >
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          terminalStep === item.step ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Visualization */}
            <div
              className={`relative transition-all duration-1000 ${
                featureVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="absolute inset-0 bg-cosmo-accent/5 blur-3xl rounded-full" />
              <div className="relative bg-[#0f1219] border border-slate-800 rounded-xl p-8 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">cosmocrat-engine (running)</div>
                </div>

                <div className="space-y-4 font-mono text-sm min-h-[220px]">
                  {terminalStep >= 1 && (
                    <div className="flex gap-2 items-center animate-fade-in">
                      <span className="text-green-500 font-bold">➜</span>
                      <span className="text-slate-300">Initializing governance protocols...</span>
                    </div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="flex gap-2 items-center animate-fade-in">
                      <Check size={14} className="text-green-500" />
                      <span className="text-slate-300">Memory bounds enforced</span>
                    </div>
                  )}
                  {terminalStep >= 3 && (
                    <div className="flex gap-2 items-center animate-fade-in">
                      <Check size={14} className="text-green-500" />
                      <span className="text-slate-300">Audit logging active</span>
                    </div>
                  )}
                  {terminalStep >= 4 && (
                    <div className="p-4 bg-slate-900/80 rounded border border-slate-700/50 mt-6 text-xs text-slate-400 relative">
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <pre className="overflow-x-auto">
                        {`{
  "run_id": "exec_9921_af",
  "status": "APPROVED",
  "policy_check": "PASS",
  "memory_context": "isolated"
}`}
                      </pre>
                    </div>
                  )}
                  {terminalStep < 4 && (
                    <div className="w-2 h-4 bg-slate-500 animate-pulse mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Links */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Governed AI OS Platform
          </h2>
          <p className="text-xl text-cosmo-accent text-center mb-16 uppercase tracking-widest text-sm font-bold">
            The Authority Plane
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/memory-infrastructure',
                icon: Database,
                title: 'Memory as Infrastructure',
                desc: 'Persistent AI memory that survives sessions, tools, and time. Managed as a governed resource, not a chat cache.',
              },
              {
                href: '/decision-exhaust',
                icon: FileCode,
                title: 'Decision Exhaust',
                desc: 'Reasoning steps are a primary data asset. Capture governed run records for every action.',
              },
              {
                href: '/runtime-governance',
                icon: Terminal,
                title: 'Runtime Governance',
                desc: 'Execution cannot outrun governance. The OS kernel enforces policy at the runtime layer.',
              },
              {
                href: '/gate-system',
                icon: Lock,
                title: 'Gate System',
                desc: 'The 7-stage pipeline. Validate inputs, form decisions, check authority, and verify truth.',
              },
              {
                href: '/chronicle-receipts',
                icon: FileCode,
                title: 'Chronicle Receipts',
                desc: "If it's not receipted, it didn't happen. Immutable, tamper-evident audit logs.",
              },
              {
                href: '/drift-guard',
                icon: ShieldAlert,
                title: 'Drift Guard',
                desc: 'Detect and halt behavioral drift, policy drift, and authority decay before failure.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
