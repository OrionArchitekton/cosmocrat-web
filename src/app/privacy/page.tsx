import Link from 'next/link';

export const metadata = {
  title: 'Privacy'
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">Privacy</h1>

      <p className="text-[var(--muted)]">
        This site currently collects waitlist signups (email and optional name). We may also capture basic attribution (UTM parameters) and request metadata (referrer, user agent, and a hashed IP) to understand signups and prevent abuse.
      </p>

      <p className="text-[var(--muted)]">
        We do not sell waitlist information. We use it to contact you about Cosmocrat updates and early access.
      </p>

      <p className="text-[var(--muted)]">
        To be removed from the waitlist, reply <span className="font-semibold">REMOVE</span> to any confirmation email or contact us at <a className="hover:text-white" href="mailto:contact@cosmocrat.ai">contact@cosmocrat.ai</a>.
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        <Link href="/terms" className="hover:text-white">Terms</Link>
        <Link href="/waitlist" className="hover:text-white">Join waitlist</Link>
      </div>
    </div>
  );
}
