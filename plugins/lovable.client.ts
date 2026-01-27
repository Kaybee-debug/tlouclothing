// Lovable.dev integration plugin for Nuxt
// This plugin ensures compatibility with Lovable.dev's component tagging system
export default defineNuxtPlugin(() => {
  if (process.dev && process.client) {
    // Add data attributes for Lovable.dev component tagging
    // Vue components will be automatically tagged by the Vite plugin
    if (typeof window !== 'undefined') {
      // Initialize Lovable.dev integration if needed
      console.log('Lovable.dev integration active')
    }
  }
})

