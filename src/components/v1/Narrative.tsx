'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Server,
  Shield,
  Activity,
  FileCode,
  Terminal,
  FileText,
  ShieldAlert,
  Database,
  Lock,
  Check,
  BrainCircuit,
} from 'lucide-react';

// --- Internal Hook for Scroll Triggers ---
const useInView = (options = { threshold: 0.2 }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { threshold } = options;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, hasEntered] as const;
};

export default function Narrative() {
  const [bridgeRef, bridgeVisible] = useInView({ threshold: 0.3 });
  const [featureRef, featureVisible] = useInView({ threshold: 0.4 });
  const [terminalStep, setTerminalStep] = useState(0);
  const [deploymentRef, deploymentVisible] = useInView({ threshold: 0.4 });
  const [devModeRef, devModeVisible] = useInView({ threshold: 0.3 });
  const [outcomesRef, outcomesVisible] = useInView({ threshold: 0.3 });

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
      <style>{`
        @keyframes shimmer-sweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer-text {
          background: linear-gradient(90deg, #94a3b8 0%, #ffffff 50%, #94a3b8 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer-sweep 3s ease-out forwards;
        }
        @keyframes stamp-in {
          0% { opacity: 0; transform: scale(0.95); }
          60% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-stamp {
          animation: stamp-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .reveal-line {
          animation: fade-slide-up 0.3s ease-out forwards;
        }
        @keyframes fade-slide-up {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-width {
          from { width: 0; }
          to { width: 60px; }
        }
        .animate-draw-line {
          animation: draw-width 0.45s ease-out forwards;
        }
        @keyframes pulse-once {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-pulse-point {
          animation: pulse-once 0.5s ease-out 0.45s forwards;
        }
        @keyframes ignite-stroke {
          0% { stroke-opacity: 0.5; filter: drop-shadow(0 0 0 rgba(217,119,6,0)); }
          100% { stroke-opacity: 1; filter: drop-shadow(0 0 8px rgba(217,119,6,0.5)); }
        }
        .animate-ignite {
          animation: ignite-stroke 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }
        @keyframes reveal-card {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-card {
          animation: reveal-card 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes icon-enter {
           from { opacity: 0; transform: translateX(-8px); }
           to { opacity: 1; transform: translateX(0); }
        }
        .animate-icon-enter {
           animation: icon-enter 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes draw-divider {
          from { height: 0; opacity: 0; }
          to { height: 100%; opacity: 1; }
        }
        .animate-divider {
          animation: draw-divider 0.35s ease-out forwards;
        }
      `}</style>

      {/* 1. IMMEDIATE BRIDGE: Proof-of-Concept Layer */}
      <section
        ref={bridgeRef}
        className="py-24 bg-cosmo-dark border-b border-slate-900 relative z-20 overflow-hidden"
      >
        <div
          className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent transition-opacity duration-1000 ${bridgeVisible ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-700 ease-out transform ${bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Governance must happen at runtime <br className="md:hidden" />
              <span className={bridgeVisible ? 'animate-shimmer-text' : 'text-slate-400'}>
                — not after failure.
              </span>
            </h2>
            <p
              className={`text-lg text-slate-400 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-150 ${bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Cosmocrat enforces authority, memory, and execution limits before AI actions occur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[200ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors group-hover:scale-105 duration-300">
                <ShieldAlert
                  size={24}
                  className="transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors">
                Fail-Closed by Default
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                Actions halt without authority. The system defaults to denial unless explicitly
                authorized.
              </p>
            </div>

            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[300ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors group-hover:scale-110 duration-300">
                <Database
                  size={24}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors">
                Governed Memory
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                Context is auditable, policy-bound, and non-transitive. Memory cannot bleed between
                isolated lanes.
              </p>
            </div>

            <div
              className={`p-8 bg-slate-900/40 rounded-xl border border-slate-800 transition-all duration-500 delay-[400ms] group hover:border-slate-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)] hover:bg-slate-900/60 ${bridgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-cosmo-accent mb-6 group-hover:text-amber-400 transition-colors group-hover:scale-105 duration-300">
                <FileCode
                  size={24}
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors">
                Execution with Receipts
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                If it isn&apos;t receipted, it didn&apos;t happen. Immutable, tamper-evident audit
                logs for every decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIENTATION: What You Get (Outcomes) */}
      <section
        ref={featureRef}
        className="py-32 bg-gradient-to-b from-cosmo-dark to-slate-900/50 border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">What you get</h2>
              <div className="space-y-6">
                <div
                  className={`group flex gap-5 p-4 rounded-xl transition-all duration-500 ${terminalStep === 1 ? 'bg-slate-800/50 border border-slate-700/50' : 'border border-transparent'}`}
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${terminalStep === 1 ? 'bg-cosmo-accent text-white scale-110' : 'bg-slate-800 text-cosmo-accent'}`}
                  >
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${terminalStep === 1 ? 'text-white' : 'text-slate-300'}`}
                    >
                      Governance baked in
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                      Fail-closed AI guardrails, drift protection, and audit-grade run records and
                      execution receipts.
                    </p>
                  </div>
                </div>

                <div
                  className={`group flex gap-5 p-4 rounded-xl transition-all duration-500 ${terminalStep === 2 ? 'bg-slate-800/50 border border-slate-700/50' : 'border border-transparent'}`}
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${terminalStep === 2 ? 'bg-cosmo-accent text-white scale-110' : 'bg-slate-800 text-cosmo-accent'}`}
                  >
                    <Server size={20} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${terminalStep === 2 ? 'text-white' : 'text-slate-300'}`}
                    >
                      Cosmocrat Engine
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                      Workers, governed AI memory, and orchestration that run inside your
                      environment.
                    </p>
                  </div>
                </div>

                <div
                  className={`group flex gap-5 p-4 rounded-xl transition-all duration-500 ${terminalStep === 3 ? 'bg-slate-800/50 border border-slate-700/50' : 'border border-transparent'}`}
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${terminalStep === 3 ? 'bg-cosmo-accent text-white scale-110' : 'bg-slate-800 text-cosmo-accent'}`}
                  >
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${terminalStep === 3 ? 'text-white' : 'text-slate-300'}`}
                    >
                      Cosmocrat API
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                      The stable interface your client and Integrations call.
                    </p>
                  </div>
                </div>

                <div
                  className={`group flex gap-5 p-4 rounded-xl transition-all duration-500 ${terminalStep === 4 ? 'bg-slate-800/50 border border-slate-700/50' : 'border border-transparent'}`}
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${terminalStep === 4 ? 'bg-cosmo-accent text-white scale-110' : 'bg-slate-800 text-cosmo-accent'}`}
                  >
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${terminalStep === 4 ? 'text-white' : 'text-slate-300'}`}
                    >
                      Cosmocrat Client
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                      The default interface your team uses daily with human-in-the-loop AI controls.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 ${featureVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
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
                    <div className="flex gap-2 items-center reveal-line">
                      <span className="text-green-500 font-bold">➜</span>
                      <span className="text-slate-300">Initializing governance protocols...</span>
                    </div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="flex gap-2 items-center reveal-line">
                      <Check size={14} className="text-green-500" />
                      <span className="text-slate-300">Memory bounds enforced</span>
                    </div>
                  )}
                  {terminalStep >= 3 && (
                    <div className="flex gap-2 items-center reveal-line">
                      <Check size={14} className="text-green-500" />
                      <span className="text-slate-300">Audit logging active</span>
                    </div>
                  )}
                  {terminalStep >= 4 && (
                    <div className="p-4 bg-slate-900/80 rounded border border-slate-700/50 mt-6 text-xs text-slate-400 animate-stamp relative">
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

      {/* 3. DEPTH & SEO: Visually Demoted Explanation */}
      <section className="py-20 bg-cosmo-dark border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">
            Most AI systems lack governance. Most memory drifts.
          </h2>

          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-sm leading-7 space-y-6">
            <p>
              Ad-hoc pipelines and stateless assistants create gaps in AI execution governance. When
              controls are bolted on after deployment, auditability and AI risk control are
              inconsistent. Without runtime governance, AI systems drift silently and liability
              accumulates invisibly. Cosmocrat makes enterprise AI governance operational:
              fail-closed AI, drift protection, and an AI audit trail by default.
            </p>
            <div className="w-24 h-px bg-slate-800 mx-auto my-8"></div>
            <p>
              Cosmocrat is an AI operating system for enterprise governance, memory, and execution
              control. It is the control plane that sits below your agents and chat interfaces,
              managing the lifecycle of memory, enforcing authority boundaries, and recording
              execution receipts independently of the model provider.
            </p>
            <p>
              Unlike chatbots or stateless toolchains, Cosmocrat provides a persistent runtime
              environment where governance is architectural. It ensures that execution limits and
              memory context are enforced by the system kernel, not by the model itself.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Governed AI OS Platform - The Authority Plane */}
      <section className="py-24 bg-cosmo-dark border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Governed AI OS Platform
          </h2>
          <p className="text-xl text-cosmo-accent text-center mb-16 uppercase tracking-widest text-sm font-bold">
            The Authority Plane
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/memory-infrastructure"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Memory as Infrastructure
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Persistent AI memory that survives sessions, tools, and time. Managed as a governed
                resource, not a chat cache.
              </p>
            </Link>

            <Link
              href="/decision-exhaust"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Decision Exhaust
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reasoning steps are a primary data asset. Capture governed run records for every
                action.
              </p>
            </Link>

            <Link
              href="/runtime-governance"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Runtime Governance
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Execution cannot outrun governance. The OS kernel enforces policy at the runtime
                layer.
              </p>
            </Link>

            <Link
              href="/gate-system"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Gate System
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The 7-stage pipeline. Validate inputs, form decisions, check authority, and verify
                truth.
              </p>
            </Link>

            <Link
              href="/chronicle-receipts"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <FileCode size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Chronicle Receipts
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                If it&apos;s not receipted, it didn&apos;t happen. Immutable, tamper-evident audit
                logs.
              </p>
            </Link>

            <Link
              href="/drift-guard"
              className="group bg-slate-900/40 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white transition-colors group-hover:bg-slate-700">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmo-accent transition-colors">
                Drift Guard
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Detect and halt behavioral drift, policy drift, and authority decay before failure.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Standard Deployment */}
      <section ref={deploymentRef} className="py-24 bg-cosmo-card border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Standard Deployment (Default)
              </h2>
              <div className="prose prose-invert text-slate-400 mb-6">
                <p>
                  Deploy the Cosmocrat Engine + API in your environment. Your team uses the
                  Cosmocrat Client to connect securely to your backend.
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-cosmo-accent mt-1" />
                  <span className="text-slate-300">Your engine. Your keys. Your data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-cosmo-accent mt-1" />
                  <span className="text-slate-300">
                    Authorization and run records stay with you — cryptographically bound and
                    replayable. We don&apos;t require access to your databases or infrastructure.
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 flex justify-center">
              <svg
                className="w-full max-w-md text-slate-600"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask id="line-mask">
                    <rect x="170" y="140" width="60" height="20" fill="black" />
                    <rect
                      x="170"
                      y="140"
                      width="60"
                      height="20"
                      fill="white"
                      className={deploymentVisible ? 'animate-draw-line' : 'w-0'}
                    />
                  </mask>
                </defs>

                <rect
                  x="50"
                  y="50"
                  width="120"
                  height="200"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="#0B1120"
                />
                <text x="110" y="150" textAnchor="middle" fill="currentColor" fontSize="14">
                  Your Env
                </text>

                <rect
                  x="230"
                  y="100"
                  width="120"
                  height="100"
                  rx="4"
                  stroke="#D97706"
                  strokeWidth="2"
                  fill="#151F32"
                  className={deploymentVisible ? 'animate-ignite' : 'opacity-50'}
                  style={{ strokeOpacity: 0.5 }}
                />
                <text
                  x="290"
                  y="145"
                  textAnchor="middle"
                  fill="#D97706"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Cosmocrat
                </text>
                <text x="290" y="165" textAnchor="middle" fill="#D97706" fontSize="12">
                  Engine
                </text>

                <path
                  d="M170 150 L 230 150"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  mask="url(#line-mask)"
                />
                <circle
                  cx="230"
                  cy="150"
                  r="3"
                  fill="#D97706"
                  className={`opacity-0 ${deploymentVisible ? 'animate-pulse-point' : ''}`}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Developer Mode */}
      <section ref={devModeRef} className="py-24 bg-cosmo-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Developer Mode (Advanced)
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
            Prefer a custom client or direct integrations? Use the Cosmocrat API with your own UI
            while keeping AI execution governance intact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`bg-slate-900/50 p-8 rounded-lg border border-slate-800 text-left hover:border-cosmo-accent group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${devModeVisible ? 'animate-reveal-card' : 'opacity-0'}`}
              style={{ animationDelay: '0ms' }}
            >
              <FileCode
                className={`w-10 h-10 text-cosmo-accent mb-4 ${devModeVisible ? 'animate-icon-enter' : 'opacity-0'}`}
              />
              <h3 className="text-xl font-bold text-white mb-2">Bring your own client</h3>
              <p className="text-slate-400">
                Use the Cosmocrat API to power a custom UI and workflow tailored to your team.
              </p>
            </div>

            <div
              className={`bg-slate-900/50 p-8 rounded-lg border border-slate-800 text-left hover:border-cosmo-accent group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${devModeVisible ? 'animate-reveal-card' : 'opacity-0'}`}
              style={{ animationDelay: '150ms' }}
            >
              <BrainCircuit
                className={`w-10 h-10 text-cosmo-accent mb-4 ${devModeVisible ? 'animate-icon-enter' : 'opacity-0'}`}
                style={{ animationDelay: '150ms' }}
              />
              <h3 className="text-xl font-bold text-white mb-2">API-first integrations</h3>
              <p className="text-slate-400">
                Connect directly to your systems while keeping governance and run records intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Operational Outcomes */}
      <section ref={outcomesRef} className="py-24 bg-cosmo-card border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
            Operational outcomes for governed AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article
              className={`relative p-6 pl-8 bg-slate-900/30 ${outcomesVisible ? 'animate-reveal-card' : 'opacity-0'}`}
              style={{ animationDelay: '0ms' }}
            >
              <div
                className={`absolute left-0 top-0 w-0.5 bg-cosmo-accent ${outcomesVisible ? 'animate-divider' : 'h-0'}`}
              ></div>
              <h3 className="text-xl font-bold text-white mb-3">Fail-closed</h3>
              <p className="text-slate-400">
                AI guardrails that stop unsafe actions instead of failing silently. The system
                defaults to denial unless explicitly authorized.
              </p>
            </article>

            <article
              className={`relative p-6 pl-8 bg-slate-900/30 ${outcomesVisible ? 'animate-reveal-card' : 'opacity-0'}`}
              style={{ animationDelay: '120ms' }}
            >
              <div
                className={`absolute left-0 top-0 w-0.5 bg-cosmo-accent ${outcomesVisible ? 'animate-divider' : 'h-0'}`}
                style={{ animationDelay: '120ms' }}
              ></div>
              <h3 className="text-xl font-bold text-white mb-3">Auditable</h3>
              <p className="text-slate-400">
                Auditable AI systems with run records you can inspect and trust. Every decision
                point creates a decision exhaust trail.
              </p>
            </article>

            <article
              className={`relative p-6 pl-8 bg-slate-900/30 ${outcomesVisible ? 'animate-reveal-card' : 'opacity-0'}`}
              style={{ animationDelay: '240ms' }}
            >
              <div
                className={`absolute left-0 top-0 w-0.5 bg-cosmo-accent ${outcomesVisible ? 'animate-divider' : 'h-0'}`}
                style={{ animationDelay: '240ms' }}
              ></div>
              <h3 className="text-xl font-bold text-white mb-3">Persistent</h3>
              <p className="text-slate-400">
                Persistent AI memory that survives sessions, tools, and time, managed as a governed
                resource, not a chat cache.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
