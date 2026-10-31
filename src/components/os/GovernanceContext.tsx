import Link from 'next/link';

export default function GovernanceContext() {
  return (
    <aside className="governance-context" aria-label="Architecture scope">
      <div className="wrap">
        <strong>Architecture reference</strong>
        <p>
          These pages explain Cosmocrat&apos;s governance design. Diagrams and example records are illustrative. The released Orion tools have
          independent versions and boundaries; family membership does not establish kernel
          integration, non-bypassable enforcement or comprehensive memory isolation. Check the{' '}
          <Link href="/tools">tool catalog</Link> for the available components.
        </p>
      </div>
    </aside>
  );
}
