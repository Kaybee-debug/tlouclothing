<template>
  <header class="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
      <NuxtLink to="/" class="flex items-center gap-3 group min-w-0" @click="closeMenu">
        <img
          v-if="logoUrl"
          :src="logoUrl"
          alt="T.L.O.U. Clothing"
          class="h-9 sm:h-10 w-auto object-contain shrink-0"
        />
        <div v-else class="leading-tight min-w-0">
          <span class="text-lg sm:text-xl font-display font-bold text-primary tracking-wide">T.L.O.U.</span>
          <span class="block text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest truncate">The Last Of Us</span>
        </div>
      </NuxtLink>

      <!-- Desktop navigation -->
      <div class="hidden md:flex items-center gap-6 text-base">
        <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
        <NuxtLink to="/products" class="hover:text-primary transition-colors">Shop</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-primary transition-colors">Blog</NuxtLink>
        <NuxtLink to="/about" class="hover:text-primary transition-colors">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-primary transition-colors">Contact</NuxtLink>
        <a
          :href="whatsappEnquireUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-[#128C7E] hover:text-[#25D366] font-medium"
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

      <!-- Mobile: cart + hamburger -->
      <div class="flex md:hidden items-center gap-2 shrink-0">
        <NuxtLink to="/cart" class="hover:text-primary relative p-2 -mr-1" aria-label="Cart" @click="closeMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute top-0 right-0"
          >{{ cart.totalItems }}</span>
        </NuxtLink>

        <button
          type="button"
          class="p-2 rounded-lg text-foreground hover:bg-gray-100 transition-colors"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        id="mobile-nav"
        class="md:hidden border-t bg-white shadow-lg"
      >
        <div class="container mx-auto px-4 py-4 max-w-7xl flex flex-col gap-1">
          <NuxtLink
            v-for="link in mobileLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-nav-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            :href="whatsappEnquireUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-nav-link text-[#128C7E] font-medium"
            @click="closeMenu"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const cart = useCart()
const route = useRoute()
const { enquireUrl: whatsappEnquireUrl } = useWhatsApp()
const logoUrl = ref('')
const menuOpen = ref(false)

const mobileLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

watch(() => route.path, closeMenu)

watch(menuOpen, (open) => {
  if (!process.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (process.client) {
    const img = new Image()
    img.onload = () => { logoUrl.value = '/logo.png' }
    img.src = '/logo.png'
  }
})
</script>

<style scoped>
.mobile-nav-link {
  @apply block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors;
}
</style>
