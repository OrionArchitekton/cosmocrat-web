import Link from 'next/link';
import { Home, ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full rounded-xl border border-[#233047] bg-[#121b2e]/80 p-8 text-center">
        <div className="font-mono text-xs tracking-[0.14em] uppercase text-[#f0b66a] mb-3">
          Error 404
        </div>
        <h1 className="text-3xl font-semibold text-white mb-3 mt-0">Page Not Found</h1>
        <p className="text-sm text-[#94a3b8] mb-7 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Return home or
          explore the available Orion tools and governance architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="button button-primary w-full sm:w-auto">
            <Home size={15} aria-hidden="true" />
            Back to Home
          </Link>
          <Link href="/tools" className="button button-outline w-full sm:w-auto">
            <Compass size={15} aria-hidden="true" />
            Explore Tools
          </Link>
        </div>

        <div className="mt-8 border-t border-[#233047] pt-5">
          <p className="text-xs text-[#94a3b8] mb-3">Quick navigation</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            <Link href="/about" className="text-[#b2c0d4] hover:text-[#f0b66a]">
              Our story
            </Link>
            <Link href="/platform" className="text-[#b2c0d4] hover:text-[#f0b66a]">
              Architecture
            </Link>
            <Link href="/gate-system" className="text-[#b2c0d4] hover:text-[#f0b66a]">
              Gate System
            </Link>
            <Link href="/docs" className="text-[#b2c0d4] hover:text-[#f0b66a]">
              Start here
            </Link>
            <Link
              href="/waitlist"
              className="text-[#f0b66a] hover:underline inline-flex items-center gap-1"
            >
              Waitlist <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
