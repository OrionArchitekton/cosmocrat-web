import Link from 'next/link';
import { Database, FileText, Terminal, Lock, FileCode, ShieldAlert } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
    title: 'Platform',
    description:
        'Cosmocrat is an enterprise AI operating system for governed memory and controlled execution. It runs in your environment to enforce fail-closed AI execution, runtime governance, and audit-grade run records.',
    path: '/platform',
});

export default function PlatformPage() {
    return (
        <div className="bg-cosmo-dark min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 border-b border-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Cosmocrat is an enterprise AI operating system for governed memory and controlled execution.
                    </h1>

                    <div className="prose prose-invert max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed mb-12">
                        <p>
                            Cosmocrat provides a runtime control plane for AI systems, enforcing authorization, auditability, and fail-closed execution at the operating-system layer. It is designed for organizations that need durable AI memory, human-in-the-loop control, and provable run records across workflows and tools.
                        </p>
                    </div>

                    <div className="text-left max-w-2xl mx-auto bg-slate-900/40 p-8 rounded-xl border border-slate-800">
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-cosmo-accent mt-1">•</span>
                                <span>AI execution governance (fail-closed by default)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cosmo-accent mt-1">•</span>
                                <span>Governed memory with audit-grade records</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cosmo-accent mt-1">•</span>
                                <span>Human authorization and authority boundaries</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cosmo-accent mt-1">•</span>
                                <span>Designed for enterprise and regulated environments</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Platform Link Boxes */}
            <section className="py-24">
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
        </div>
    );
}
