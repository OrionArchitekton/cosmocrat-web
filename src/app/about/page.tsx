import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Our story',
  description:
    'Cosmocrat began with cognitive continuity and human sovereignty. The Orion Estate put that philosophy to work; independent tools, guides and previews carry the lessons forward.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="wrap">
      <article className="origin-page">
        <div className="eyebrow">Cosmocrat / Our story</div>
        <h1>
          From an idea to
          <br />
          the way we work.
        </h1>
        <p>
          Cosmocrat began with a question: how can intelligence preserve a person’s intent over time
          while remaining under that person’s authority?
        </p>
        <p>
          The original ambition was a user-owned cognitive continuity layer: memory and context that
          could connect the tools a person already uses. Human sovereignty, governed memory and
          trust supported by evidence remain the foundation.
        </p>
        <h2>Putting the philosophy to work</h2>
        <p>
          The Orion Estate is Dan Mercede’s private operating environment for software, agents,
          media and business workflows. Running it turned the ambition into practical questions: who
          owns this task, which browser belongs to this account, what does the next session need,
          and what evidence establishes that the work actually happened?
        </p>
        <p>
          The Orion tools are independently released pieces shaped by those questions. Guides and
          demonstrations make their behavior and limits inspectable. The tools keep their own names,
          versions, licenses and support boundaries.
        </p>
        <h2>Governance retains its own responsibility</h2>
        <p>
          The enterprise work developed a narrower governance boundary: evaluate policy and
          authority, return an explicit decision, and preserve its authoritative receipt. Execution
          remains with the runtime and the business workflow.
        </p>
        <p>
          Cosmocrat OS is the broader project identity. Membership in that family does not establish
          kernel integration, universal memory isolation or enforcement that cannot be bypassed.
          Local observations, task records and authoritative governance receipts retain their
          distinct roles.
        </p>
        <h2>The part available today</h2>
        <p>
          You can use independent components and try selected Starter profiles. The full environment
          is still taking shape; there is no complete OS installer or universal platform support
          promise. Each selected workflow names its versions, environment and observed scope.
        </p>
        <p>
          Cosmocrat is architected and maintained by Dan Mercede. The project is unrelated to
          historical or theological uses of the word “cosmocrat.”
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="/tools">
            Explore the tools <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="text-link" href="/platform">
            Read the governance principles <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
