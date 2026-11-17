import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import WaitlistForm from '@/components/v1/WaitlistForm';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Request Early Access',
  description:
    'Request early access to Cosmocrat. We onboard teams deploying AI in production or regulated environments.',
  path: '/waitlist',
});

export default function WaitlistPage() {
  return (
    <div className="section border-b-0">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow">Cosmocrat / Early access</div>
            <h1 className="mt-5 mb-5">
              Request
              <br />
              <em>Early Access.</em>
            </h1>
            <p className="text-base leading-relaxed text-[#f0b66a] mb-4 font-medium">
              Early access is limited to teams deploying AI in production or regulated environments.
            </p>
            <p className="text-sm leading-relaxed text-[#b2c0d4] mb-8">
              We&apos;ll follow up with pilot availability, deployment options, and governance
              requirements.
            </p>

            <div className="rounded-xl border border-[#233047] bg-[#121b2e]/65 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <ShieldCheck size={15} className="text-[#f0b66a]" aria-hidden="true" />
                <span>Looking for standalone tools right now?</span>
              </div>
              <p className="m-0 text-xs leading-relaxed text-[#94a3b8]">
                Independent Orion components and versioned Starter previews are already published
                for local workflows without an enterprise waitlist.
              </p>
              <Link href="/tools" className="text-link text-xs">
                Explore the Orion tools <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
}
