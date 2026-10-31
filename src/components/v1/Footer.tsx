import Image from 'next/image';
import Link from 'next/link';

const links = [
  ['Tools', '/tools'],
  ['Our story', '/about'],
  ['Governance', '/platform'],
  ['Memory', '/memory-infrastructure'],
  ['Decision exhaust', '/decision-exhaust'],
  ['Runtime governance', '/runtime-governance'],
  ['Gates', '/gate-system'],
  ['Chronicle', '/chronicle-receipts'],
  ['Drift', '/drift-guard'],
  ['Documentation', '/docs'],
  ['Contact', '/contact'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-inner">
          <Link href="/" aria-label="Cosmocrat home">
            <Image
              className="footer-logo"
              src="/brand/cosmocrat-wordmark.svg"
              alt="Cosmocrat"
              width={1753}
              height={241}
              unoptimized
            />
          </Link>
          <div className="footer-right">
            Live and Lead with Clarity.
            <br />
            Built by{' '}
            <a href="https://www.danmercede.com" rel="noreferrer">
              Dan Mercede
            </a>
            .
          </div>
        </div>
        <nav className="footer-links" aria-label="Further reading">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
