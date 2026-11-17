import { FileText } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms of operation for the Cosmocrat Engine and associated services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="wrap">
      <article className="origin-page">
        <div className="eyebrow">Cosmocrat / Legal</div>
        <h1 className="flex items-center gap-4">
          <span className="tool-icon">
            <FileText size={20} aria-hidden="true" />
          </span>
          <span>Terms of Service</span>
        </h1>
        <p className="text-base text-[#cbd5e1]">
          Terms of operation for the Cosmocrat Engine and associated services.
        </p>
        <div className="font-mono text-xs text-[#94a3b8] pb-8 border-b border-[#233047] mb-8">
          Last Updated: June 2026
        </div>

        <section className="mb-10">
          <h2>1. Scope of Service</h2>
          <div className="rounded-lg border border-[#334563] bg-[#121b2e]/80 p-4 mb-4">
            <p className="m-0 font-medium text-white">
              Cosmocrat governs decisions; customers remain responsible for outcomes.
            </p>
          </div>
          <p>
            Cosmocrat provides the control plane, enforcement kernel, and memory infrastructure for
            Artificial Intelligence systems. We are not an AI model provider, and we do not
            generate the content or decisions ourselves. We provide the mechanism to enforce{' '}
            <em>your</em> policies on <em>your</em> models.
          </p>
        </section>

        <section className="mb-10">
          <h2>2. Fail-Closed Semantics</h2>
          <p>
            The system is designed to &quot;fail closed.&quot; This means that if a policy check
            fails, a network error occurs, or authority cannot be verified, the execution is
            blocked. By using Cosmocrat, you acknowledge that this safety mechanism may interrupt
            workflows to prevent unauthorized actions. This is a feature, not a bug.
          </p>
        </section>

        <section className="mb-10">
          <h2>3. Customer Responsibilities</h2>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-5 space-y-2 text-[#b2c0d4]">
            <li>
              <strong className="text-white">Policy Definition:</strong> Defining the rules (logic,
              thresholds, permissions) that Cosmocrat enforces.
            </li>
            <li>
              <strong className="text-white">Authority Assignment:</strong> Granting access keys and
              roles to your users and agents.
            </li>
            <li>
              <strong className="text-white">Compliance:</strong> Ensuring your use of AI complies
              with applicable laws in your jurisdiction.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>4. Receipts &amp; Audit</h2>
          <p>
            <strong className="text-white">Evidence, not Insurance.</strong> Chronicle Receipts
            provide cryptographic proof of system state and policy evaluation at the time of
            execution. They are intended for audit, debugging, and compliance verification. They do
            not indemnify you against liability for the actions taken by your AI agents.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Early Access Terms</h2>
          <p>
            Services designated as &quot;Early Access,&quot; &quot;Alpha,&quot; or &quot;Beta&quot;
            are provided &quot;as-is,&quot; without warranty of any kind. Features may change. We do
            not offer a Service Level Agreement (SLA) for Early Access deployments.
          </p>
        </section>

        <section className="mb-10">
          <h2>6. Termination</h2>
          <p>
            Upon termination of service, you retain the right to use the generated data (logs,
            receipts, memory snapshots) stored in your infrastructure. Your license to the
            Cosmocrat Engine software itself will be revoked, requiring uninstallation of the kernel
            components.
          </p>
        </section>

        <section className="mb-10">
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of Ohio, without regard to conflict-of-law
            principles.
          </p>
        </section>
      </article>
    </div>
  );
}
