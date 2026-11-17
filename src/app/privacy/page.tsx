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
    <div className="wrap">
      <article className="origin-page">
        <div className="eyebrow">Cosmocrat / Legal</div>
        <h1 className="flex items-center gap-4">
          <span className="tool-icon">
            <Lock size={20} aria-hidden="true" />
          </span>
          <span>Privacy Policy</span>
        </h1>
        <p className="text-base text-[#cbd5e1]">
          Cosmocrat acts as a data processor for governance metadata. We do not own your data.
        </p>
        <div className="font-mono text-xs text-[#94a3b8] pb-8 border-b border-[#233047] mb-8">
          Last Updated: June 2026
        </div>

        <section className="mb-10">
          <h2>1. The Core Principle</h2>
          <div className="rounded-lg border border-[#f0b66a]/35 bg-[#d97706]/8 p-4 mb-4">
            <p className="m-0 font-medium text-white">
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
          <p className="text-sm text-[#94a3b8] italic">
            For data protection purposes, customers act as data controllers; Cosmocrat acts as a
            data processor limited to governance metadata.
          </p>
        </section>

        <section className="mb-10">
          <h2>2. What We Process</h2>
          <p>To provide governance, the system processes:</p>
          <ul className="list-disc pl-5 space-y-2 text-[#b2c0d4]">
            <li>
              <strong className="text-white">Decision Metadata:</strong> The &quot;shape&quot; of a
              decision (tool called, latency, success/fail status).
            </li>
            <li>
              <strong className="text-white">Policy Hashes:</strong> Cryptographic identifiers of
              the rules enforced.
            </li>
            <li>
              <strong className="text-white">Authority Records:</strong> Who authorized an action
              (User ID, API Key hash).
            </li>
            <li>
              <strong className="text-white">Execution Receipts:</strong> The immutable proof of the
              transaction.
            </li>
          </ul>
          <p className="mt-4">
            <strong className="text-white">Raw Payloads:</strong> By default, input prompts and
            output completions remain in your volatile memory or local logs. They are not
            transmitted to Orion Apex Capital unless you opt-in to hosted observability features.
          </p>
        </section>

        <section className="mb-10">
          <h2>3. What We Do Not Do</h2>
          <ul className="list-disc pl-5 space-y-2 text-[#b2c0d4]">
            <li>
              We do <strong className="text-white">not</strong> train AI models on your customer
              data or inputs.
            </li>
            <li>
              We do <strong className="text-white">not</strong> resell decision data or metadata.
            </li>
            <li>
              We do <strong className="text-white">not</strong> inject ads or tracking pixels into
              the runtime kernel.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>4. Data Location &amp; Control</h2>
          <p>
            <strong className="text-white">Standard Deployment:</strong> Data resides in your Virtual
            Private Cloud (VPC) or on-premise infrastructure. You hold the encryption keys. We
            cannot decrypt your run records.
          </p>
          <p>
            <strong className="text-white">Hosted Components:</strong> Hosted components never
            receive customer prompts, outputs, or execution payloads unless explicitly enabled by
            the customer. Only non-payload metadata (counts, health status, billing metrics) is
            transmitted for license verification and aggregated reporting.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Retention</h2>
          <p>
            <strong className="text-white">Receipts:</strong> Governance artifacts (receipts) are
            designed to be immutable and retained according to your compliance policy.
          </p>
          <p>
            <strong className="text-white">Deletion:</strong> If you terminate your license, you
            retain all data generated by the system. We have no &quot;kill switch&quot; for your
            local data.
          </p>
        </section>

        <div className="pt-8 border-t border-[#233047]">
          <p className="text-sm text-[#94a3b8]">
            Questions about data handling or privacy can be directed to{' '}
            <a href="mailto:contact@cosmocrat.ai" className="text-[#f0b66a] hover:underline">
              contact@cosmocrat.ai
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
