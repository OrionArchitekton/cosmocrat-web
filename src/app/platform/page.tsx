import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GovernanceContext from '@/components/os/GovernanceContext';
import PlatformPipeline from '@/components/os/PlatformPipeline';
import { architecturePillars } from '@/lib/toolArchitecture';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

const description =
  'Cosmocrat governance architecture: policy, authority and decision receipts, with explicit separation from execution and independently released Orion tools.';
export const metadata = generatePageMetadata({
  title: 'Governance architecture',
  description,
  path: '/platform',
});

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

          <h2 id="tool-boundaries" className="scroll-mt-28">Public tools and the private kernel</h2>
          <p>
            Each tool below addresses a related problem independently. The kernel column describes
            the governance responsibility at an explicitly enrolled boundary.
          </p>
          <table aria-labelledby="tool-boundaries" className="my-6 block w-full text-left text-sm md:table">
            <thead className="sr-only md:not-sr-only md:table-header-group">
              <tr className="text-xs text-[#94a3b8]">
                <th scope="col" className="py-2 pr-4">Architecture</th>
                <th scope="col" className="py-2 pr-4">Public tool</th>
                <th scope="col" className="py-2">Private kernel</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {architecturePillars.map((item) => (
                <tr key={item.href} id={`compare-${item.toolId}`} className="block scroll-mt-28 border-t border-[#334155] py-4 align-top md:table-row">
                  <th scope="row" className="block font-semibold md:table-cell md:w-1/4 md:py-3 md:pr-4">
                    <Link className="text-link" href={item.href}>{item.label}</Link>
                  </th>
                  <td className="mt-2 block text-[#b2c0d4] md:table-cell md:py-3 md:pr-4">
                    <span className="block text-xs text-[#94a3b8] md:hidden">Public tool</span>
                    <Link className="text-link" href={`/tools#${item.toolId}`}>{item.tool}</Link>
                    <span className="mt-1 block">{item.practice}</span>
                  </td>
                  <td className="mt-2 block text-[#b2c0d4] md:table-cell md:w-1/3 md:py-3">
                    <span className="block text-xs text-[#94a3b8] md:hidden">Private kernel</span>
                    {item.boundary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
