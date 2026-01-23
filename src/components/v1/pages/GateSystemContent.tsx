'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  ShieldCheck,
  BrainCircuit,
  Key,
  Zap,
  Database,
  GitCommit,
  Lock,
  CheckCircle,
  Network,
  Loader2,
} from 'lucide-react';

// Gate Node Component
const GateNode = ({
  id,
  label,
  color,
  icon: Icon,
  status,
  isMajor,
}: {
  id: string;
  label: string;
  color: string;
  icon: React.ElementType;
  status: 'idle' | 'processing' | 'completed';
  isMajor?: boolean;
}) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'processing':
        return 'gate-active z-10';
      case 'completed':
        return 'gate-completed';
      default:
        return 'gate-idle';
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-3 relative transition-all duration-500 ${
        isMajor ? 'scale-110' : ''
      }`}
    >
      {/* Node Circle */}
      <div
        className={`
          w-16 h-16 rounded-full border-2 flex items-center justify-center 
          transition-all duration-500 bg-slate-900
          ${getStatusClasses()}
        `}
        style={{ '--glow-color': color } as React.CSSProperties}
      >
        <Icon size={24} style={{ color: `rgb(${color})` }} />
      </div>

      {/* Label */}
      <div
        className={`text-center transition-opacity duration-500 ${
          status === 'idle' ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <div className="text-xs font-bold" style={{ color: `rgb(${color})` }}>
          {id}
        </div>
        <div className="text-sm font-medium text-slate-300">{label}</div>
      </div>

      {/* Status Badge (Absolute) */}
      {status === 'processing' && (
        <div className="absolute -top-3 px-2 py-0.5 bg-slate-900 border border-white/20 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
          <Loader2 size={10} className="animate-spin text-white" />
          <span className="text-[10px] font-bold text-white">PROC</span>
        </div>
      )}
      {status === 'completed' && (
        <div className="absolute -top-3 px-2 py-0.5 bg-slate-900 border border-green-500/30 rounded-full flex items-center gap-1 shadow-lg">
          <CheckCircle size={10} className="text-green-500" />
          <span className="text-[10px] font-bold text-green-500">PASS</span>
        </div>
      )}
    </div>
  );
};

// Connector Component
const Connector = ({
  large,
  status,
}: {
  large?: boolean;
  status: 'idle' | 'processing' | 'completed';
}) => {
  const widthClass = large ? 'w-16' : 'w-8';

  // If status is 'processing' or 'completed', the line is lit
  const isLit = status === 'completed' || status === 'processing';

  return (
    <div
      className={`${widthClass} h-[2px] bg-slate-800 relative overflow-hidden rounded-full`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-transform duration-700 ease-out"
        style={{
          transform: isLit ? 'translateX(0%)' : 'translateX(-100%)',
          opacity: isLit ? 1 : 0,
        }}
      ></div>
      {/* Solid fill after animation */}
      <div
        className="absolute inset-0 bg-slate-600 transition-opacity duration-500 delay-300"
        style={{ opacity: status === 'completed' ? 1 : 0 }}
      ></div>
    </div>
  );
};

export default function GateSystemContent() {
  const [activeStep, setActiveStep] = useState(0);

  // Simulation Loop: Cycle through Gates 0-6 then pause/reset
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 9); // 7 steps + 2 steps pause
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const getStatus = (gateIndex: number) => {
    if (activeStep === gateIndex) return 'processing';
    if (activeStep > gateIndex && activeStep < 7) return 'completed';
    return 'idle';
  };

  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans text-slate-200">
      {/* Add Component Styles */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--glow-color), 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(var(--glow-color), 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--glow-color), 0); }
        }
        .gate-active {
           animation: pulse-ring 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
           border-color: rgba(var(--glow-color), 1) !important;
           background: rgba(var(--glow-color), 0.1);
        }
        .gate-completed {
           border-color: rgba(var(--glow-color), 0.5);
           background: rgba(var(--glow-color), 0.05);
           opacity: 1;
        }
        .gate-idle {
           border-color: #1e293b;
           opacity: 0.4;
           transform: scale(0.95);
        }
        .connector-line {
           transition: width 0.5s ease, background-color 0.5s ease;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        {/* Background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-cosmo-accent mb-6 uppercase tracking-widest">
            System Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            The Path of Resistance.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            Power comes from delegation. Safety comes from restraint. <br />
            Cosmocrat forces every AI action through a 7-stage governance pipeline.
          </p>
          <p className="text-lg text-amber-500 font-medium mb-10">
            Every AI decision must earn the right to become an action.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is the Gate System?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              The Gate System is Cosmocrat&apos;s runtime enforcement pipeline. It creates a
              deterministic boundary between reasoning and action, ensuring that no AI capability
              executes without explicit permission.
            </p>
            <p>
              Operating within{' '}
              <Link
                href="/runtime-governance"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Runtime Governance
              </Link>
              , the system enforces a 7-stage sequence spanning input, memory, decisioning,
              authorization, execution, and outcome. It evaluates authority, risk, intent, and
              eligibility in real-time.
            </p>
            <p>
              Unlike monitoring tools that alert after failure, the Gate System halts by default.
              Every check produces{' '}
              <Link
                href="/decision-exhaust"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Decision Exhaust
              </Link>
              , providing cryptographic proof of why an action was allowed or blocked. For long-term
              alignment, this data feeds into{' '}
              <Link
                href="/drift-guard"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Drift Guard
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* The Gates Visualization (Live Simulation) */}
      <section className="py-24 bg-slate-950 border-b border-slate-900 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 min-w-[1000px]">
          <div className="flex justify-between items-center relative">
            {/* G0-G1: Input & Memory (Blue) */}
            <div className="flex items-center gap-4 relative p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <div className="absolute -top-3 left-4 text-blue-500 text-[10px] font-bold tracking-widest uppercase bg-slate-950 px-2 border border-blue-900/30 rounded">
                Input & Memory
              </div>

              <GateNode
                id="G0"
                label="Input"
                color="59, 130, 246"
                icon={GitCommit}
                status={getStatus(0)}
              />

              <Connector status={getStatus(0)} />

              <GateNode
                id="G1"
                label="Memory"
                color="59, 130, 246"
                icon={Database}
                status={getStatus(1)}
              />
            </div>

            <Connector large status={getStatus(1)} />

            {/* G2-G3: Decision (Orange) */}
            <div className="flex items-center gap-4 relative p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <div className="absolute -top-3 left-4 text-orange-500 text-[10px] font-bold tracking-widest uppercase bg-slate-950 px-2 border border-orange-900/30 rounded">
                Decision
              </div>
              <GateNode
                id="G2"
                label="Formation"
                color="249, 115, 22"
                icon={BrainCircuit}
                status={getStatus(2)}
              />

              <Connector status={getStatus(2)} />

              <GateNode
                id="G3"
                label="Eligibility"
                color="249, 115, 22"
                icon={ShieldCheck}
                status={getStatus(3)}
              />
            </div>

            <Connector large status={getStatus(3)} />

            {/* G4: Auth (Yellow) */}
            <div className="flex items-center gap-4 relative p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <div className="absolute -top-3 left-4 text-yellow-500 text-[10px] font-bold tracking-widest uppercase bg-slate-950 px-2 border border-yellow-900/30 rounded">
                Auth
              </div>
              <GateNode
                id="G4"
                label="Human Auth"
                color="234, 179, 8"
                icon={Key}
                isMajor
                status={getStatus(4)}
              />
            </div>

            <Connector large status={getStatus(4)} />

            {/* G5-G6: Exec (Green) */}
            <div className="flex items-center gap-4 relative p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <div className="absolute -top-3 left-4 text-green-500 text-[10px] font-bold tracking-widest uppercase bg-slate-950 px-2 border border-green-900/30 rounded">
                Execution
              </div>
              <GateNode
                id="G5"
                label="Execution"
                color="34, 197, 94"
                icon={Zap}
                status={getStatus(5)}
              />

              <Connector status={getStatus(5)} />

              <GateNode
                id="G6"
                label="Truth"
                color="34, 197, 94"
                icon={CheckCircle}
                status={getStatus(6)}
              />
            </div>
          </div>

          {/* Status Text / Legend */}
          <div className="flex justify-center mt-12 gap-8 text-xs font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <span className="text-slate-500">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              <span className="text-amber-500">Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-white">Passed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Intelligence vs Authority */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-cosmo-accent font-bold mb-2 tracking-wider uppercase text-sm">
            G2 vs G3
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Intelligence vs. Authority</h2>
          <p className="text-lg text-slate-400 mb-6">
            Most AI systems conflate &quot;can I do this?&quot; (capability) with &quot;may I do
            this?&quot; (permission). Cosmocrat separates them into distinct gates.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded border-l-4 border-orange-500/50">
              <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                <BrainCircuit size={20} className="text-orange-400" /> G2: Decision Formation
              </h3>
              <p className="text-slate-400 text-sm">
                Is the reasoning valid? Checks confidence, completeness, and logical soundness.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded border-l-4 border-orange-500">
              <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                <ShieldCheck size={20} className="text-orange-500" /> G3: Execution Eligibility
              </h3>
              <p className="text-slate-400 text-sm">
                May this touch the real world? Checks execution mode, risk class, and policy limits.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 italic">
            Most AI decisions die at G3—safely.
          </p>
        </div>

        <div className="relative h-96 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
          {/* Abstract Visual: Brain hitting a Wall */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center animate-pulse">
              <BrainCircuit size={64} className="text-orange-400" />
            </div>
            <div className="h-full w-1 bg-gradient-to-b from-transparent via-slate-600 to-transparent h-64 mx-4 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 border border-slate-600 p-2 rounded text-xs whitespace-nowrap text-slate-400">
                Policy Wall
              </div>
            </div>
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center grayscale opacity-50">
              <Zap size={64} className="text-slate-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: The Operator Plane (G4) */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md bg-slate-950 border border-amber-500/30 p-8 rounded-xl shadow-[0_0_50px_rgba(217,119,6,0.1)]">
              <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
                <Key size={40} className="text-amber-500" />
                <div>
                  <div className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                    Gate 4
                  </div>
                  <h3 className="text-xl font-bold text-white">Human Authorization</h3>
                </div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Risk Level</span>
                  <span className="text-red-400">HIGH (Level 3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Policy</span>
                  <span className="text-slate-300">finance.transfer &gt; $1000</span>
                </div>
                <div className="mt-6 p-4 bg-amber-900/10 border border-amber-900/30 rounded text-amber-200">
                  WARNING: Explicit human approval required for state transition.
                </div>
                <div className="pt-4 flex gap-4">
                  <button className="flex-1 bg-amber-600 text-white py-2 rounded font-bold hover:bg-amber-500 transition-colors">
                    APPROVE
                  </button>
                  <button className="flex-1 bg-slate-800 text-slate-300 py-2 rounded hover:bg-slate-700 transition-colors">
                    DENY
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-cosmo-accent font-bold mb-2 tracking-wider uppercase text-sm">
              The Operator Plane
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Humans do not &quot;monitor&quot;. <br />
              They authorize.
            </h2>
            <p className="text-lg text-slate-400 mb-6">
              Monitoring is passive; by the time you see the log, the money is gone. Cosmocrat
              inserts human authorization directly into the runtime loop (G4).
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-amber-500 mt-1 shrink-0" size={18} />
                <span className="text-slate-300">Required when Risk &gt; Threshold</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-amber-500 mt-1 shrink-0" size={18} />
                <span className="text-slate-300">Required for new policy generation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-amber-500 mt-1 shrink-0" size={18} />
                <span className="text-slate-300">
                  Required for first-time actions (trust-on-first-use)
                </span>
              </li>
            </ul>
            <div className="mt-8 p-4 border border-slate-700 rounded bg-slate-800/50">
              <p className="text-sm text-slate-300">
                <strong>Crucial Distinction:</strong> If authorization is missing, the system halts.
                It does not default to &quot;allow&quot; or &quot;warn&quot;. It fails closed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restraint by Design */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Restraint by Design</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Most platforms glue agents together and hope for alignment. Cosmocrat centralizes
            authority and treats execution as a privilege, not a right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-900/20 p-8 rounded-xl border border-slate-800 flex flex-col items-center text-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="mb-8 relative w-64 h-48">
              {/* Chaotic Network SVG */}
              <Network
                size={120}
                className="text-slate-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                strokeWidth={1}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-slate-900 px-2 py-1 text-xs text-slate-500">
                  Unbounded Connection
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">The Status Quo</h3>
            <p className="text-sm text-slate-500">
              Messy, implicit permissions. Agents talking to agents without oversight.
            </p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-xl border border-cosmo-accent/30 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cosmo-accent to-transparent"></div>
            <div className="mb-8 relative w-64 h-48 flex items-center justify-center">
              {/* Hierarchy SVG Placeholder */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-cosmo-accent shadow-[0_0_10px_orange]"></div>
                <div className="flex gap-8">
                  <div className="w-1 h-8 bg-slate-700"></div>
                  <div className="w-1 h-8 bg-slate-700"></div>
                </div>
                <div className="flex gap-16">
                  <div className="w-3 h-3 rounded bg-slate-400"></div>
                  <div className="w-3 h-3 rounded bg-slate-400"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cosmocrat</h3>
            <p className="text-sm text-slate-400">
              Governed Architecture. Strict hierarchy. Explicit delegation.
            </p>
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
                question="Why are there 7 gates?"
                answer="The 7-stage pipeline (Input, Memory, Formation, Eligibility, Auth, Execution, Truth) ensures that every aspect of an action—from its context to its outcome—is validated separately. This prevents 'bundled' failures where a bad decision slips through because the syntax was correct."
              />
              <FaqItem
                question="What happens if a gate fails?"
                answer="The system fails closed. The action is blocked, a receipt is generated explaining the failure (e.g., 'Policy Violation: Limit Exceeded'), and the event is recorded in Decision Exhaust."
              />
              <FaqItem
                question="Can I customize the gates?"
                answer="Yes, via policy configuration. For low-risk dev environments, you might relax G4 (Human Auth) or G6 (Truth), but G0-G3 are structural and always active."
              />
              <FaqItem
                question="Does this replace my existing evals?"
                answer="Cosmocrat complements offline evaluations. Evals test model capability before deployment; the Gate System enforces safety during runtime execution."
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
