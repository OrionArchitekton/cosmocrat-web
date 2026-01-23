import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <div className="text-8xl font-bold text-cosmo-accent mb-4">404</div>
        <h1 className="text-2xl font-semibold text-cosmo-text mb-2">
          Page Not Found
        </h1>
        <p className="text-cosmo-muted max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-cosmo-accent text-white font-semibold rounded hover:bg-amber-500 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/waitlist"
          className="px-6 py-3 bg-cosmo-card border border-slate-700 text-cosmo-text font-semibold rounded hover:border-cosmo-accent transition-colors"
        >
          Request Early Access
        </Link>
      </div>
    </div>
  );
}
