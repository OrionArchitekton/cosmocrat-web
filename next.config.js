const ALLOWED_SITE_ENVS = ['development', 'staging', 'production'];
const siteEnv = process.env.SITE_ENV;

if (!siteEnv || !ALLOWED_SITE_ENVS.includes(siteEnv)) {
  throw new Error(
    `Invalid SITE_ENV "${siteEnv ?? ''}". Expected one of: ${ALLOWED_SITE_ENVS.join(', ')}.`
  );
}

const isProd = siteEnv === 'production';
const canonicalOrigin = process.env.NEXT_PUBLIC_SITE_URL;

if (isProd) {
  if (!canonicalOrigin) {
    throw new Error('NEXT_PUBLIC_SITE_URL is required when SITE_ENV=production.');
  }

  let parsedOrigin;
  try {
    parsedOrigin = new URL(canonicalOrigin);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a valid absolute URL in production. Received "${canonicalOrigin}".`
    );
  }

  const isInvalidCanonicalOrigin =
    parsedOrigin.protocol !== 'https:' ||
    parsedOrigin.hostname !== 'www.cosmocrat.ai' ||
    parsedOrigin.pathname !== '/' ||
    parsedOrigin.search ||
    parsedOrigin.hash ||
    parsedOrigin.port;

  if (isInvalidCanonicalOrigin) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be exactly "https://www.cosmocrat.ai" when SITE_ENV=production. Received "${canonicalOrigin}".`
    );
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/cosmocrat/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'cosmocrat.ai' }],
        destination: 'https://www.cosmocrat.ai/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];

    if (!isProd) {
      headers.push({
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      });
    }

    return headers;
  },
};

module.exports = nextConfig;
