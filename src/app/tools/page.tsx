import { ArrowRight } from 'lucide-react';
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
