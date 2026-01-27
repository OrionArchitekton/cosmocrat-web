/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];

    // 1) Production detection must be unambiguous
    // Preferred (Vercel): VERCEL_ENV === "production" => PROD
    const isProd = process.env.VERCEL_ENV === 'production' || process.env.SITE_STAGE === 'prd';

    // 2) Never "noindex" production by mistake
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
  }
};

module.exports = nextConfig;
