import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GovernanceContext from '@/components/os/GovernanceContext';
import PlatformPipeline from '@/components/os/PlatformPipeline';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

const description =
  'Cosmocrat governance architecture: policy, authority and decision receipts, with explicit separation from execution and independently released Orion tools.';
export const metadata = generatePageMetadata({
  title: 'Governance architecture',
  description,
  path: '/platform',
});

const topics = [
  [
    'Memory as infrastructure',
    '/memory-infrastructure',
    'What context may influence a decision, within an explicitly governed boundary.',
  ],
  [
    'Decision exhaust',
    '/decision-exhaust',
    'The policy, authority and state references behind a governed decision.',
  ],
  [
    'Runtime governance',
    '/runtime-governance',
    'Admission before a governed mutation, with the integration boundary made explicit.',
  ],
  [
    'Gate system',
    '/gate-system',
    'A conceptual model separating intent, decision, authority, execution and outcome.',
  ],
  [
    'Chronicle receipts',
    '/chronicle-receipts',
    'Authoritative decision records and their integrity and replay boundaries.',
  ],
  [
    'Drift guard',
    '/drift-guard',
    'Specified checks for divergence, with their scope and limitations.',
  ],
] as const;

const principles = [
  {
    name: 'Provable Trust',
    detail: 'Bind the decision to policy, authority and evidence that can be inspected.',
  },
  {
    name: 'Fail-Closed Control',
    detail: 'Refuse a governed request when required authority or evidence cannot be resolved.',
  },
  {
    name: 'Structural Accountability',
    detail:
      'Make scope and ownership explicit, and verify the controls at the actual integration boundary.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <GovernanceContext />
      <div className="wrap">
        <article className="origin-page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                generateFeatureSchema({
                  name: 'Governance architecture',
                  description,
                  path: '/platform',
                })
              ).replace(/</g, '\\u003c'),
            }}
          />
          <div className="eyebrow">Cosmocrat / Governance</div>
          <h1>
            Authority before
            <br />
            <em>a governed action.</em>
          </h1>
          <p>
            The governance kernel answers whether a proposed mutation is permitted under the
            applicable policy and authority, and records its decision. It does not perform the
            business work.
          </p>

          <PlatformPipeline />

          <h2>Trust is earned at a named boundary</h2>
          <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-[#233047] bg-[#121b2e]/70 p-4"
              >
                <div className="text-sm font-semibold text-[#f0b66a] mb-1.5">{item.name}</div>
                <p className="text-xs leading-relaxed text-[#b2c0d4] m-0">{item.detail}</p>
              </div>
            ))}
          </div>
          <p>
            These principles do not establish universal coverage across the Orion tools. Cooperative
            leases, procedure skills and local records retain their documented limitations. A
            permitted decision still needs separate outcome evidence.
          </p>

          <h2>Explore the architecture</h2>
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topics.map(([name, href, summary]) => (
              <Link
                className="tool-teaser"
                href={href}
                key={href}
              >
                <h3 className="text-base font-semibold text-white mb-2 flex items-center justify-between">
                  <span>{name}</span>
                  <ArrowRight size={14} className="text-[#f0b66a]" aria-hidden="true" />
                </h3>
                <p>{summary}</p>
              </Link>
            ))}
          </div>

          <h2>Availability and scope</h2>
          <p>
            The public catalog lists the independently released components. The private estate,
            governance kernel and enterprise deployment work are separate surfaces. This project
            home does not announce an enterprise service or a complete distribution.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/tools">
              See the available tools <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
