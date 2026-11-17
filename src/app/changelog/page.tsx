import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Website changelog',
  description: 'Source-linked changes to the Cosmocrat public site, catalog and early-access intake. Orion tools keep their own release histories.',
  path: '/changelog',
});

const changes = [
  { date: '2026-11-16', label: 'November 16, 2026', title: 'Durable early-access signup', pr: 23,
    text: 'The site requires configured Supabase storage before acknowledging a signup. The same update restored the Node 20 build and the site’s anti-framing header.' },
  { date: '2026-11-03', label: 'November 3, 2026', title: 'Orion Skills catalog entry updated', pr: 21,
    text: 'The catalog now points to the v0.7.1 release of Orion Skills. The release repository documents the included procedures and supported environments.' },
  { date: '2026-10-30', label: 'October 30, 2026', title: 'Independent tools get a public catalog', pr: 18,
    text: 'The Orion tools gained a searchable catalog with named versions, release links and environment boundaries. Starter workflows have their own preview labels.' },
];

export default function ChangelogPage() {
  return (
    <div className="wrap">
      <article className="origin-page">
        <Link href="/docs" className="text-link">← Start here</Link>
        <h1>Website changelog</h1>
        <p>Selected changes merged into the public website. Each Orion tool maintains its own release history in the <Link className="text-link" href="/tools">tool catalog</Link>.</p>
        {changes.map(change => (
          <section key={change.pr} className="mt-8 border-t border-[#334563] pt-6">
            <time dateTime={change.date} className="font-mono text-xs text-[#f0b66a]">{change.label}</time>
            <h2>{change.title}</h2>
            <p>{change.text}</p>
            <a className="text-link" href={`https://github.com/OrionArchitekton/cosmocrat-web/pull/${change.pr}`}>Website PR #{change.pr}</a>
          </section>
        ))}
      </article>
    </div>
  );
}
