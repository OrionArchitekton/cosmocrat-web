import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import DocsPathFinder from '@/components/os/DocsPathFinder';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Start here',
  description:
    'Start with one Orion tool, follow its exact release instructions, or try a versioned Starter workflow. Existing guides remain at Dan Mercede.',
  path: '/docs',
});

export default function DocsPage() {
  return (
    <div className="wrap">
      <article className="origin-page">
        <div className="eyebrow">Cosmocrat / Start here</div>
        <h1>
          Begin with
          <br />
          <em>one useful task.</em>
        </h1>
        <p>
          Try the Starter development-evidence preview: one worker retains an observation, and a
          second recovers it and checks the current state. The pinned 0.3.0-rc.1 workflow needs no
          browser, phone account or provider key. Use its stated local environment.
        </p>

        <div className="button-row">
          <a
            className="button button-primary"
            href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
            rel="noreferrer"
          >
            Try the development-evidence preview <ArrowRight aria-hidden="true" />
          </a>
          <Link className="button button-outline" href="/tools">
            Browse all 10 tools <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <DocsPathFinder />

        <p>
          For task ownership alone,{' '}
          <a
            className="text-link"
            href="https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm"
            rel="noreferrer"
          >
            start with the PM guide <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          .
        </p>

        <h2>Choose your next piece</h2>
        <p>
          The catalog links each tool to its named release, guide, supported environment and scope.
          Video companions may show earlier releases; use the guide’s stated version when following
          an example.
        </p>
        <Link className="text-link" href="/tools">
          Explore the tool catalog <ArrowRight aria-hidden="true" />
        </Link>

        <h2>Try selected tools together</h2>
        <p>
          The continuity walkthrough remains pinned to Starter 0.2.0-rc.1. The development-evidence
          walkthrough teaches 0.3.0-rc.1. Both are previews with named local environments, not a
          complete OS installer.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-6">
          <a
            href="https://www.danmercede.com/guides/continue-agent-tasks-with-orion-starter"
            rel="noreferrer"
            className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-5 hover:border-[#f0b66a]/60 transition-colors block"
          >
            <div className="font-mono text-[11px] text-[#f0b66a] mb-1">Starter 0.2.0-rc.1</div>
            <div className="text-base font-semibold text-white mb-2 flex items-center justify-between">
              <span>Continuity guide</span>
              <ArrowUpRight size={15} className="text-[#f0b66a]" aria-hidden="true" />
            </div>
            <p className="text-xs text-[#94a3b8] m-0">
              Bounded session state and explicit task handoffs between workers.
            </p>
          </a>
          <a
            href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
            rel="noreferrer"
            className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-5 hover:border-[#f0b66a]/60 transition-colors block"
          >
            <div className="font-mono text-[11px] text-[#f0b66a] mb-1">Starter 0.3.0-rc.1</div>
            <div className="text-base font-semibold text-white mb-2 flex items-center justify-between">
              <span>Development-evidence guide</span>
              <ArrowUpRight size={15} className="text-[#f0b66a]" aria-hidden="true" />
            </div>
            <p className="text-xs text-[#94a3b8] m-0">
              Retained result snapshots paired with repository worktree overlap reports.
            </p>
          </a>
        </div>

        <h2>Engineering field notes</h2>
        <ul className="my-5 space-y-3">
          <li><Link className="text-link" href="/guides/agent-handoff-pattern">Hand off an agent task with recoverable evidence</Link></li>
          <li><Link className="text-link" href="/guides/preventing-worktree-collisions">Check for collisions between Git worktrees</Link></li>
          <li><Link className="text-link" href="/changelog">Cosmocrat web changelog</Link></li>
        </ul>

        <h2>Understand the governance work</h2>
        <p>
          Architecture pages explain the separate kernel, authority and receipt design. They do not
          promise those controls for every released tool.
        </p>
        <Link className="text-link" href="/platform">
          Read the architecture <ArrowRight aria-hidden="true" />
        </Link>
      </article>
    </div>
  );
}
