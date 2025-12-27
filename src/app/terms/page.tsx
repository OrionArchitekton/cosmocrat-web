import Link from 'next/link';

export const metadata = {
  title: 'Terms'
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">Terms</h1>

      <p className="text-[var(--muted)]">
        This website is provided on an “as is” basis.
      </p>

      <p className="text-[var(--muted)]">
        Joining the waitlist does not guarantee access. We may change features, timelines, and availability.
      </p>

      <p className="text-[var(--muted)]">
        Questions? Email <a className="hover:text-white" href="mailto:contact@cosmocrat.ai">contact@cosmocrat.ai</a>.
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        <Link href="/privacy" className="hover:text-white">Privacy</Link>
        <Link href="/waitlist" className="hover:text-white">Join waitlist</Link>
      </div>
    </div>
  );
}
