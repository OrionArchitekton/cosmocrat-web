import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, Building } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: 'Contact | Cosmocrat',
    description:
      'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
    url: `${baseUrl}/contact`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      <div className="pt-24 pb-12 bg-cosmo-card border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Get in touch with the Cosmocrat team.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Early Access CTA */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 hover:border-cosmo-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cosmo-accent/10 flex items-center justify-center mb-6">
              <MessageSquare className="text-cosmo-accent" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Request Early Access</h2>
            <p className="text-slate-400 mb-6">
              Interested in deploying Cosmocrat? Request early access to get pilot availability,
              deployment options, and governance requirements.
            </p>
            <Link
              href="/waitlist"
              className="inline-block px-6 py-3 bg-cosmo-accent text-white font-semibold rounded hover:bg-amber-500 transition-colors"
            >
              Request Early Access
            </Link>
          </div>

          {/* General Inquiries */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6">
              <Mail className="text-slate-400" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-4">General Inquiries</h2>
            <p className="text-slate-400 mb-6">
              For partnerships, press, or other inquiries, reach out via email.
            </p>
            <a
              href="mailto:contact@cosmocrat.ai"
              className="inline-block px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded hover:border-cosmo-accent hover:text-white transition-colors"
            >
              contact@cosmocrat.ai
            </a>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
            <Building size={16} />
            <span className="text-sm">Operated by Orion Apex Capital</span>
          </div>
          <p className="text-xs text-slate-600">
            Cosmocrat is originated, operated, and validated by Orion Apex Capital.
          </p>
        </div>
      </div>
    </div>
  );
}
