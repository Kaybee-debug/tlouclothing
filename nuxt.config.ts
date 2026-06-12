// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  vite: {
    plugins: [],
    server: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },

  nitro: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: '0.0.0.0',
  },

  app: {
    head: {
      title: 'T.L.O.U. Clothing | The Last Of Us — Streetwear, Tembisa',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'T.L.O.U. Clothing (The Last Of Us) — affordable streetwear from Tembisa. Hoodies, sweatpants, crop hoodies, sweaters and bundled tracksuit sets. Order via WhatsApp or visit our stall at 933 Winnie Mandela, Zone 10.',
        },
      ],
      link: [
        { rel: 'preload', as: 'image', href: '/hero-streetwear.jpg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3003',
      whatsapp: '27799434968',
      businessEmail: 'tlou.masoga1@gmail.com',
      bankName: 'Capitec',
      bankAccountName: 'MR TE MASOGA',
      bankAccountNumber: '1382372793',
      bankAccountType: 'Savings',
      businessPhone: '+27 79 943 4968',
      businessPhoneTel: '+27799434968',
      businessAddress: '933 Winnie Mandela, Zone 10, Tembisa, Gauteng 1632',
      instagram: '@TLOU_CLOTHING',
      facebook: 'TLOU CLOTHING BRAND',
      tiktok: '@T.L.O.U_CLOTHING_BRAND',
      /** YouTube embed — override with NUXT_PUBLIC_VIDEO_EMBED_URL (must allow embedding) */
      videoEmbedUrl:
        process.env.NUXT_PUBLIC_VIDEO_EMBED_URL ||
        'https://www.youtube.com/embed/aqz-KE-bpKQ?rel=0&modestbranding=1',
    },
  },

  ssr: true,
})
