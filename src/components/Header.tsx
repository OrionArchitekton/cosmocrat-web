import Link from 'next/link';

import { site } from '@/content/site';

export default function Header() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[rgba(0,0,0,0.18)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/brand/cosmocrat-wordmark.svg"
            alt={site.name}
            className="h-6 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
            Contact
          </a>
          <Link
            href="/waitlist"
            className="rounded-lg bg-copper px-3 py-2 text-sm font-semibold text-black"
          >
            Join waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
