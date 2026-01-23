import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, Building } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Contact | Cosmocrat',
  description:
    'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: 'Contact | Cosmocrat',
    description:
      'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
    url: `${baseUrl}/contact`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Cosmocrat',
    description:
      'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 border-b border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">Get in Touch</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions about Cosmocrat? Want to discuss enterprise deployment? We&apos;d love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Early Access */}
          <div className="bg-slate-900/50 p-8 rounded-xl border border-cosmo-accent/50">
            <div className="w-12 h-12 rounded-lg bg-cosmo-accent/20 flex items-center justify-center mb-6 text-cosmo-accent">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Request Early Access</h2>
            <p className="text-slate-400 mb-6">
              Interested in piloting Cosmocrat? Join our waitlist and we&apos;ll be in touch to
              discuss your use case.
            </p>
            <Link
              href="/waitlist"
              className="inline-flex px-6 py-3 bg-cosmo-accent text-white font-semibold rounded hover:bg-amber-500 transition-colors"
            >
              Request Early Access
            </Link>
          </div>

          {/* General Contact */}
          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 text-slate-400">
              <Mail size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">General Inquiries</h2>
            <p className="text-slate-400 mb-6">
              For press, partnerships, or other inquiries, reach out directly via email.
            </p>
            <a
              href="mailto:contact@cosmocrat.ai"
              className="inline-flex items-center gap-2 text-cosmo-accent hover:text-amber-400 transition-colors font-medium"
            >
              <Mail size={18} />
              contact@cosmocrat.ai
            </a>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <Building size={16} />
            Operated by Orion Apex Capital
          </div>
        </div>
      </section>
    </div>
  );
}
