// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  
  // Vite configuration for Lovable.dev compatibility
  vite: {
    plugins: [],
    server: {
      host: '0.0.0.0', // Allow external connections for Lovable.dev
      port: 3000,
    },
  },
  
  // Dev server configuration for Lovable.dev
  devServer: {
    host: '0.0.0.0', // Allow external connections
    port: 3000,
  },
  
  app: {
    head: {
      title: 'Artisan Fabrics | Premium Textile Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover premium quality fabrics for designers and crafters. From sustainable cottons to luxurious silks, find the perfect textile for your next masterpiece.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap' },
      ],
    },
  },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3003',
    },
  },
  
  ssr: true,
})

