'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
      // Capture UTM params and referrer
      const params = new URLSearchParams(window.location.search);
      const payload = {
        email,
        name: name || undefined,
        company,
        role,
        ai_system: aiSystem || undefined,
        first_run: firstRun || undefined,
        website: website || undefined, // Honeypot - bots fill this, humans don't see it
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

      // Always parse JSON response (belt + suspenders)
      let data: { ok?: boolean; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error('Invalid server response');
      }

      // Check both HTTP status and response payload
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Request failed');
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
      // User-friendly error message instead of raw JS errors
      const rawError = err instanceof Error ? err.message : 'Unknown error';
      console.error('Waitlist submission error:', rawError);
      setErrorMessage(
        "We couldn't process your request. Please try again or email contact@cosmocrat.ai."
      );
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
    <form onSubmit={handleSubmit} className="space-y-8 relative">
      {/* Honeypot field - hidden from humans, bots will fill it */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Name <span className="text-slate-500 font-normal">(optional)</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white placeholder-slate-600 focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. VP Engineering, CTO, Head of AI"
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white placeholder-slate-600 focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          What system is AI touching?{' '}
          <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={aiSystem}
          onChange={(e) => setAiSystem(e.target.value)}
          placeholder="e.g. Production agents, financial ops, customer support"
          className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white placeholder-slate-600 focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          What are you trying to do with Cosmocrat?{' '}
          <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <textarea
          value={firstRun}
          onChange={(e) => setFirstRun(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white placeholder-slate-600 focus:border-cosmo-accent focus:outline-none focus:ring-1 focus:ring-cosmo-accent h-24 transition-colors"
          placeholder="High-risk, high-authority workflows are ideal"
        ></textarea>
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
