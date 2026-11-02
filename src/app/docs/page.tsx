import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
          one useful task.
        </h1>
        <p>
          Try the Starter development-evidence preview: one worker retains an observation, and a
          second recovers it and checks the current state. The pinned 0.3.0-rc.1 workflow needs
          no browser, phone account or provider key. Use its stated local environment.
        </p>
        <a
          className="button button-primary"
          href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
          rel="noreferrer"
        >
          Try the development-evidence preview <ArrowRight aria-hidden="true" />
        </a>
        <p>
          For task ownership alone, <a className="text-link" href="https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm">start with the PM guide ↗</a>.
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
        <div className="button-row">
          <a
            className="text-link"
            href="https://www.danmercede.com/guides/continue-agent-tasks-with-orion-starter"
            rel="noreferrer"
          >
            Continuity guide ↗
          </a>
          <a
            className="text-link"
            href="https://www.danmercede.com/guides/agent-development-evidence-handoff"
            rel="noreferrer"
          >
            Development-evidence guide ↗
          </a>
        </div>
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
