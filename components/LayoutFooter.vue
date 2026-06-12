<template>
  <footer class="bg-charcoal text-white py-16">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <h3 class="font-display text-2xl font-bold mb-2">T.L.O.U. Clothing</h3>
          <p class="text-gray-300 mb-6 max-w-md">
            Street-based clothing brand in Tembisa since 2021. Quality hoodies, tracksuits and casual wear at prices that work for our community.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              :href="whatsappEnquireUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-lg font-medium text-sm"
            >
              Enquire on WhatsApp — {{ config.public.businessPhone }}
            </a>
            <a
              :href="`tel:${config.public.businessPhoneTel}`"
              class="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-medium text-sm"
            >
              Call {{ config.public.businessPhone }}
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-gray-300">
            <li><NuxtLink to="/products" class="hover:text-white">Shop</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-white">Blog</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
            <li><NuxtLink to="/cart" class="hover:text-white">Cart</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Visit &amp; Contact</h4>
          <div class="space-y-2 text-gray-300 text-sm">
            <p>{{ config.public.businessAddress }}</p>
            <p>
              <a :href="`tel:${config.public.businessPhoneTel}`" class="hover:text-white">{{ config.public.businessPhone }}</a>
              <span class="text-white/50"> · </span>
              <a :href="whatsappEnquireUrl" target="_blank" rel="noopener noreferrer" class="hover:text-[#25D366]">WhatsApp</a>
            </p>
            <p>
              <a :href="`mailto:${config.public.businessEmail}`" class="hover:text-white lowercase">{{ config.public.businessEmail }}</a>
            </p>
            <p class="pt-2 text-white/60">Instagram {{ config.public.instagram }}</p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
        <p>&copy; {{ year }} T.L.O.U. Clothing. Developed by Kaybee Debug Solutions.</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="hover:text-white">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig()
const { enquireUrl: whatsappEnquireUrl } = useWhatsApp()
const year = new Date().getFullYear()
</script>
