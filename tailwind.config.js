/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030712',
          900: '#07111F',
          850: '#0B1528',
          800: '#0F1E36',
          750: '#142747',
          700: '#1C345E',
          600: '#2A4B82',
        },
        electric: {
          blue: '#1677FF',
          blueHover: '#2B85FF',
          cyan: '#00F0FF',
          purple: '#7C3AED',
          purpleHover: '#8B5CF6',
          indigo: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(22, 119, 255, 0.45)',
        'glow-blue-lg': '0 0 45px -5px rgba(22, 119, 255, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.45)',
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 10px 30px -5px rgba(22, 119, 255, 0.2), 0 0 0 1px rgba(22, 119, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(circle at 50% 20%, rgba(22, 119, 255, 0.15), rgba(124, 58, 237, 0.1) 40%, rgba(3, 7, 18, 0) 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(15, 30, 54, 0.75) 0%, rgba(7, 17, 31, 0.85) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #1677FF 0%, #7C3AED 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
