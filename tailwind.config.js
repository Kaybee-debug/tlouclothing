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
        primary: 'hsl(20, 69%, 47%)',
        secondary: 'hsl(35, 30%, 92%)',
        accent: 'hsl(145, 25%, 45%)',
        foreground: 'hsl(222.2 84% 4.9%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        charcoal: 'hsl(210, 11%, 15%)',
        cream: 'hsl(47, 100%, 97%)',
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, hsl(35, 30%, 96%) 0%, hsl(35, 20%, 94%) 100%)',
      },
      boxShadow: {
        elegant: '0 4px 12px hsl(20 15% 15% / 0.08)',
        glow: '0 0 30px hsl(20 69% 47% / 0.15)',
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
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}


