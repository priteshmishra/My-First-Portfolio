/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bio: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          secondary: 'var(--color-secondary)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          cyan: 'var(--color-cyan)',
          'cyan-dark': 'var(--color-cyan-dark)',
          violet: 'var(--color-violet)',
          border: 'var(--color-border)',
          lab: 'var(--color-lab-bg)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(32, 41, 56, 0.04), 0 1px 3px rgba(32, 41, 56, 0.02)',
        'card': '0 4px 20px -2px rgba(32, 41, 56, 0.06), 0 2px 6px -1px rgba(32, 41, 56, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(0, 188, 212, 0.12), 0 4px 12px -2px rgba(32, 41, 56, 0.06)',
        'glow-cyan': '0 0 24px -4px rgba(0, 188, 212, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

