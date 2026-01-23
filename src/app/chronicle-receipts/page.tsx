import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCode, Shield, Lock, CheckCircle2, Database, Clock } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Chronicle Receipts | Immutable AI Audit Logs',
  description:
    "If it's not receipted, it didn't happen. Immutable, tamper-evident audit logs for every AI decision.",
  alternates: {
    canonical: `${baseUrl}/chronicle-receipts`,
  },
  openGraph: {
    title: 'Chronicle Receipts | Cosmocrat',
    description:
      "If it's not receipted, it didn't happen. Immutable, tamper-evident audit logs for every AI decision.",
    url: `${baseUrl}/chronicle-receipts`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronicle Receipts | Cosmocrat',
    description:
      "If it's not receipted, it didn't happen. Immutable, tamper-evident audit logs for every AI decision.",
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function ChronicleReceiptsPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <FileCode size={14} className="text-cosmo-accent" />
            Audit Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Chronicle{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cosmo-accent">
              Receipts
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            If it&apos;s not receipted, it didn&apos;t happen. Every AI decision generates an
            immutable, tamper-evident audit record.
          </p>
          <p className="text-lg text-cosmo-accent/90 font-medium max-w-3xl mx-auto">
            Chronicle is the audit backbone of Cosmocrat — cryptographically bound records that
            prove what happened, when, and by whose authority.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          What Chronicle Records
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Gate Decisions',
              desc: 'Every gate pass, defer, or halt is recorded with the exact policy state at decision time.',
            },
            {
              icon: Database,
              title: 'Memory Mutations',
              desc: 'All writes to governed memory are logged with before/after state and actor identity.',
            },
            {
              icon: Lock,
              title: 'Authority Events',
              desc: 'Permission grants, revocations, and authority escalations are immutably recorded.',
            },
            {
              icon: Clock,
              title: 'Timestamps',
              desc: 'Cryptographically attested timestamps prevent backdating or manipulation.',
            },
            {
              icon: CheckCircle2,
              title: 'Execution Results',
              desc: 'Final outcomes, errors, and drift events are captured as primary data.',
            },
            {
              icon: FileCode,
              title: 'Policy Hashes',
              desc: 'The exact policy version that governed each decision is recorded and verifiable.',
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

      {/* Example Receipt */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Example Receipt</h2>
          <div className="bg-[#0f1219] rounded-lg border border-slate-800 p-6 font-mono text-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-slate-600">chronicle_receipt.json</div>
            </div>
            <div className="text-slate-300 space-y-1 text-xs">
              <div>{'{'}</div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;receipt_id&quot;</span>:{' '}
                <span className="text-green-400">&quot;chr_2026011514020099a1&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;event_type&quot;</span>:{' '}
                <span className="text-green-400">&quot;GATE_DECISION&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;gate&quot;</span>:{' '}
                <span className="text-green-400">&quot;G4&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;outcome&quot;</span>:{' '}
                <span className="text-amber-400">&quot;DEFER&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;reason&quot;</span>:{' '}
                <span className="text-green-400">&quot;human_approval_required&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;policy_hash&quot;</span>:{' '}
                <span className="text-slate-400">&quot;0x99a7f...&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;timestamp&quot;</span>:{' '}
                <span className="text-green-400">&quot;2026-01-15T14:02:00.991Z&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">&quot;lane_id&quot;</span>:{' '}
                <span className="text-green-400">&quot;finance_ops&quot;</span>
              </div>
              <div>{'}'}</div>
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
              href="/runtime-governance"
              className="px-4 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cosmo-accent hover:text-white transition-colors text-sm"
            >
              Runtime Governance
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
