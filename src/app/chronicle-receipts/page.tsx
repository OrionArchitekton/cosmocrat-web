import GovernanceContext from '@/components/os/GovernanceContext';
import ChronicleReceiptsContent from '@/components/v1/pages/ChronicleReceiptsContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Chronicle Receipts',
  description: 'Cosmocrat authoritative decision receipts, policy references and replay boundaries. Local tool records do not inherit Chronicle authority.',
  path: '/chronicle-receipts',
});

const schema = generateFeatureSchema({
  name: 'Chronicle Receipts',
  description: 'Cosmocrat authoritative decision receipts, policy references and replay boundaries. Local tool records do not inherit Chronicle authority.',
  path: '/chronicle-receipts',
});
const schemaJson = JSON.stringify(schema);

export default function ChronicleReceiptsPage() {
  return (
    <>
      <GovernanceContext />
      <script
        id="ldjson-chronicle-receipts"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <ChronicleReceiptsContent />
    </>
  );
}
