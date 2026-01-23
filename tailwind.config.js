/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // V1 palette (primary)
        cosmo: {
          dark: '#0B1120',
          card: '#151F32',
          accent: '#D97706',
          text: '#E2E8F0',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#94A3B8',
            '--tw-prose-headings': '#E2E8F0',
            '--tw-prose-links': '#D97706',
            '--tw-prose-bold': '#E2E8F0',
            '--tw-prose-quotes': '#94A3B8',
            '--tw-prose-code': '#E2E8F0',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
