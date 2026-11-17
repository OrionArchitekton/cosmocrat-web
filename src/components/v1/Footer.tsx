import Image from 'next/image';
import Link from 'next/link';

const productLinks = [
  ['Orion tools', '/tools'],
  ['Start here', '/docs'],
  ['Our story', '/about'],
  ['Request early access', '/waitlist'],
  ['Contact', '/contact'],
];

const architectureLinks = [
  ['Governance overview', '/platform'],
  ['Memory infrastructure', '/memory-infrastructure'],
  ['Decision exhaust', '/decision-exhaust'],
  ['Runtime governance', '/runtime-governance'],
  ['Gate system', '/gate-system'],
  ['Chronicle receipts', '/chronicle-receipts'],
  ['Drift guard', '/drift-guard'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Cosmocrat home" className="inline-block">
              <Image
                className="footer-logo"
                src="/brand/cosmocrat-wordmark.svg"
                alt="Cosmocrat"
                width={1753}
                height={241}
                unoptimized
              />
            </Link>
            <p className="footer-tagline">
              Tools and operating practices for human-directed AI work. Live and Lead with Clarity.
            </p>
            <p className="footer-credit">
              Architected by{' '}
              <a href="https://www.danmercede.com" rel="noreferrer">
                Dan Mercede
              </a>{' '}
              · Orion Apex Capital
            </p>
          </div>

          <div>
            <div className="footer-col-title">Tools &amp; Access</div>
            <nav className="footer-col-links" aria-label="Tools and access">
              {productLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Governance Architecture</div>
            <nav className="footer-col-links" aria-label="Further reading">
              {architectureLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Cosmocrat OS · Independent components and architectural references</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
