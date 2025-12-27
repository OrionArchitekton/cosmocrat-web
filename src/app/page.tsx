import Link from 'next/link';
import { Suspense } from 'react';

import WaitlistForm from '@/components/WaitlistForm';
import FAQ from '@/components/FAQ';
import { hero, problem, whatItIs, sidebrain, sovereignty, principles } from '@/content/site';

export default function HomePage() {
  const stage = process.env.SITE_STAGE || 'coming_soon';

  return (
    <div className="space-y-20">
      {/* Section 1: Hero + Waitlist (Slide 1) */}
      <section id="waitlist" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-copper shrink-0" />
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

      {/* Section 2: Problem (Slide 2) - Graphic LEFT, Text RIGHT */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <img 
            src="/slides/slide-2-graphic.svg" 
            alt="" 
            className="opacity-70 max-h-72 w-auto" 
            loading="lazy" 
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-semibold font-heading">{problem.title}</h2>
          <div className="mt-4 space-y-3 text-[var(--muted)]">
            {problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What Cosmocrat Is (Slide 3) - Text LEFT, Graphic RIGHT */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold font-heading">{whatItIs.title}</h2>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            {whatItIs.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-copper shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <img 
            src="/slides/slide-3-graphic.svg" 
            alt="" 
            className="opacity-60 max-h-72 w-auto" 
            loading="lazy" 
          />
        </div>
      </section>

      {/* Section 4: Side-brain Does (Slide 4) - Graphic LEFT, Text RIGHT */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <img 
            src="/slides/slide-4-graphic.svg" 
            alt="" 
            className="opacity-60 max-h-80 w-auto" 
            loading="lazy" 
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-semibold font-heading">{sidebrain.title}</h2>
          <ul className="mt-6 space-y-4">
            {sidebrain.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[var(--muted)]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-copper shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5: Sovereignty (Slide 6) */}
      <section>
        <h2 className="text-3xl font-semibold text-center font-heading">{sovereignty.title}</h2>
        <p className="mt-2 text-center text-[var(--muted)]">{sovereignty.subhead}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Business Model Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-6 flex gap-4 items-start">
            <img 
              src="/slides/slide-6a-graphic.svg" 
              alt="" 
              className="opacity-60 w-16 h-16 shrink-0" 
              loading="lazy" 
            />
            <div>
              <h3 className="text-lg font-semibold">{sovereignty.cards[0].title}</h3>
              <p className="mt-2 text-[var(--muted)]">{sovereignty.cards[0].body}</p>
            </div>
          </div>
          {/* Architecture Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-6 flex gap-4 items-start">
            <img 
              src="/slides/slide-6b-graphic.svg" 
              alt="" 
              className="opacity-60 w-16 h-16 shrink-0" 
              loading="lazy" 
            />
            <div>
              <h3 className="text-lg font-semibold">{sovereignty.cards[1].title}</h3>
              <p className="mt-2 text-[var(--muted)]">{sovereignty.cards[1].body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Non-negotiables (Slide 7) */}
      <section>
        <h2 className="text-3xl font-semibold text-center font-heading">{principles.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.items.map((i) => (
            <div key={i.title} className="rounded-xl border border-[var(--border)] bg-[rgba(0,0,0,0.18)] p-5">
              <div className="font-semibold">{i.title}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{i.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 font-heading">Frequently asked questions</h2>
        <FAQ />
      </section>

      {/* Section 8: CTA Bar */}
      <section className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold font-heading">Get early access</h2>
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
