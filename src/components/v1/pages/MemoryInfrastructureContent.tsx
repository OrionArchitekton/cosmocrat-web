'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FaqItem from '../FaqItem';
import {
  Database,
  Layers,
  Lock,
  Eye,
  ShieldAlert,
  Box,
  GitBranch,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Server,
} from 'lucide-react';

// Memory Lane Visual Component
const MemoryLane = ({
  name,
  color,
  items,
  isActive,
}: {
  name: string;
  color: string;
  items: string[];
  isActive: boolean;
}) => {
  return (
    <div
      className={`
        bg-slate-900/50 border rounded-lg p-4 transition-all duration-300
        ${isActive ? 'border-amber-500/50 shadow-[0_0_20px_rgba(217,119,6,0.1)]' : 'border-slate-800'}
      `}
      style={{ borderLeftColor: isActive ? color : undefined, borderLeftWidth: isActive ? 4 : 1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Box size={14} style={{ color }} />
          <span className="text-sm font-bold text-white">{name}</span>
        </div>
        {isActive && (
          <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
            ACTIVE
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`text-xs px-2 py-1 rounded ${
              isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-900 text-slate-500'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Access Request Visual
const AccessRequest = ({
  from,
  to,
  status,
}: {
  from: string;
  to: string;
  status: 'granted' | 'denied' | 'pending';
}) => {
  const statusConfig = {
    granted: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    denied: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
    pending: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  };
  const { icon: StatusIcon, color, bg } = statusConfig[status];

  return (
    <div className={`flex items-center gap-3 p-3 rounded ${bg} text-sm`}>
      <StatusIcon size={16} className={color} />
      <span className="text-slate-400">
        <span className="text-white">{from}</span> → <span className="text-white">{to}</span>
      </span>
      <span className={`ml-auto text-xs font-bold uppercase ${color}`}>{status}</span>
    </div>
  );
};

export default function MemoryInfrastructureContent() {
  const [activeLane, setActiveLane] = useState(0);

  // Cycle through lanes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLane((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cosmo-dark min-h-screen pb-24 font-sans text-slate-200">
      <style>{`
        .gradient-border {
          background: linear-gradient(#0B1120, #0B1120) padding-box,
                      linear-gradient(135deg, #334155, #1e293b, #334155) border-box;
          border: 1px solid transparent;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        {/* Abstract Memory Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="memory-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="#d97706" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="3" fill="#d97706" opacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#memory-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/50 text-xs font-bold text-cosmo-accent mb-6 uppercase tracking-widest">
            <Database size={14} />
            System Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Memory as Infrastructure.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
            Treat AI memory as a managed resource, not a dump. <br />
            Enforce lane isolation, authority-scoped retrieval, and provenance tracking.
          </p>
          <p className="text-lg text-amber-500 font-medium">
            Memory is not context. Memory is infrastructure.
          </p>
        </div>
      </section>

      {/* Definition Block (SEO Spine) */}
      <section className="py-16 bg-cosmo-dark border-b border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-8 leading-snug">
            What is Memory as Infrastructure?
          </h2>
          <div className="prose prose-invert max-w-3xl mx-auto text-slate-500 text-base leading-relaxed space-y-4">
            <p>
              Standard AI systems treat memory as a flat vector store—everything the model has seen
              goes into one pool, retrievable by semantic similarity. This creates risks: context
              contamination, privilege escalation, and unprovable reasoning chains.
            </p>
            <p>
              Cosmocrat treats memory as governed infrastructure. Memory is segmented into
              &quot;Lanes&quot;—isolated contexts that prevent data leakage between workflows. Each
              memory retrieval is subject to the same{' '}
              <Link
                href="/gate-system"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Gate System
              </Link>{' '}
              that governs tool execution.
            </p>
            <p>
              This means an agent operating in a &quot;Support&quot; lane cannot access memories
              from a &quot;Finance&quot; lane without explicit authorization. Memory access is a
              privilege, not a right—and every retrieval produces a{' '}
              <Link
                href="/chronicle-receipts"
                className="text-slate-400 hover:text-amber-500 underline decoration-slate-700 underline-offset-4 transition-colors"
              >
                Chronicle Receipt
              </Link>
              .
            </p>
            <p>
              The result is a memory system where you can prove what context informed a decision,
              trace the provenance of any recalled fact, and prevent cross-domain contamination by
              design.
            </p>
          </div>
        </div>
      </section>

      {/* Lane Isolation Visual */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Lane Isolation in Action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each lane is an isolated memory environment. Cross-lane access requires explicit
              authorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <MemoryLane
              name="Support Lane"
              color="#3b82f6"
              items={['Customer history', 'Ticket context', 'Product FAQs']}
              isActive={activeLane === 0}
            />
            <MemoryLane
              name="Finance Lane"
              color="#f59e0b"
              items={['Transaction logs', 'Refund policies', 'Audit records']}
              isActive={activeLane === 1}
            />
            <MemoryLane
              name="Engineering Lane"
              color="#10b981"
              items={['Deployment status', 'Incident history', 'System configs']}
              isActive={activeLane === 2}
            />
          </div>

          {/* Cross-Lane Access Requests */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Recent Cross-Lane Access Requests
            </h3>
            <div className="space-y-3">
              <AccessRequest from="SupportBot" to="Finance/refund_policy" status="granted" />
              <AccessRequest from="SupportBot" to="Engineering/deploy_status" status="denied" />
              <AccessRequest from="OpsBot" to="Finance/transaction_logs" status="pending" />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem with Flat Memory */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-red-400 font-bold mb-2 tracking-wider uppercase text-sm">
              The Problem
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Flat Memory is a Governance Nightmare
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              When all context lives in one pool, you cannot control what the model &quot;remembers&quot;
              when making a decision. This creates three critical risks.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
                  <AlertTriangle className="text-red-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Context Contamination</h4>
                  <p className="text-sm text-slate-400">
                    A legal conversation bleeds into a support response. The model conflates
                    unrelated domains.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
                  <AlertTriangle className="text-red-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Privilege Escalation</h4>
                  <p className="text-sm text-slate-400">
                    An agent with &quot;read&quot; access retrieves memories that inform a &quot;write&quot; action it
                    shouldn&apos;t take.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
                  <AlertTriangle className="text-red-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Unprovable Reasoning</h4>
                  <p className="text-sm text-slate-400">
                    When asked &quot;why did you say that?&quot;, you cannot trace which memories
                    contributed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual: Chaotic Memory */}
          <div className="relative h-96 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%">
                <pattern id="chaos-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="2" fill="#ef4444" opacity="0.3" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#chaos-pattern)" />
                {/* Random lines */}
                <line x1="50" y1="50" x2="200" y2="150" stroke="#ef4444" strokeWidth="1" opacity="0.3" />
                <line x1="150" y1="200" x2="300" y2="100" stroke="#ef4444" strokeWidth="1" opacity="0.3" />
                <line x1="100" y1="300" x2="250" y2="50" stroke="#ef4444" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <Database size={64} className="text-slate-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-slate-400">Flat Memory Pool</div>
              <div className="text-sm text-slate-600">Everything mixed. Nothing provable.</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cosmocrat Approach */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Cosmocrat Approach</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Memory retrieval is subject to the same governance as tool execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="gradient-border rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <Layers className="text-amber-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Lane Segmentation</h3>
              <p className="text-sm text-slate-400">
                Memory is partitioned by domain. Support, Finance, Legal—each has its own isolated
                context.
              </p>
            </div>

            <div className="gradient-border rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <ShieldAlert className="text-amber-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Gated Retrieval</h3>
              <p className="text-sm text-slate-400">
                Every memory access passes through G1 (Memory Gate). Authority and scope are checked
                before retrieval.
              </p>
            </div>

            <div className="gradient-border rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="text-amber-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Provenance Tracking</h3>
              <p className="text-sm text-slate-400">
                Each retrieved memory is tagged with source, timestamp, and retrieval context.
                Reasoning chains are traceable.
              </p>
            </div>

            <div className="gradient-border rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-amber-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Authority Scoping</h3>
              <p className="text-sm text-slate-400">
                Agents can only access memories within their clearance level. No implicit elevation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Retrieval Flow */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Memory Retrieval Flow</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every memory access follows the same governance path as tool execution.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="text-blue-400" size={28} />
              </div>
              <div className="text-white font-bold">1. Request</div>
              <div className="text-xs text-slate-500">Agent queries memory</div>
            </div>

            <ArrowRight className="text-slate-600 hidden md:block" size={24} />

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 border border-amber-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="text-amber-500" size={28} />
              </div>
              <div className="text-white font-bold">2. Gate Check</div>
              <div className="text-xs text-slate-500">G1 evaluates authority</div>
            </div>

            <ArrowRight className="text-slate-600 hidden md:block" size={24} />

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="text-green-400" size={28} />
              </div>
              <div className="text-white font-bold">3. Scoped Retrieval</div>
              <div className="text-xs text-slate-500">Lane-isolated fetch</div>
            </div>

            <ArrowRight className="text-slate-600 hidden md:block" size={24} />

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="text-purple-400" size={28} />
              </div>
              <div className="text-white font-bold">4. Receipt</div>
              <div className="text-xs text-slate-500">Provenance recorded</div>
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

          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
              Related Platform Concepts
            </h3>
            <div className="flex flex-wrap gap-4">
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
