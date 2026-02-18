import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'About',
  description:
    'Cosmocrat is the AI Operating System for governed memory and controlled execution, providing auditability, authority, and fail-closed enforcement at the runtime level.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen pb-24">
      <div className="pt-24 pb-12 bg-cosmo-card border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Cosmocrat</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Cosmocrat is a Governed AI Operating System that provides governed memory and controlled
            execution with auditability, authority, and fail-closed enforcement.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-16 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">What Cosmocrat Is</h2>
          <article className="prose prose-invert prose-lg text-slate-400">
            <p>
              An <strong>AI Operating System</strong> is the layer that manages how AI systems
              retain memory, make decisions, and execute actions across tools and workflows. It
              defines the runtime environment for AI, much like an operating system coordinates
              resources and enforces rules for software on a computer. Cosmocrat provides that layer
              for organizations that need durable AI memory and controlled execution across systems,
              not just isolated tasks.
            </p>
            <p>
              Cosmocrat extends the AI Operating System concept with governance at the OS layer.
              That means the operating system itself is responsible for control, not an external
              policy wrapper. Governance includes auditability, authority boundaries, and{' '}
              <Link
                href="/runtime-governance"
                className="text-cosmo-accent hover:underline"
              >
                runtime governance
              </Link>{' '}
              so that actions are accountable and bounded by policy.
            </p>
            <p>
              <strong>Governed memory</strong> is central to that design. Rather than treating
              memory as a loose cache or a simple vector store, Cosmocrat treats memory as a
              controlled resource with policy-defined access and retention. This allows
              organizations to preserve continuity and context while ensuring that memory usage
              remains aligned with authority and compliance requirements.
            </p>
            <p>
              <strong>Controlled execution</strong> is the counterpart to governed memory. The
              system defines how and when AI can act, what it is allowed to do, and which resources
              it can access. By keeping the execution layer governed alongside memory and
              decisioning, Cosmocrat defines a complete operating system boundary for AI rather than
              a set of isolated tools.
            </p>
          </article>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Governed Execution by Design</h2>
          <article className="prose prose-invert prose-lg text-slate-400">
            <p>
              In Cosmocrat, execution cannot outrun governance. Every action is evaluated against
              authority constraints before it runs, and the system is designed to fail closed when
              requirements are not met. This creates a predictable boundary for AI behavior and
              prevents silent escalation or unauthorized execution.
            </p>
            <p>
              Governed execution includes run records and auditability at the operating system
              level. The system preserves traceable run records, also known as{' '}
              <Link
                href="/decision-exhaust"
                className="text-cosmo-accent hover:underline"
              >
                decision exhaust
              </Link>
              , so operators can review what happened and why, without relying on ad-hoc logging.
              Details of specific implementation are documented elsewhere, but the top-level
              principle is consistent: execution is always within verifiable governance.
            </p>
            <p>
              This approach emphasizes human oversight without requiring constant manual
              intervention. Governance is designed into the system so that approvals, authority
              checks, and execution boundaries are enforced as part of the runtime. When a task
              falls outside permitted authority, the system stops and records the reason rather than
              attempting to continue or improvise.
            </p>
            <p>
              The result is a governed operating environment where the provenance of AI actions can
              be inspected and audited. Organizations can evaluate behavior at the level of runs and
              decisions rather than reconstructing activity from scattered logs. Cosmocrat is
              intended for environments where accountability and traceability are baseline
              requirements, not optional additions.
            </p>
          </article>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Architect &amp; Steward</h2>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/dan-mercede-executive-authority-sm.webp"
                alt="Dan Mercede"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold">Dan Mercede</p>
                <p className="text-slate-400 text-sm">Founder &amp; Systems Architect</p>
                <a
                  href="https://www.linkedin.com/in/danmercede/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors mt-1 inline-block"
                  aria-label="Dan Mercede on LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Cosmocrat is architected and maintained by Dan Mercede, Founder &amp; Systems
              Architect. Cosmocrat enforces deterministic runtime governance across agent
              workflows: authority is evaluated before state mutation, every decision produces an
              immutable receipt, drift is constrained over time, and execution is physically gated
              at the substrate. If policy cannot be verified, execution halts.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Name Disambiguation</h2>
          <article className="prose prose-invert prose-lg text-slate-400">
            <p>
              Cosmocrat, as used here, is a product name and technical system. It is unrelated to
              historical or theological uses of the term &quot;cosmocrat,&quot; and the organization
              does not claim affiliation with those meanings.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
