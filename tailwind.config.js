/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // navy.900 = bg, navy.800 = surface (no extra surface tokens)
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
        // Keep obsidian as alias for backwards compat with existing classes
        obsidian: '#0D1B2A',
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
