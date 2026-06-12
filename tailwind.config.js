/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#200934',
        'primary-light': '#3d1a5c',
        secondary: '#f4f0f8',
        accent: '#4a2568',
        foreground: 'hsl(222.2 84% 4.9%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        charcoal: '#140620',
        cream: '#faf8fc',
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, #faf8fc 0%, #f0eaf5 100%)',
        'gradient-hero': 'linear-gradient(135deg, #200934 0%, #180728 50%, #140620 100%)',
      },
      boxShadow: {
        elegant: '0 4px 12px rgba(32, 9, 52, 0.12)',
        glow: '0 0 30px rgba(32, 9, 52, 0.25)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
