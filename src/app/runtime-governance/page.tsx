import type { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Shield, Lock, Cpu, FileCode, Activity } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Runtime Governance | AI Kernel Control',
  description:
    'Execution cannot outrun governance. The OS kernel enforces policy at the runtime layer — not after the fact.',
  alternates: {
    canonical: `${baseUrl}/runtime-governance`,
  },
  openGraph: {
    title: 'Runtime Governance | Cosmocrat',
    description:
      'Execution cannot outrun governance. The OS kernel enforces policy at the runtime layer — not after the fact.',
    url: `${baseUrl}/runtime-governance`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Runtime Governance | Cosmocrat',
    description:
      'Execution cannot outrun governance. The OS kernel enforces policy at the runtime layer — not after the fact.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RuntimeGovernancePage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <Terminal size={14} className="text-cosmo-accent" />
            Kernel Control
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Governance at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cosmo-accent">
              Runtime
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Execution cannot outrun governance. The OS kernel enforces policy at the runtime layer
            — not after the fact.
          </p>
          <p className="text-lg text-cosmo-accent/90 font-medium max-w-3xl mx-auto">
            Unlike orchestration platforms, Cosmocrat enforces authority, limits, and policy before
            AI actions occur.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          The Kernel Authority Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Fail-Closed by Default',
              desc: 'Actions halt without authority. The system defaults to denial unless explicitly authorized.',
            },
            {
              icon: Lock,
              title: 'Pre-Execution Checks',
              desc: 'Every action passes through the Gate System before execution. No bypasses, no exceptions.',
            },
            {
              icon: Cpu,
              title: 'Kernel-Level Enforcement',
              desc: 'Policy is enforced at the kernel layer, not application layer. Cannot be bypassed by agents.',
            },
            {
              icon: Activity,
              title: 'Real-Time Policy',
              desc: 'Policy changes take effect immediately. No restart, no redeploy, no wait.',
            },
            {
              icon: FileCode,
              title: 'Audit by Design',
              desc: 'Every decision generates a Chronicle receipt. Compliance is built into execution, not bolted on.',
            },
            {
              icon: Terminal,
              title: 'Deterministic Control',
              desc: 'Same input + same policy = same authorization decision. Reproducible governance.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 hover:border-cosmo-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-cosmo-accent">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cosmo-card border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Explore the governance stack</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
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
