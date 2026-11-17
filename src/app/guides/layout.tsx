import Link from 'next/link';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <article className="origin-page">
        <Link href="/docs" className="text-link">← Start here</Link>
        {children}
      </article>
    </div>
  );
}
