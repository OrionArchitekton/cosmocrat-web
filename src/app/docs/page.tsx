import Link from 'next/link';
import { Shield, Terminal, Settings, Lock } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Documentation',
  description:
    'Cosmocrat documentation covers the architecture, APIs, and operational doctrine required to deploy governed AI in production environments.',
  path: '/docs',

});

export default function DocsPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen py-24 px-4 font-sans text-slate-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentation Access</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Cosmocrat documentation covers the architecture, APIs, and operational doctrine required
            to deploy governed AI in production environments.
          </p>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Documentation is released incrementally as early access expands, and reflects real
            production deployments rather than theoretical examples.
          </p>
        </div>

        {/* Scope of Documentation */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 mb-12">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 text-center border-b border-slate-800 pb-4">
            Scope of Documentation
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Architecture */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Shield size={16} className="text-cosmo-accent" /> Architecture
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Control Plane & Kernel
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Gate System
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Chronicle & Receipts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Drift Guard
                </li>
              </ul>
            </div>

            {/* Column 2: APIs */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Terminal size={16} className="text-cosmo-accent" /> APIs
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Decision submission
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Policy evaluation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Receipt verification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Replay & audit
                </li>
              </ul>
            </div>

            {/* Column 3: Operations */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Settings size={16} className="text-cosmo-accent" /> Operations
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Deployment modes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Key management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Policy versioning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div> Incident handling
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-6">
            <Lock size={14} />
            <span>
              Documentation is tied to early access to ensure examples, schemas, and guarantees
              match the deployed system.
            </span>
          </div>

          <Link
            href="/waitlist"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-cosmo-accent text-white font-bold rounded hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20"
          >
            Request Early Access
          </Link>

          <p className="mt-8 text-xs text-slate-600 uppercase tracking-wide font-medium">
            Review the{' '}
            <Link href="/terms" className="underline hover:text-cosmo-accent">
              Legal Governance Framework
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
