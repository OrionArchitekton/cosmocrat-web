import ChronicleReceiptsContent from '@/components/v1/pages/ChronicleReceiptsContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Chronicle Receipts',
  description:
    'Cryptographic evidence of AI authorization. Every executed action generates a verifiable receipt binding policy hash to outcome.',
  path: '/chronicle-receipts',
});

const schema = generateFeatureSchema({
  name: 'Chronicle Receipts',
  description:
    'Cryptographic evidence of AI authorization. Every executed action generates a verifiable receipt binding policy hash to outcome.',
  path: '/chronicle-receipts',
});
const schemaJson = JSON.stringify(schema);

export default function ChronicleReceiptsPage() {
  return (
    <>
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
