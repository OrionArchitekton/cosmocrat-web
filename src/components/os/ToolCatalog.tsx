'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  ClipboardList,
  FileText,
  GitBranch,
  Layers,
  Monitor,
  PanelsTopLeft,
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
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
  useEffect(() => setReady(true), []);
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
              {label}
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
            placeholder="Find a tool or a task…"
            aria-controls="tool-list"
            autoComplete="off"
          />
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
          {matches.length} of {tools.length} tools &amp; profiles
        </span>
        <p>
          Video companions may show earlier versions. Use the named release instructions for setup,
          and the guide&apos;s stated version when following an example.
        </p>
      </div>
      <div className="tool-grid" id="tool-list">
        {tools.map((tool) => {
          const Icon = icons[tool.icon];
          const preview = tool.status === 'PREVIEW' || tool.status === 'EXPERIMENTAL';
          return (
            <article
              className="tool-card"
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
                  <a href={profile.href} rel="noreferrer">
                    {profile.label} ↗
                  </a>
                </div>
              ))}
              <details className="scope">
                <summary>Environment &amp; boundaries</summary>
                <p>
                  <strong>Environment.</strong> {tool.environment}
                </p>
                <p>
                  <strong>Boundary.</strong> {tool.boundary}
                </p>
              </details>
              <div className="card-links">
                {tool.guide && (
                  <a href={tool.guide} rel="noreferrer">
                    {tool.guide_label || 'Read the guide'} <ArrowRight aria-hidden="true" />
                  </a>
                )}
                {!tool.guide && tool.source && (
                  <a href={tool.source} rel="noreferrer">
                    Instructions ↗
                  </a>
                )}
                {tool.release && (
                  <a href={tool.release} rel="noreferrer">
                    {tool.status === 'PREVIEW' ? 'Get the preview' : 'View release'} ↗
                  </a>
                )}
                {!tool.release && tool.source && (
                  <a href={tool.source} rel="noreferrer">
                    Source &amp; instructions ↗
                  </a>
                )}
              </div>
              {tool.video && (
                <a className="watch-link" href={tool.video} rel="noreferrer">
                  ▷ Watch the guide companion
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
