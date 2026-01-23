import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, Shield, Lock, BrainCircuit, FileCode, Server } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Memory as Infrastructure | Governed AI Memory',
  description:
    'Persistent AI memory that survives sessions, tools, and time. Managed as a governed resource, not a chat cache.',
  alternates: {
    canonical: `${baseUrl}/memory-infrastructure`,
  },
  openGraph: {
    title: 'Memory as Infrastructure | Cosmocrat',
    description:
      'Persistent AI memory that survives sessions, tools, and time. Managed as a governed resource, not a chat cache.',
    url: `${baseUrl}/memory-infrastructure`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory as Infrastructure | Cosmocrat',
    description:
      'Persistent AI memory that survives sessions, tools, and time. Managed as a governed resource, not a chat cache.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function MemoryInfrastructurePage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <Database size={14} className="text-cosmo-accent" />
            Governed Memory
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Memory is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cosmo-accent">
              Infrastructure
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Context is not a cache. It is a governed resource with access controls, audit trails,
            and lane isolation.
          </p>
          <p className="text-lg text-cosmo-accent/90 font-medium max-w-3xl mx-auto">
            Cosmocrat treats AI memory as infrastructure — persistent, policy-bound, and
            non-transitive across lanes.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Lock,
              title: 'Lane Isolation',
              desc: 'Memory from sensitive workflows cannot bleed into unrelated tasks. Each lane is hermetically sealed.',
            },
            {
              icon: Shield,
              title: 'Access Controls',
              desc: 'Explicit permissions required for memory cross-over. No implicit sharing between agents or domains.',
            },
            {
              icon: FileCode,
              title: 'Audit Trails',
              desc: 'Every memory access, write, and query is logged with immutable receipts in the Chronicle.',
            },
            {
              icon: BrainCircuit,
              title: 'Side-Brain Architecture',
              desc: 'The Side-Brain acts as a governed memory interface. Non-admissible memory is invisible to the model.',
            },
            {
              icon: Server,
              title: 'Persistence',
              desc: 'Memory survives sessions, tool switches, and time. Your AI context is durable infrastructure.',
            },
            {
              icon: Database,
              title: 'Policy-Bound',
              desc: 'Memory access is governed by runtime policy. The kernel enforces memory boundaries at execution time.',
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
          <h2 className="text-2xl font-bold text-white mb-4">Learn more about the platform</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/drift-guard"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Drift Guard
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
      </section>
    </div>
  );
}
