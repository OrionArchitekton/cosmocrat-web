import { ArrowRight, Compass, Layers, Wrench } from 'lucide-react';
import ToolCatalog from '@/components/os/ToolCatalog';
import { tools } from '@/lib/toolCatalog';
import { generatePageMetadata } from '@/lib/metadata';
import { generateToolCatalogSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'The Orion tools',
  description:
    'Explore independently usable Orion tools for coordinating agents, carrying context, browser and phone access, and recoverable results. Starter profiles remain previews.',
  path: '/tools',
});

const tiers = [
  {
    icon: Wrench,
    label: 'Standalone releases',
    summary:
      'Orion PM, Browser, Phone, Handoff, Worktree Report, failclosed, and Skills install independently.',
  },
  {
    icon: Layers,
    label: 'Starter previews',
    summary:
      'Orion Results and Orion Starter (0.3.0-rc.1) test multiple tools working together in local workflows.',
  },
  {
    icon: Compass,
    label: 'Experimental source',
    summary:
      'Remote Hands publishes MIT source with explicit start-only public boundaries and no packaged release.',
  },
];

export default function ToolsPage() {
  return (
    <div className="os-page">
      {generateToolCatalogSchema().map((schema) => (
        <script
          key={schema['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
      <section className="catalog-hero">
        <div className="wrap">
          <div className="eyebrow">Cosmocrat OS / The Orion tools</div>
          <h1>
            Build the part
            <br />
            <em>you need next.</em>
          </h1>
          <p className="lead">
            Coordinate a task. Give an agent its own browser. Carry the right context into another
            session. Each piece keeps its own name, release, instructions, and boundaries.
          </p>
          <div className="catalog-meta">
            <span>INDEPENDENT COMPONENTS</span>
            <span>STARTER PREVIEWS</span>
            <span>HUMAN DIRECTION</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            {tiers.map(({ icon: Icon, label, summary }) => (
              <div
                key={label}
                className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#f0b66a]">
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </div>
                <p className="m-0 text-xs leading-relaxed text-[#94a3b8]">{summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="catalog-main">
        <div className="wrap">
          <ToolCatalog tools={tools} />
          <div className="catalog-note">
            <h2>
              Choose a boundary
              <br />
              you understand.
            </h2>
            <p>
              Check the named release, environment, security model, and recovery instructions before
              connecting accounts or sensitive work. The complete private Orion Estate and Cosmocrat
              governance kernel are not included in these downloads. Family membership does not
              imply kernel enforcement.
            </p>
          </div>
        </div>
      </section>
      <section className="closing">
        <div className="wrap closing-inner">
          <div>
            <h2>One task is a good beginning.</h2>
            <p>The Orion PM guide shows two local workers coordinating one job.</p>
          </div>
          <a
            className="button button-primary"
            href="https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm"
            rel="noreferrer"
          >
            Start with Orion PM <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
