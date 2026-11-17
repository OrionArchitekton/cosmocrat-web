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
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full rounded-xl border border-[#233047] bg-[#121b2e]/80 p-8 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-red-500/35 bg-red-500/10">
          <AlertTriangle className="text-red-400" size={26} aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-semibold text-white mb-3 mt-0">Something Went Wrong</h1>
        <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">
          An unexpected error occurred. You can retry loading this view or return to the home page.
        </p>

        {error.digest && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#233047] bg-[#0b1120] px-3 py-1.5 font-mono text-xs text-[#94a3b8]">
            <Bug size={13} aria-hidden="true" />
            <span>Error ID:</span>
            <code className="text-[#e2e8f0]">{error.digest}</code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="button button-primary w-full sm:w-auto"
          >
            <RefreshCw size={15} aria-hidden="true" />
            Try Again
          </button>
          <Link href="/" className="button button-outline w-full sm:w-auto">
            <Home size={15} aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 border-t border-[#233047] pt-5">
          <p className="m-0 text-xs text-[#94a3b8]">
            If this persists, contact{' '}
            <a href="mailto:support@cosmocrat.ai" className="text-[#f0b66a] hover:underline">
              support@cosmocrat.ai
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
