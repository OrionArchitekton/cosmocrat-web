import Link from 'next/link';
import { Suspense } from 'react';

import WaitlistForm from '@/components/WaitlistForm';
import FAQ from '@/components/FAQ';
import { hero, sections } from '@/content/site';

export default function HomePage() {
  const stage = process.env.SITE_STAGE || 'coming_soon';

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          {stage !== 'live' ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-copper" />
              {hero.eyebrow}
            </div>
          ) : null}

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {hero.headline}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            {hero.subhead}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
            {hero.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-copper" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Suspense fallback={<div className="h-24 skeleton rounded-lg" />}>
              <WaitlistForm variant="inline" />
            </Suspense>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            <Link href="/docs" className="hover:text-white">
              Explore docs
            </Link>
            <span className="opacity-50">•</span>
            <Link href="/waitlist" className="hover:text-white">
              Dedicated signup page
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-8">
          <div className="flex items-center justify-center">
            <img
              src="/brand/cosmocrat-sigil.svg"
              alt="Cosmocrat sigil"
              className="h-56 w-56"
            />
          </div>
          <div className="mt-6 text-center text-sm text-[var(--muted)]">
            Continuity. Ownership. Alignment.
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-8">
          <h2 className="text-xl font-semibold">{sections.whatItIs.title}</h2>
          <div className="mt-3 space-y-3 text-[var(--muted)]">
            {sections.whatItIs.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-8">
          <h2 className="text-xl font-semibold">{sections.principles.title}</h2>
          <div className="mt-4 grid gap-4">
            {sections.principles.items.map((i) => (
              <div key={i.title} className="rounded-xl border border-[var(--border)] bg-[rgba(0,0,0,0.18)] p-4">
                <div className="font-semibold">{i.title}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{i.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Frequently asked questions</h2>
        <FAQ />
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Get early access</h2>
            <p className="mt-1 text-[var(--muted)]">
              Join the waitlist and we&apos;ll reach out as early access opens.
            </p>
          </div>
          <Link
            href="/waitlist"
            className="rounded-lg bg-copper px-4 py-2 text-sm font-semibold text-black"
          >
            Join waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
