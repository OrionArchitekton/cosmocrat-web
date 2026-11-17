'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileText,
  GitBranch,
  Layers,
  Monitor,
  PanelsTopLeft,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import CommandSnippet from './CommandSnippet';
import ToolMatcher from './ToolMatcher';
import ReleaseLink from './ReleaseLink';
import { architecturePillars } from '@/lib/toolArchitecture';
import type { LucideIcon } from 'lucide-react';
import type { ToolCategory, ToolDefinition } from '@/lib/toolCatalog';

const icons: Record<ToolDefinition['icon'], LucideIcon> = {
  pm: ClipboardList,
  browser: PanelsTopLeft,
  phone: Smartphone,
  handoff: ArrowRightLeft,
  results: FileText,
  worktree: GitBranch,
  starter: Layers,
  shield: ShieldCheck,
  skills: BookOpen,
  remote: Monitor,
};

const categories: readonly { key: ToolCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'coordination', label: 'Coordination' },
  { key: 'access', label: 'Access' },
  { key: 'continuity', label: 'Continuity' },
  { key: 'practice', label: 'Practices' },
  { key: 'experimental', label: 'Experimental' },
];

export default function ToolCatalog({ tools }: { tools: readonly ToolDefinition[] }) {
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<ToolCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReady(true);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      search.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const counts = useMemo(() => {
    const map: Record<ToolCategory | 'all', number> = {
      all: tools.length,
      coordination: 0,
      access: 0,
      continuity: 0,
      practice: 0,
      experimental: 0,
    };
    for (const tool of tools) {
      map[tool.category] += 1;
    }
    return map;
  }, [tools]);

  const matches = tools.filter(
    (tool) =>
      (category === 'all' || tool.category === category) &&
      `${tool.id} ${tool.name} ${tool.kind} ${tool.version} ${tool.status} ${tool.tagline} ${tool.description} ${tool.environment} ${tool.boundary} ${tool.profiles?.map((profile) => profile.label).join(' ') ?? ''}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
  );
  const visible = new Set(matches.map((tool) => tool.id));

  return (
    <>
      {ready && (
        <ToolMatcher tools={tools} onChoose={() => {
          setCategory('all');
          setQuery('');
        }} />
      )}
      <div className="filter-controls" data-filter-controls hidden={!ready}>
        <div className="filters" role="group" aria-label="Filter tools by category">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className="filter"
              data-filter={key}
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              <span>{label}</span>
              <span className="filter-count">{counts[key]}</span>
            </button>
          ))}
        </div>
        <label className="search-wrap">
          <span className="sr-only">Search tools</span>
          <Search aria-hidden="true" />
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a tool or task… (press /)"
            aria-controls="tool-list"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                search.current?.focus();
              }}
              className="absolute right-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-800 hover:text-amber-300"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </label>
      </div>
      <div className="catalog-caption">
        <span
          className="result-count"
          data-result-count
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {matches.length} of {tools.length} tools
        </span>
        <p>
          Video companions may show earlier versions. Use the named release instructions for setup,
          and the guide&apos;s stated version when following an example.
        </p>
      </div>
      <div className="tool-grid" id="tool-list">
        {tools.map((tool) => {
          const Icon = icons[tool.icon];
          const pillar = architecturePillars.find((item) => item.toolId === tool.id);
          const preview = tool.status === 'PREVIEW' || tool.status === 'EXPERIMENTAL';
          return (
            <article
              className="tool-card"
              tabIndex={-1}
              data-tool={tool.id}
              data-category={tool.category}
              id={tool.id}
              key={tool.id}
              hidden={!visible.has(tool.id)}
            >
              <div className="card-top">
                <span className="tool-icon">
                  <Icon aria-hidden="true" />
                </span>
                <div className="card-status">
                  <span className="version">{tool.version}</span>
                  <span className={`tag${preview ? ' tag-preview' : ''}`}>{tool.status}</span>
                </div>
              </div>
              <div className="category">{tool.kind}</div>
              <h2>{tool.name}</h2>
              <p className="card-tagline">{tool.tagline}</p>
              <p className="card-description">{tool.description}</p>
              {tool.profiles?.map((profile) => (
                <div className="card-profile" key={profile.href}>
                  <a
                    href={profile.href}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                  >
                    <span>{profile.label}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              ))}
              <CommandSnippet tool={tool} />
              <details className="scope">
                <summary>Environment &amp; boundaries</summary>
                <p>
                  <strong>Environment.</strong> {tool.environment}
                </p>
                <p>
                  <strong>Boundary.</strong> {tool.boundary}
                </p>
                {pillar && (
                  <p>Related architecture. <a className="text-link" href={pillar.href}>{pillar.label}</a></p>
                )}
              </details>
              <div className="card-links">
                {tool.guide && (
                  <a href={tool.guide} rel="noreferrer">
                    {tool.guide_label || 'Read the guide'} <ArrowRight aria-hidden="true" />
                  </a>
                )}
                {!tool.guide && tool.source && (
                  <a href={tool.source} rel="noreferrer">
                    Instructions <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {tool.release && (
                  <ReleaseLink toolId={tool.id} href={tool.release} rel="noreferrer">
                    {tool.status === 'PREVIEW' ? 'Get the preview' : 'View release'}{' '}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </ReleaseLink>
                )}
                {!tool.release && tool.source && (
                  <a href={tool.source} rel="noreferrer">
                    Source &amp; instructions <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
              {tool.video && (
                <a className="watch-link" href={tool.video} rel="noreferrer">
                  <Play size={12} aria-hidden="true" /> Watch the guide companion
                </a>
              )}
            </article>
          );
        })}
      </div>
      <div className="empty-state" data-empty-state hidden={matches.length !== 0}>
        <h2>No tools match this view.</h2>
        <p>Try another search or return to the full collection.</p>
        <button
          type="button"
          className="button button-outline"
          data-reset-filters
          onClick={() => {
            setCategory('all');
            setQuery('');
            search.current?.focus();
          }}
        >
          Show all tools <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
