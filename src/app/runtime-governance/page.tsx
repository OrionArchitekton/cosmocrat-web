import Script from 'next/script';
import RuntimeGovernanceContent from '@/components/v1/pages/RuntimeGovernanceContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Runtime Governance',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  path: '/runtime-governance',
});

const schema = generateFeatureSchema({
  name: 'Runtime Governance',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  path: '/runtime-governance',
});

export default function RuntimeGovernancePage() {
  return (
    <>
      <Script
        id="ldjson-runtime-governance"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <RuntimeGovernanceContent />
    </>
  );
}
