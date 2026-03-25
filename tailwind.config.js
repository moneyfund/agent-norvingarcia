/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0A0A',
          white: '#F8F8F8',
          gold: '#C8A56A',
          muted: '#1B1B1B'
        }
      },
      boxShadow: {
        glow: '0 10px 40px rgba(200, 165, 106, 0.25)'
      }
    }
  },
  plugins: []
};
