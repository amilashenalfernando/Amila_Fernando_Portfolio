export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        glass: {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(15, 15, 31, 0.8)',
        },
        primary: {
          DEFAULT: '#f97316', // Orange 500
          hover: '#ea580c',   // Orange 600
        },
        accent: {
          DEFAULT: '#eab308', // Yellow 500
          hover: '#ca8a04',   // Yellow 600
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 90deg at 50% 50%, #fef3c7 0%, #f97316 50%, #fef3c7 100%)',
      }
    },
  },
  plugins: [],
}
