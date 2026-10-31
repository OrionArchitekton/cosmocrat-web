import MotionWelcome from '@/components/os/MotionWelcome';
import HomeSections from '@/components/os/HomeSections';
import { generatePageMetadata } from '@/lib/metadata';
import { generateHomeWebPage } from '@/lib/schemas';

const HOME_TITLE = 'Cosmocrat OS | Tools for human-directed AI work';
const HOME_DESCRIPTION =
  'Coordinate agents, carry task context between sessions, and recover the results of their work. Explore independent Orion tools, guides, and Starter previews.';

export const metadata = generatePageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
});

const homeWebPageJson = JSON.stringify(
  generateHomeWebPage({ name: HOME_TITLE, description: HOME_DESCRIPTION })
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
      <MotionWelcome />
      <div id="static-site" tabIndex={-1}>
        <HomeSections />
      </div>
    </>
  );
}
