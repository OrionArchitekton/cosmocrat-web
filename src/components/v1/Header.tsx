'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact', href: '/contact' },
];


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-cosmo-dark/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/wordmark-logo_light.png"
                alt="Cosmocrat"
                width={420}
                height={56}
                priority
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isActive
                      ? 'text-cosmo-accent'
                      : 'text-slate-300 hover:text-cosmo-accent'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/waitlist"
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${pathname === '/waitlist'
                  ? 'bg-cosmo-accent text-white'
                  : 'bg-cosmo-accent/10 border border-cosmo-accent/50 text-cosmo-accent hover:bg-cosmo-accent hover:text-white'
                }`}
            >
              Request Early Access
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-cosmo-card border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                      ? 'text-cosmo-accent bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/waitlist"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-4 px-3 py-2 text-center rounded-md text-base font-medium bg-cosmo-accent text-white"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
