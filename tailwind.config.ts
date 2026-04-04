import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#111008',
        'bg-2': '#1a1811',
        'bg-3': '#222018',
        'bg-4': '#2b2920',
        't1': '#f0ede4',
        't2': '#9a9585',
        't3': '#635f50',
        accent: '#e8a84b',
        'accent-dim': 'rgba(232,168,75,0.12)',
        'accent-glow': 'rgba(232,168,75,0.20)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['IBM Plex Serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
