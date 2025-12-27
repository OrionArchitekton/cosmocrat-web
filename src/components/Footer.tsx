import Link from 'next/link';

import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-white">{site.name}</div>
          <div>Questions: <a className="hover:text-white" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
