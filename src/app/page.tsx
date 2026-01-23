import Link from 'next/link';

import Hero from '@/components/Hero';
import Narrative from '@/components/Narrative';
import SeoFaq from '@/components/SeoFaq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Narrative />
      <SeoFaq />

      {/* CTA Section */}
      <section className="py-24 bg-cosmo-card border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Request Early Access
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            We&apos;re onboarding a small number of teams for pilot deployments.
            Designed for production AI in regulated environments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/waitlist"
              className="px-8 py-4 bg-cosmo-accent text-white font-semibold rounded hover:bg-amber-500 transition-colors"
            >
              Request Early Access
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded hover:border-cosmo-accent hover:text-white transition-colors"
            >
              Read Documentation
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Your engine. Your keys. Your data.
          </p>
        </div>
      </section>
    </>
  );
}
