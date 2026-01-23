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
    <div className="bg-cosmo-dark min-h-screen flex items-center justify-center py-24 px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-6">Request Early Access</h1>

        {/* Selectivity */}
        <p className="text-amber-500 font-medium mb-4">
          Early access is limited to teams deploying AI in production or regulated environments.
        </p>

        {/* Enterprise Subhead */}
        <p className="text-xl text-slate-400 mb-10">
          We&apos;ll follow up with pilot availability, deployment options, and governance
          requirements.
        </p>

        <WaitlistForm />
      </div>
    </div>
  );
}
