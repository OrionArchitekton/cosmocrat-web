'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu } from 'lucide-react';
import CommandPalette from '@/components/os/CommandPalette';

const links = [
  { label: 'Tools', href: '/tools' },
  { label: 'Architecture', href: '/platform' },
  { label: 'Start here', href: '/docs' },
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
      <header className="site-header">
        {preview && (
          <div className="preview-bar">
            <div className="wrap">
              <span className="preview-label">LOCAL PREVIEW</span>
              <span>Interactive preview environment · Publication controls active</span>
            </div>
          </div>
        )}
        <div className="wrap header-inner">
          <Link className="brand-link" href="/" aria-label="Cosmocrat home">
            <picture>
              <source srcSet="/brand/cosmocrat-wordmark-380w.avif" type="image/avif" />
              <source srcSet="/brand/cosmocrat-wordmark-380w.webp" type="image/webp" />
              <img
                className="wordmark"
                src="/brand/cosmocrat-wordmark.png"
                alt="Cosmocrat"
                width={380}
                height={52}
                decoding="async"
              />
            </picture>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation}
          </nav>

          <div className="header-actions">
            <CommandPalette />
            <a className="nav-cta" href={firstGuide} rel="noreferrer">
              Start with one task <ArrowRight aria-hidden="true" />
            </a>
          </div>

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
              <Link href="/" onClick={close}>
                Home
              </Link>
              {navigation}
              <Link href="/waitlist" onClick={close}>
                Request Early Access
              </Link>
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
