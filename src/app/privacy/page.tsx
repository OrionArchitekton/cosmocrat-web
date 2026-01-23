import { Lock } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Cosmocrat acts as a data processor for governance metadata. We do not own your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="bg-cosmo-dark min-h-screen py-24 px-4 font-sans text-slate-300 selection:bg-amber-900/30">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-4">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <Lock className="text-cosmo-accent" size={32} />
            </div>
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-400">
            Cosmocrat acts as a data processor for governance metadata. We do not own your data.
          </p>
          <div className="mt-6 text-xs text-slate-500 font-mono">Last Updated: January 2025</div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none leading-relaxed space-y-10">
          <section>
            <h3 className="text-white font-bold text-xl mb-4">1. The Core Principle</h3>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg border-l-4 border-l-cosmo-accent mb-4">
              <p className="font-medium text-white mb-0">
                Cosmocrat governs execution; it does not harvest payload data.
              </p>
            </div>
            <p>
              Unlike model providers or standard SaaS applications, Cosmocrat operates as
              infrastructure. In our standard deployment model, the Cosmocrat Engine runs entirely
              within your environment. We do not require access to your databases, we do not train
              models on your data, and we do not retain payload data unless explicitly configured
              for audit purposes.
            </p>
            <p className="text-sm text-slate-400 italic">
              For data protection purposes, customers act as data controllers; Cosmocrat acts as a
              data processor limited to governance metadata.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">2. What We Process</h3>
            <p>To provide governance, the system processes:</p>
            <ul className="list-disc pl-4 space-y-2 text-slate-400 mt-2">
              <li>
                <strong>Decision Metadata:</strong> The &quot;shape&quot; of a decision (tool
                called, latency, success/fail status).
              </li>
              <li>
                <strong>Policy Hashes:</strong> Cryptographic identifiers of the rules enforced.
              </li>
              <li>
                <strong>Authority Records:</strong> Who authorized an action (User ID, API Key
                hash).
              </li>
              <li>
                <strong>Execution Receipts:</strong> The immutable proof of the transaction.
              </li>
            </ul>
            <p className="mt-4">
              <strong>Raw Payloads:</strong> By default, input prompts and output completions remain
              in your volatile memory or local logs. They are not transmitted to Orion Apex Capital
              unless you opt-in to hosted observability features.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">3. What We Do Not Do</h3>
            <ul className="list-disc pl-4 space-y-2 text-slate-400">
              <li>
                We do <strong>not</strong> train AI models on your customer data or inputs.
              </li>
              <li>
                We do <strong>not</strong> resell decision data or metadata.
              </li>
              <li>
                We do <strong>not</strong> inject ads or tracking pixels into the runtime kernel.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">4. Data Location & Control</h3>
            <p>
              <strong>Standard Deployment:</strong> Data resides in your Virtual Private Cloud (VPC)
              or on-premise infrastructure. You hold the encryption keys. We cannot decrypt your run
              records.
            </p>
            <p className="mt-2">
              <strong>Hosted Components:</strong> Hosted components never receive customer prompts,
              outputs, or execution payloads unless explicitly enabled by the customer. Only
              non-payload metadata (counts, health status, billing metrics) is transmitted for
              license verification and aggregated reporting.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-xl mb-4">5. Retention</h3>
            <p>
              <strong>Receipts:</strong> Governance artifacts (receipts) are designed to be
              immutable and retained according to your compliance policy.
            </p>
            <p className="mt-2">
              <strong>Deletion:</strong> If you terminate your license, you retain all data
              generated by the system. We have no &quot;kill switch&quot; for your local data.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-800/50">
            <p className="text-sm text-slate-500">
              Questions about data handling or privacy can be directed to{' '}
              <a href="mailto:contact@cosmocrat.ai" className="text-cosmo-accent hover:underline">
                contact@cosmocrat.ai
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
