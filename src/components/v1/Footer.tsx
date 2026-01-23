import Link from 'next/link';
import { Terminal } from 'lucide-react';

const platformLinks = [
  { label: 'Memory as Infrastructure', href: '/memory-infrastructure' },
  { label: 'Decision Exhaust', href: '/decision-exhaust' },
  { label: 'Runtime Governance', href: '/runtime-governance' },
  { label: 'Gate System', href: '/gate-system' },
  { label: 'Chronicle Receipts', href: '/chronicle-receipts' },
  { label: 'Drift Guard', href: '/drift-guard' },
];

const supportLinks = [
  { label: 'About Cosmocrat', href: '/about' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-cosmo-card border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <img
                src="https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/cosmocrat-.png"
                alt="Cosmocrat Sigil"
                className="w-10 h-10 transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-bold text-cosmo-text group-hover:text-white transition-colors">
                Cosmocrat
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Live and Lead with Clarity.
              <br />
              The Governed AI Operating System.
              <br />
              Operated by Orion Apex Capital.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cosmo-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cosmo-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Orion Apex Capital. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              <Terminal size={14} />
              System Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
