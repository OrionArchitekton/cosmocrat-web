/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
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
        // Legacy tokens (backward compat)
        brand: {
          copper: '#B87654',
          navy: '#0D1B2A',
        },
        copper: {
          DEFAULT: '#B87654',
          light: '#E6B089',
        },
        navy: {
          900: '#0D1B2A',
          800: '#14273A',
        },
        cosmos: {
          DEFAULT: '#0c8ee9',
          500: '#0c8ee9',
          600: '#0070c7',
        },
        obsidian: '#0D1B2A',
        // Semantic tokens (v1)
        bg: '#0B1120',
        surface: '#151F32',
        border: '#1E293B',
        text: '#E2E8F0',
        muted: '#94A3B8',
        accent: '#D97706',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'monospace'],
        heading: ['var(--font-heading)', 'Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
