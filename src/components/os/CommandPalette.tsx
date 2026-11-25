'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Cpu, Search, Terminal, X } from 'lucide-react';
import { tools } from '@/lib/toolCatalog';

interface PaletteItem {
  id: string;
  label: string;
  section: string;
  href: string;
  keywords: string;
}

const staticPages: PaletteItem[] = [
  { id: 'home', label: 'Home | Cosmocrat OS', section: 'Pages', href: '/', keywords: 'home overview os' },
  { id: 'tools', label: 'Orion Tool Catalog', section: 'Pages', href: '/tools', keywords: 'tools catalog pm browser phone handoff' },
  { id: 'platform', label: 'Governance Architecture', section: 'Architecture', href: '/platform', keywords: 'platform governance kernel' },
  { id: 'gate-system', label: 'Gate System (G0-G6)', section: 'Architecture', href: '/gate-system', keywords: 'gates authorization admission g4' },
  { id: 'runtime-governance', label: 'Runtime Governance', section: 'Architecture', href: '/runtime-governance', keywords: 'runtime kernel boundary' },
  { id: 'memory-infrastructure', label: 'Memory Infrastructure', section: 'Architecture', href: '/memory-infrastructure', keywords: 'memory lanes side-brain engrams' },
  { id: 'decision-exhaust', label: 'Decision Exhaust', section: 'Architecture', href: '/decision-exhaust', keywords: 'exhaust audit receipts policy' },
  { id: 'chronicle-receipts', label: 'Chronicle Receipts', section: 'Architecture', href: '/chronicle-receipts', keywords: 'chronicle receipts policy hash replay' },
  { id: 'drift-guard', label: 'Drift Guard', section: 'Architecture', href: '/drift-guard', keywords: 'drift integrity monitoring' },
  { id: 'docs', label: 'Start Here & Guides', section: 'Getting Started', href: '/docs', keywords: 'docs guides quickstart preview' },
  { id: 'about', label: 'Our Story & Orion Estate', section: 'Pages', href: '/about', keywords: 'story about dan mercede orion estate' },
  { id: 'waitlist', label: 'Request Early Access', section: 'Access', href: '/waitlist', keywords: 'waitlist early access enterprise' },
  { id: 'contact', label: 'Contact', section: 'Access', href: '/contact', keywords: 'contact email' },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<PaletteItem[]>(() => {
    const toolItems: PaletteItem[] = tools.map((tool) => ({
      id: `tool-${tool.id}`,
      label: `${tool.name} (${tool.version})`,
      section: 'Orion Tools',
      href: `/tools#${tool.id}`,
      keywords: `${tool.name} ${tool.kind} ${tool.tagline} ${tool.category}`,
    }));
    return [...staticPages, ...toolItems];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        className="cmd-trigger"
        onClick={() => setOpen(true)}
        aria-keyshortcuts="Meta+K Control+K"
      >
        <Search size={13} aria-hidden="true" />
        <span>Quick jump</span>
        <kbd className="cmd-kbd" aria-hidden="true">⌘K</kbd>
      </button>

      {open && (
        <div
          className="cmd-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="cmd-dialog">
            <div className="cmd-input-row">
              <Terminal size={16} className="text-amber-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, filtered.length - 1)));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                  } else if (e.key === 'Enter' && filtered[activeIndex]) {
                    e.preventDefault();
                    navigate(filtered[activeIndex].href);
                  }
                }}
                placeholder="Jump to a tool, architecture page, or guide…"
                aria-label="Filter destinations"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close quick navigation"
              >
                <X size={16} />
              </button>
            </div>
            <div className="cmd-results">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs text-slate-400">
                  No matching pages or tools found.
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className="cmd-item"
                    data-active={idx === activeIndex}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => navigate(item.href)}
                  >
                    <span className="flex items-center gap-2.5">
                      {item.section === 'Architecture' ? (
                        <Cpu size={14} className="text-amber-400" aria-hidden="true" />
                      ) : (
                        <Compass size={14} className="text-slate-400" aria-hidden="true" />
                      )}
                      <span>{item.label}</span>
                    </span>
                    <span className="cmd-item-sub flex items-center gap-2">
                      <span>{item.section}</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
