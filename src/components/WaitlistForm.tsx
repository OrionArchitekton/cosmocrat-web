'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type WaitlistResult =
  | { ok: true; duplicate?: boolean; emailSent?: boolean }
  | { ok: false; error?: string };

export default function WaitlistForm(props: { variant?: 'inline' | 'page' }) {
  const variant = props.variant || 'inline';
  const sp = useSearchParams();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);

  const attribution = useMemo(() => {
    const get = (k: string) => sp.get(k) || '';
    return {
      utm_source: get('utm_source'),
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_content: get('utm_content'),
      utm_term: get('utm_term')
    };
  }, [sp]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          website,
          ...attribution,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          landing_path: typeof window !== 'undefined' ? window.location.pathname : ''
        })
      });

      const json = (await res.json()) as WaitlistResult;
      setResult(json);

      if (json.ok) {
        // keep email in case they want to resubmit; clear name.
        setName('');
      }
    } catch {
      setResult({ ok: false, error: 'Request failed' });
    } finally {
      setLoading(false);
    }
  }

  const containerClass =
    variant === 'page'
      ? 'w-full max-w-md'
      : 'w-full';

  return (
    <div className={containerClass}>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm outline-none focus:border-copper"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm outline-none focus:border-copper"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            type="email"
          />
        </div>

        {/* honeypot */}
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          name="website"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-copper px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
        >
          {loading ? 'Joining…' : 'Join the waitlist'}
        </button>

        <p className="text-xs text-[var(--muted)]">
          We’ll only use your email for Cosmocrat updates. Reply <span className="font-semibold">REMOVE</span>{' '}
          to unsubscribe.
        </p>

        {result ? (
          result.ok ? (
            <div className="rounded-lg border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-3 text-sm">
              {result.duplicate ? (
                <p>You’re already on the list.</p>
              ) : (
                <p>
                  You’re in. {result.emailSent ? 'Check your inbox for confirmation.' : ''}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm">
              <p>{result.error || 'Something went wrong.'}</p>
            </div>
          )
        ) : null}
      </form>
    </div>
  );
}
