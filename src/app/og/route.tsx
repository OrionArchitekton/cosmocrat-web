import { ImageResponse } from 'next/og';

// On-brand OpenGraph / Twitter card rendered from the locked enterprise positioning
// so the social card never drifts from product truth (it replaced a stale consumer-era
// static og.png). Referenced via siteConfig.ogImage -> '/og?v=N' (bump N on content change).
//
// The card has no per-request input, so it is generated ONCE at build time
// (force-static) — the brand wordmark + Inter font fetches below run at build, not per request.
export const dynamic = 'force-static';

const SIZE = { width: 1200, height: 630 };
const DESCRIPTOR = 'Enterprise AI Operating System & Control Plane';
const TAGLINE = 'Governance at runtime, not in retrospect.';

// The real brand wordmark asset (the same file the site header renders) — drawn as an
// image so the card matches the locked logotype EXACTLY, instead of approximating it
// with a lookalike font (the prior Orbitron text read as off-brand).
const WORDMARK_SRC =
  'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/wordmark-logo_light.png';
const WORDMARK = { width: 686, height: 84 }; // native 604x74, scaled ~1.14x preserving aspect

// Load a Google font subset for exactly the glyphs we render (small + fast).
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  // Tolerate optional quotes around the URL and any following format()/src entries.
  const src = css.match(/src:\s*url\(\s*['"]?([^'")]+?)['"]?\s*\)/);
  if (!src) throw new Error(`font load failed: ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

export async function GET(): Promise<ImageResponse> {
  const [interSemibold, interRegular] = await Promise.all([
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
        {/* Satori (next/og) renders a real <img>, not next/image — the lint rule does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WORDMARK_SRC}
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
