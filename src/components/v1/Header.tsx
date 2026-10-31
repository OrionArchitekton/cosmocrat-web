'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: 'Principles', href: '/#principles' },
  { label: 'Our story', href: '/about' },
];
const firstGuide = 'https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm';

export default function Header({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const close = useCallback(() => {
    if (menu.current) menu.current.open = false;
  }, []);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) close();
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [close]);

  const navigation = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={close}
      aria-current={pathname === link.href ? 'page' : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {preview && (
        <div className="preview-bar">
          <div className="wrap">
            <span className="preview-label">LOCAL PREVIEW</span>
            <span>Accepted visual direction · Publication on hold</span>
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand-link" href="/" aria-label="Cosmocrat home">
            <Image
              className="wordmark"
              src="/brand/cosmocrat-wordmark.svg"
              alt="Cosmocrat"
              width={1753}
              height={241}
              priority
              unoptimized
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation}
            <a className="nav-cta" href={firstGuide} rel="noreferrer">
              Start with one task <ArrowRight aria-hidden="true" />
            </a>
          </nav>
          <details
            className="mobile-nav"
            ref={menu}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && menu.current?.open) {
                close();
                summary.current?.focus();
              }
            }}
          >
            <summary ref={summary}>
              Menu <Menu aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              {navigation}
              <a href={firstGuide} rel="noreferrer" onClick={close}>
                Start with one task ↗
              </a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
