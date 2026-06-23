import { ImageResponse } from 'next/og';

// Dynamic OpenGraph / Twitter card. Rendered on-brand from the locked enterprise
// positioning so the social card never drifts from product truth (it replaced a
// stale consumer-era static og.png). Referenced via siteConfig.ogImage -> '/og'.
export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 };
const DESCRIPTOR = 'Enterprise AI Operating System & Control Plane';
const TAGLINE = 'Governance at runtime, not in retrospect.';

// Load a Google font subset for exactly the glyphs we render (small + fast).
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format/);
  if (!src) throw new Error(`font load failed: ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

export async function GET(): Promise<ImageResponse> {
  const wordmark = 'COSMOCRAT';
  const [orbitron, interSemibold, interRegular] = await Promise.all([
    loadGoogleFont('Orbitron', 700, wordmark),
    loadGoogleFont('Inter', 600, DESCRIPTOR),
    loadGoogleFont('Inter', 400, TAGLINE),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0B0B0F',
          backgroundImage:
            'radial-gradient(circle at 18% 32%, rgba(217,119,6,0.12), transparent 45%)',
          padding: '88px',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Orbitron',
            fontWeight: 700,
            fontSize: '82px',
            letterSpacing: '5px',
            color: '#CC8B4F',
          }}
        >
          {wordmark}
        </div>

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
        { name: 'Orbitron', data: orbitron, weight: 700, style: 'normal' },
        { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
