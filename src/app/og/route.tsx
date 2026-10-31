import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// Static card using the same first-party wordmark and Inter font as the site.
// Update siteConfig.ogImage's version whenever the visible card changes.
export const dynamic = 'force-static';

const SIZE = { width: 1200, height: 630 };
const DESCRIPTOR = 'Tools for human-directed AI work.';
const TAGLINE = 'Coordinate agents. Carry context forward. Keep authority with you.';
const WORDMARK = { width: 686, height: 84 };

export async function GET(): Promise<ImageResponse> {
  const [interSemibold, interRegular, wordmark] = await Promise.all([
    readFile(join(process.cwd(), 'src/styles/fonts/og-inter-600.ttf')),
    readFile(join(process.cwd(), 'src/styles/fonts/og-inter-400.ttf')),
    readFile(join(process.cwd(), 'public/brand/cosmocrat-wordmark.png')),
  ]);
  const wordmarkSource = `data:image/png;base64,${wordmark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0B1120',
          backgroundImage:
            'radial-gradient(circle at 18% 32%, rgba(217,119,6,0.12), transparent 45%)',
          padding: '88px',
          fontFamily: 'Inter',
        }}
      >
        {/* Satori (next/og) renders a real <img>, not next/image — the lint rule does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmarkSource}
          width={WORDMARK.width}
          height={WORDMARK.height}
          alt="Cosmocrat"
          style={{ display: 'flex' }}
        />

        <div
          style={{
            width: '168px',
            height: '5px',
            backgroundColor: '#D97706',
            marginTop: '52px',
            marginBottom: '40px',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '54px',
            lineHeight: 1.12,
            color: '#F1F5F9',
            maxWidth: '900px',
          }}
        >
          {DESCRIPTOR}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '30px',
            color: '#94A3B8',
            marginTop: '26px',
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
