/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05060A',
        panel: '#0A0D14',
        panel2: '#0D1119',
        paper: '#F5F5F2',
        volt: '#1557FF',
        voltbright: '#3D78FF',
        line: 'rgba(245, 245, 242, 0.09)',
        linefaint: 'rgba(245, 245, 242, 0.05)',
        mute: '#8B93A5',
        dim: '#5A6373',
        alert: '#E5484D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      transitionTimingFunction: {
        engineered: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
