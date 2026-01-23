'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstRun, setFirstRun] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Capture UTM params and referrer
      const params = new URLSearchParams(window.location.search);
      const payload = {
        email,
        name: name || undefined,
        first_run: firstRun || undefined,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        utm_term: params.get('utm_term') || undefined,
        referrer: document.referrer || undefined,
        landing_path: window.location.pathname,
      };

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setFirstRun('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">You&apos;re on the list</h2>
        <p className="text-slate-400 mb-8">
          We&apos;ll follow up with pilot availability and deployment options.
        </p>
        <Link
          href="/"
          className="text-cosmo-accent hover:text-amber-400 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          What would you run Cosmocrat on first?{' '}
          <span className="text-slate-500 font-normal ml-1">
            (High-risk, high-authority workflows are ideal)
          </span>
        </label>
        <textarea
          value={firstRun}
          onChange={(e) => setFirstRun(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent h-32 transition-colors"
        ></textarea>
        <p className="text-xs text-slate-500 mt-2">
          Examples: production agent workflows, financial operations, customer support, internal
          decision systems.
        </p>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-cosmo-accent text-white font-bold rounded hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            'Request Early Access'
          )}
        </button>
        <p className="text-center text-xs text-slate-600 mt-4 font-medium">
          By requesting access, you agree to our{' '}
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-cosmo-accent underline transition-colors"
          >
            Privacy Policy
          </Link>{' '}
          &{' '}
          <Link
            href="/terms"
            className="text-slate-500 hover:text-cosmo-accent underline transition-colors"
          >
            Terms
          </Link>
          .
        </p>
      </div>

      {/* Trust Reassurance */}
      <div className="pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm mb-4 flex items-center justify-center gap-2">
          <Lock size={12} className="text-slate-600" /> We only use your information to evaluate
          early access eligibility. No marketing lists. No automated follow-ups.
        </p>
        <p className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
          Prefer email? Write us at contact@cosmocrat.ai.
        </p>
      </div>
    </form>
  );
}
