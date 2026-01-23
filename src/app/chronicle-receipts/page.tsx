import type { Metadata } from 'next';
import ChronicleReceiptsContent from '@/components/v1/pages/ChronicleReceiptsContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Chronicle Receipts | Tamper-Evident Governance Proofs',
  description:
    'Cryptographic evidence of AI authorization. Every executed action generates a verifiable receipt binding policy hash to outcome.',
  alternates: { canonical: `${baseUrl}/chronicle-receipts` },
  openGraph: {
    title: 'Chronicle Receipts | Cosmocrat',
    description:
      'Cryptographic evidence of AI authorization. Every executed action generates a verifiable receipt binding policy hash to outcome.',
    url: `${baseUrl}/chronicle-receipts`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ChronicleReceiptsPage() {
  return <ChronicleReceiptsContent />;
}
