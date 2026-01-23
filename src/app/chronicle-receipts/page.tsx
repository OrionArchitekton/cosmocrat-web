import ChronicleReceiptsContent from '@/components/v1/pages/ChronicleReceiptsContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Chronicle Receipts | Tamper-Evident Governance Proofs',
  description:
    'Cryptographic evidence of AI authorization. Every executed action generates a verifiable receipt binding policy hash to outcome.',
  path: '/chronicle-receipts',
});

export default function ChronicleReceiptsPage() {
  return <ChronicleReceiptsContent />;
}
