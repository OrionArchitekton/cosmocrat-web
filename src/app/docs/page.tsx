import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Docs'
};

export default function DocsPage() {
  const docsUrl = process.env.DOCS_URL;
  if (docsUrl) {
    redirect(docsUrl);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">Docs (coming soon)</h1>
      <p className="text-[var(--muted)]">
        We’ll publish documentation as early access opens.
      </p>
      <p className="text-[var(--muted)]">
        Until then, join the waitlist and we’ll keep you updated.
      </p>
      <Link
        href="/waitlist"
        className="inline-flex rounded-lg bg-copper px-4 py-2 text-sm font-semibold text-black"
      >
        Join waitlist
      </Link>
    </div>
  );
}
