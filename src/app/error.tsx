'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle, Bug } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cosmo-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="error-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#error-grid)" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center">
          <AlertTriangle className="text-red-500" size={40} />
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-slate-400 mb-4 max-w-md mx-auto">
          An unexpected error occurred. Our team has been notified. 
          You can try again or return to the home page.
        </p>

        {/* Error Details (optional, for debugging) */}
        {error.digest && (
          <div className="mb-8 p-4 bg-slate-900/50 border border-slate-800 rounded-lg inline-block">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Bug size={14} />
              <span>Error ID:</span>
              <code className="text-slate-400">{error.digest}</code>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded font-semibold hover:bg-amber-500 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Support Note */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            If this problem persists, please contact{' '}
            <a
              href="mailto:support@cosmocrat.ai"
              className="text-amber-500 hover:underline"
            >
              support@cosmocrat.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
