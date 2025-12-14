/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(20, 69%, 47%)',
        secondary: 'hsl(35, 30%, 92%)',
        accent: 'hsl(145, 25%, 45%)',
      },
      boxShadow: {
        elegant: '0 4px 12px hsl(20 15% 15% / 0.08)',
        glow: '0 0 30px hsl(20 69% 47% / 0.15)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
