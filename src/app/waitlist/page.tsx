import { Suspense } from 'react';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata = {
  title: 'Waitlist'
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
      <h1 className="text-3xl font-semibold">Join the Cosmocrat waitlist</h1>
      <p className="max-w-xl text-[var(--muted)]">
        Get notified when early access opens. We&apos;ll only use your email for Cosmocrat updates.
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
