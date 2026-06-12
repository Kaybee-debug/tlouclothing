<template>
  <header class="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img
          v-if="logoUrl"
          :src="logoUrl"
          alt="T.L.O.U. Clothing"
          class="h-10 w-auto object-contain"
        />
        <div v-else class="leading-tight">
          <span class="text-xl font-display font-bold text-primary tracking-wide">T.L.O.U.</span>
          <span class="block text-[10px] text-muted-foreground uppercase tracking-widest">The Last Of Us</span>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-5 md:gap-6 text-sm md:text-base">
        <NuxtLink to="/" class="hover:text-primary hidden sm:inline">Home</NuxtLink>
        <NuxtLink to="/products" class="hover:text-primary">Shop</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-primary hidden sm:inline">Blog</NuxtLink>
        <NuxtLink to="/about" class="hover:text-primary hidden sm:inline">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-primary hidden md:inline">Contact</NuxtLink>
        <a
          :href="whatsappEnquireUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-1 text-[#128C7E] hover:text-[#25D366] font-medium"
        >
          WhatsApp
        </a>
        <NuxtLink to="/cart" class="hover:text-primary relative" aria-label="Cart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2"
          >{{ cart.totalItems }}</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const cart = useCart()
const { enquireUrl: whatsappEnquireUrl } = useWhatsApp()
const logoUrl = ref('')

onMounted(() => {
  if (process.client) {
    const img = new Image()
    img.onload = () => { logoUrl.value = '/logo.png' }
    img.src = '/logo.png'
  }
})
</script>
