import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-cosmo-dark">
      {/* Abstract Background Element - Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cosmo-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,30,50,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,30,50,0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-medium text-cosmo-accent mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-cosmo-accent animate-pulse"></span>
          Enterprise Early Access
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
          The AI Operating System for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cosmo-accent">
            Governed Memory
          </span>{' '}
          and Controlled Execution
        </h1>

        <div className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          <p>
            Cosmocrat runs in your environment to enforce fail-closed AI execution, governed memory,
            and audit-grade run records.
          </p>
          <p className="mt-4 text-lg text-slate-500 font-normal">
            Unlike orchestration platforms, Cosmocrat enforces governance at runtime — not after the
            fact.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/waitlist"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-cosmo-accent rounded transition-all hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cosmo-accent focus:ring-offset-slate-900"
          >
            Request Early Access
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
          </Link>

          <Link
            href="/about"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ShieldCheck size={16} />
            Read Governance Doctrine
          </Link>
        </div>
      </div>
    </section>
  );
}
