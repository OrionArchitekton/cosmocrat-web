import Hero from '@/components/v1/Hero';
import Narrative from '@/components/v1/Narrative';
import SeoSpine from '@/components/v1/SeoSpine';
import { generatePageMetadata } from '@/lib/metadata';
import { generateHomeWebPage } from '@/lib/schemas';

const HOME_TITLE = 'Enterprise AI Operating System & Control Plane for Governed AI';
const HOME_DESCRIPTION =
  'Cosmocrat is the enterprise AI operating system that governs what AI is allowed to do, when it must stop, and who authorized it — turning AI execution into an auditable, accountable, and fail-closed asset.';

export const metadata = generatePageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
});

const homeWebPageJson = JSON.stringify(
  generateHomeWebPage({ name: HOME_TITLE, description: HOME_DESCRIPTION }),
).replace(/</g, '\\u003c');

export default function HomePage() {
  return (
    <>
      <script
        id="ldjson-home-webpage"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: homeWebPageJson }}
      />
      <Hero />
      <Narrative />
      <SeoSpine />
    </>
  );
}
