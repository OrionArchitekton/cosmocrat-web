import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of operation for the Cosmocrat Engine and associated services.',
  alternates: { canonical: `${baseUrl}/terms` },
  openGraph: {
    title: 'Terms of Service | Cosmocrat',
    description: 'Terms of operation for the Cosmocrat Engine and associated services.',
    url: `${baseUrl}/terms`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen py-24 px-4 font-sans text-slate-300 selection:bg-amber-900/30">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-4">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <FileText className="text-cosmo-accent" size={32} />
            </div>
            Terms of Service
          </h1>
          <p className="text-lg text-slate-400">
            Terms of operation for the Cosmocrat Engine and associated services.
          </p>
          <div className="mt-6 text-xs text-slate-500 font-mono">Last Updated: January 2025</div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none leading-relaxed space-y-10">
          <section>
            <h3 className="text-white font-bold text-xl mb-4">1. Scope of Service</h3>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg border-l-4 border-l-slate-700 mb-4">
              <p className="font-medium text-white mb-0">
                Cosmocrat governs decisions; customers remain responsible for outcomes.
              </p>
            </div>
            <p>
              Cosmocrat provides the control plane, enforcement kernel, and memory infrastructure
              for Artificial Intelligence systems. We are not an AI model provider, and we do not
              generate the content or decisions ourselves. We provide the mechanism to enforce{' '}
              <em>your</em> policies on <em>your</em> models.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">2. Fail-Closed Semantics</h3>
            <p>
              The system is designed to &quot;fail closed.&quot; This means that if a policy check
              fails, a network error occurs, or authority cannot be verified, the execution is
              blocked. By using Cosmocrat, you acknowledge that this safety mechanism may interrupt
              workflows to prevent unauthorized actions. This is a feature, not a bug.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">3. Customer Responsibilities</h3>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-4 space-y-2 text-slate-400 mt-2">
              <li>
                <strong>Policy Definition:</strong> Defining the rules (logic, thresholds,
                permissions) that Cosmocrat enforces.
              </li>
              <li>
                <strong>Authority Assignment:</strong> Granting access keys and roles to your users
                and agents.
              </li>
              <li>
                <strong>Compliance:</strong> Ensuring your use of AI complies with applicable laws
                in your jurisdiction.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">4. Receipts & Audit</h3>
            <p>
              <strong>Evidence, not Insurance.</strong> Chronicle Receipts provide cryptographic
              proof of system state and policy evaluation at the time of execution. They are
              intended for audit, debugging, and compliance verification. They do not indemnify you
              against liability for the actions taken by your AI agents.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">5. Early Access Terms</h3>
            <p>
              Services designated as &quot;Early Access,&quot; &quot;Alpha,&quot; or
              &quot;Beta&quot; are provided &quot;as-is,&quot; without warranty of any kind.
              Features may change. We do not offer a Service Level Agreement (SLA) for Early Access
              deployments.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">6. Termination</h3>
            <p>
              Upon termination of service, you retain the right to use the generated data (logs,
              receipts, memory snapshots) stored in your infrastructure. Your license to the
              Cosmocrat Engine software itself will be revoked, requiring uninstallation of the
              kernel components.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">7. Governing Law</h3>
            <p>
              These terms are governed by the laws of [Jurisdiction], without regard to
              conflict-of-law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
