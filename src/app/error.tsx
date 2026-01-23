'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (could send to monitoring service)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="text-6xl font-bold text-red-500 mb-4">Error</div>
        <h1 className="text-2xl font-semibold text-cosmo-text mb-2">
          Something went wrong
        </h1>
        <p className="text-cosmo-muted max-w-md">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-600 mt-2 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-cosmo-accent text-white font-semibold rounded hover:bg-amber-500 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-cosmo-card border border-slate-700 text-cosmo-text font-semibold rounded hover:border-cosmo-accent transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
