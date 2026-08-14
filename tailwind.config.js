/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08080c',
          secondary: '#0d0d14',
          tertiary: '#13131e',
        },
        surface: {
          DEFAULT: '#0f0f17',
          hover: '#161622',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(139, 92, 246, 0.35)',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Violet
          light: '#a78bfa',
          dark: '#6d28d9',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        cyan: {
          accent: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.25)',
        },
        muted: {
          DEFAULT: '#94a3b8',
          dark: '#64748b',
          light: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-spin': 'glow-spin 10s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-subtle': '0 0 40px -10px rgba(139, 92, 246, 0.15)',
        'card-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
