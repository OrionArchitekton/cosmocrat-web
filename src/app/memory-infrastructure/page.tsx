import MemoryInfrastructureContent from '@/components/v1/pages/MemoryInfrastructureContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Memory Infrastructure',
  description:
    'Treat AI memory as a managed resource, not a log. Enforce lane isolation and authority-scoped retrieval to prevent context contamination.',
  path: '/memory-infrastructure',
});

export default function MemoryInfrastructurePage() {
  return <MemoryInfrastructureContent />;
}
