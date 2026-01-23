import Link from 'next/link';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmo-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#d97706"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Error Code */}
        <div className="mb-8">
          <div className="text-[150px] md:text-[200px] font-bold text-slate-900 leading-none select-none relative">
            404
            <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-amber-500/20 to-transparent">
              404
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center">
          <AlertCircle className="text-amber-500" size={32} />
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Check the URL or navigate back home.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded font-semibold hover:bg-amber-500 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/waitlist"
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Search size={18} />
            Request Early Access
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link href="/decision-exhaust" className="text-slate-400 hover:text-amber-500 transition-colors">
              Decision Exhaust
            </Link>
            <Link href="/runtime-governance" className="text-slate-400 hover:text-amber-500 transition-colors">
              Runtime Governance
            </Link>
            <Link href="/gate-system" className="text-slate-400 hover:text-amber-500 transition-colors">
              Gate System
            </Link>
            <Link href="/docs" className="text-slate-400 hover:text-amber-500 transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
