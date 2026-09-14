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
        parchment: {
          50: '#FAF7F2',
          100: '#F5EFEB',
          200: '#EDE3D8',
          300: '#E1D3C1',
          400: '#D2BFA6',
          900: '#2A241C',
        },
        guardia: {
          red: '#B81D13',
          darkred: '#8A140D',
          brightred: '#FF2A2A',
          black: '#0D1117',
          dark: '#161B22',
          slate: '#21262D',
          cyan: '#00E5FF',
          blue: '#1E88E5',
          gold: '#FFB703',
          yellow: '#FFD166',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        condensed: ['"Oswald"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'hud-red': '0 0 20px rgba(184, 29, 19, 0.4), inset 0 0 15px rgba(184, 29, 19, 0.2)',
        'hud-cyan': '0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2)',
        'tactical': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 6s linear infinite',
        'radar': 'radar 4s linear infinite',
        'strobe': 'strobe 0.8s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        strobe: {
          '0%': { opacity: '0.3', filter: 'drop-shadow(0 0 5px rgba(255, 50, 50, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(255, 50, 50, 0.9))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
