/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        welding: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe08a',
          300: '#ffd34d',
          400: '#ffc107',
          500: '#ffb300', // Primary
          600: '#ffa000',
          700: '#ff8f00',
          800: '#ff6f00',
          900: '#e65100',
        },
        dark: '#1f1f1f',
        light: '#ffffff',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideInLeft: { '0%': { opacity: 0, transform: 'translateX(-50px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: 0, transform: 'translateX(50px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      backgroundImage: {
        'cta-pattern': 'linear-gradient(135deg, #fffbea 25%, #fff3c4 25%, #fff3c4 50%, #fffbea 50%, #fffbea 75%, #fff3c4 75%, #fff3c4 100%)',
      },
    },
  },
  plugins: [],
};
