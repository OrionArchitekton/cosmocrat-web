'use client';

import { useState } from 'react';
import { trackConversion, trackGa4Conversion } from '@/lib/analytics';
import { getEffectiveUtmParams } from '@/lib/attribution';
import Link from 'next/link';
import { Lock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [aiSystem, setAiSystem] = useState('');
  const [firstRun, setFirstRun] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const utms = getEffectiveUtmParams();
      const payload = {
        email,
        name: name || undefined,
        company,
        role,
        ai_system: aiSystem || undefined,
        first_run: firstRun || undefined,
        website: website || undefined,
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_content: utms.utm_content,
        utm_term: utms.utm_term,
        referrer: document.referrer || undefined,
        landing_path: window.location.pathname,
      };

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; duplicate?: boolean; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid server response');
      }

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Request failed');
      }

      if (data.duplicate === false) {
        trackConversion({ event: 'waitlist_success' });
        trackGa4Conversion('newsletter_signup', { lead_surface: 'waitlist' });
      }
      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setRole('');
      setAiSystem('');
      setFirstRun('');
    } catch (err) {
      setStatus('error');
      const rawError = err instanceof Error ? err.message : 'Unknown error';
      console.error('Waitlist submission error:', rawError);
      setErrorMessage(
        "We couldn't process your request. Please try again or email contact@cosmocrat.ai."
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-[#121b2e]/90 p-8 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle className="text-emerald-400" size={24} aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-3">You&apos;re on the list</h2>
        <p className="text-sm text-[#b2c0d4] mb-6 max-w-md mx-auto">
          We&apos;ll follow up with pilot availability and deployment options.
        </p>
        <Link href="/" className="button button-outline">
          Back to Home <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-[#334563] bg-[#0b1120] px-3.5 py-2.5 text-sm text-[#e2e8f0] placeholder-[#64748b] transition-colors focus:border-[#f0b66a] focus:outline-none';

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 rounded-xl border border-[#233047] bg-[#121b2e]/75 p-6 sm:p-8"
    >
      {/* Honeypot field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="waitlist-name" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
            Name <span className="font-normal text-[#94a3b8]">(optional)</span>
          </label>
          <input
            id="waitlist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="waitlist-email" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
            Work Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="waitlist-company" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
            Company
          </label>
          <input
            id="waitlist-company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="waitlist-role" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
            Role
          </label>
          <input
            id="waitlist-role"
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. VP Engineering, CTO, Head of AI"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="waitlist-system" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
          What system is AI touching?{' '}
          <span className="font-normal text-[#94a3b8]">(optional)</span>
        </label>
        <input
          id="waitlist-system"
          type="text"
          value={aiSystem}
          onChange={(e) => setAiSystem(e.target.value)}
          placeholder="e.g. Production agents, financial ops, customer support"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="waitlist-first-run" className="mb-2 block text-xs font-medium text-[#cbd5e1]">
          What are you trying to do with Cosmocrat?{' '}
          <span className="font-normal text-[#94a3b8]">(optional)</span>
        </label>
        <textarea
          id="waitlist-first-run"
          value={firstRun}
          onChange={(e) => setFirstRun(e.target.value)}
          className={`${inputClass} min-h-[104px] resize-y`}
          placeholder="High-risk, high-authority workflows are ideal"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-lg border border-red-500/35 bg-red-950/30 px-3.5 py-2.5 text-xs text-red-300"
        >
          <AlertCircle size={15} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="button button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-55"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={16} aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              Request Early Access <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-[#94a3b8]">
          By requesting access, you agree to our{' '}
          <Link href="/privacy" className="text-[#f0b66a] underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          &amp;{' '}
          <Link href="/terms" className="text-[#f0b66a] underline underline-offset-2">
            Terms
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-[#233047] pt-5 text-center">
        <p className="mb-2 flex items-center justify-center gap-2 text-xs text-[#94a3b8]">
          <Lock size={12} className="text-[#f0b66a]" aria-hidden="true" />
          <span>
            We only use your information to evaluate early access eligibility. No marketing lists. No
            automated follow-ups.
          </span>
        </p>
        <p className="m-0 text-xs text-[#94a3b8]">
          Prefer email? Write us at{' '}
          <a href="mailto:contact@cosmocrat.ai" className="text-[#f0b66a] underline underline-offset-2">
            contact@cosmocrat.ai
          </a>
          .
        </p>
      </div>
    </form>
  );
}
