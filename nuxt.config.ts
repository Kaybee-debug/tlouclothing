// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],

  css: ['~/assets/css/main.css'],

  // Exclude frontend folder from being processed
  ignore: [
    '**/frontend/**',
    '**/backend/**',
  ],

  vite: {
    server: {
      fs: {
        deny: ['frontend', 'backend'],
      },
    },
    optimizeDeps: {
      exclude: ['react', 'react-dom', 'react-router-dom'],
    },
    resolve: {
      alias: {
        // Prevent React from being resolved - this prevents accidental React imports
        'react': false,
        'react-dom': false,
        'react-router-dom': false,
      },
    },
  },

  // Suppress hydration warnings for client-only features
  vue: {
    compilerOptions: {
      isCustomElement: () => false,
    },
  },

  app: {
    head: {
      title: 'Xiselo Safety',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },

  googleFonts: {
    families: {
      'Playfair Display': true,
      'Work Sans': [400, 500, 600, 700],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3003',
    },
  },
})

