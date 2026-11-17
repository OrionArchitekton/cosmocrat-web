import Link from 'next/link';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with the Cosmocrat team. For early access requests, use our waitlist form.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="section border-b-0">
      <div className="wrap max-w-4xl">
        <div className="eyebrow">Cosmocrat / Contact</div>
        <h1>
          Get in
          <br />
          <em>touch.</em>
        </h1>
        <p className="text-base leading-relaxed text-[#b2c0d4] max-w-xl mb-10">
          Get in touch with the Cosmocrat team for pilot inquiries, architecture reviews, or direct
          questions.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-7 flex flex-col justify-between">
            <div>
              <span className="tool-icon mb-5">
                <MessageSquare size={18} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-semibold text-white mb-3">Request Early Access</h2>
              <p className="text-sm leading-relaxed text-[#94a3b8] mb-6">
                Interested in deploying Cosmocrat? Request early access to get pilot availability,
                deployment options, and governance requirements.
              </p>
            </div>
            <div>
              <Link href="/waitlist" className="button button-primary">
                Request Early Access <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[#233047] bg-[#121b2e]/75 p-7 flex flex-col justify-between">
            <div>
              <span className="tool-icon mb-5">
                <Mail size={18} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-semibold text-white mb-3">General Inquiries</h2>
              <p className="text-sm leading-relaxed text-[#94a3b8] mb-6">
                For partnerships, press, or other inquiries, reach out directly via email.
              </p>
            </div>
            <div>
              <a href="mailto:contact@cosmocrat.ai" className="button button-outline">
                contact@cosmocrat.ai <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
