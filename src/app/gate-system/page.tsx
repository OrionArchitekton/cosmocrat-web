import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Shield, CheckCircle2, XCircle, AlertTriangle, FileCode, Scale } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Gate System | 7-Stage Authorization Pipeline',
  description:
    'The 7-stage pipeline that validates inputs, forms decisions, checks authority, and verifies truth before AI action.',
  alternates: {
    canonical: `${baseUrl}/gate-system`,
  },
  openGraph: {
    title: 'Gate System | Cosmocrat',
    description:
      'The 7-stage pipeline that validates inputs, forms decisions, checks authority, and verifies truth before AI action.',
    url: `${baseUrl}/gate-system`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gate System | Cosmocrat',
    description:
      'The 7-stage pipeline that validates inputs, forms decisions, checks authority, and verifies truth before AI action.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

const gates = [
  { id: 'G0', name: 'Input Validation', desc: 'Verify request structure and sanity' },
  { id: 'G1', name: 'Policy Check', desc: 'Does policy allow this action?' },
  { id: 'G2', name: 'Authority Check', desc: 'Does the actor have permission?' },
  { id: 'G3', name: 'Resource Bounds', desc: 'Are limits respected?' },
  { id: 'G4', name: 'Human-in-Loop', desc: 'Is human approval required?' },
  { id: 'G5', name: 'Truth Verification', desc: 'Is the claim verifiable?' },
  { id: 'G6', name: 'Execution Gate', desc: 'Final authorization to proceed' },
];

export default function GateSystemPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <Lock size={14} className="text-cosmo-accent" />
            Authorization Pipeline
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-cosmo-accent">
              Gate System
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Every AI action passes through a 7-stage authorization pipeline. No gate, no execution.
          </p>
          <p className="text-lg text-cosmo-accent/90 font-medium max-w-3xl mx-auto">
            Validate inputs, check policy, verify authority, enforce limits, require human approval,
            verify truth, then execute.
          </p>
        </div>
      </section>

      {/* Gates Pipeline */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">The 7 Gates</h2>
        <div className="space-y-4">
          {gates.map((gate, i) => (
            <div
              key={gate.id}
              className="flex items-center gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-cosmo-accent font-mono font-bold text-xl flex-shrink-0">
                {gate.id}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{gate.name}</h3>
                <p className="text-slate-400 text-sm">{gate.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                {i < gates.length - 1 ? (
                  <span className="px-2 py-1 bg-slate-800 rounded">→ {gates[i + 1].id}</span>
                ) : (
                  <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded">EXECUTE</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gate Outcomes */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Gate Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-8 rounded-xl border border-green-900/50">
              <CheckCircle2 className="text-green-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">PASS</h3>
              <p className="text-slate-400 text-sm">
                Gate condition satisfied. Proceed to next gate or execute if final.
              </p>
            </div>
            <div className="bg-slate-900/50 p-8 rounded-xl border border-amber-900/50">
              <AlertTriangle className="text-amber-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">DEFER</h3>
              <p className="text-slate-400 text-sm">
                Requires human review (G4). Action paused until explicit approval.
              </p>
            </div>
            <div className="bg-slate-900/50 p-8 rounded-xl border border-red-900/50">
              <XCircle className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">HALT</h3>
              <p className="text-slate-400 text-sm">
                Gate condition failed. Action denied. Chronicle receipt generated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cosmo-card border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Explore the governance stack</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/runtime-governance"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Runtime Governance
            </Link>
            <Link
              href="/drift-guard"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Drift Guard
            </Link>
            <Link
              href="/chronicle-receipts"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Chronicle Receipts
            </Link>
            <Link
              href="/memory-infrastructure"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Memory as Infrastructure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
