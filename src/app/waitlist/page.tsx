import { Suspense } from 'react';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata = {
  title: 'Waitlist'
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
      <h1 className="text-3xl font-semibold">Request Early Access</h1>
      <p className="max-w-xl text-[var(--muted)]">
        We&apos;ll reach out with pilot availability and deployment options.
      </p>

      <Suspense fallback={<div className="h-32 w-full skeleton rounded-lg" />}>
        <WaitlistForm variant="page" />
      </Suspense>

      <div className="text-sm text-[var(--muted)]">
        Prefer email? Write us at <a className="hover:text-white" href="mailto:contact@cosmocrat.ai">contact@cosmocrat.ai</a>.
      </div>
    </div>
  );
}
