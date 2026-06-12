<template>
  <section class="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden">
    <!-- Background photo — new file avoids browser cache -->
    <img
      :src="heroBg"
      alt=""
      class="absolute inset-0 w-full h-full object-cover z-0"
      aria-hidden="true"
      fetchpriority="high"
    />
    <!-- Light plum tint so the photo stays visible -->
    <div class="absolute inset-0 z-[1] bg-[#200934]/45" />
    <div class="absolute inset-0 z-[1] bg-gradient-to-r from-[#200934]/70 via-[#200934]/25 to-transparent" />
    <div class="absolute inset-0 z-[1] bg-gradient-to-t from-[#140620]/80 via-transparent to-transparent" />

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
      <div class="max-w-2xl animate-fade-up py-10 sm:py-14 md:py-16 md:ml-12">
        <span class="inline-block px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-primary/90 rounded-full mb-4 sm:mb-6">
          Est. 2021 · Tembisa Streetwear
        </span>

        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
          T.L.O.U.
          <span class="block text-xl sm:text-2xl md:text-3xl font-normal text-white/95 mt-2">
            The Last Of Us Clothing
          </span>
        </h1>

        <p class="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-lg drop-shadow-md">
          Quality hoodies, sweatpants, crop hoodies and coordinated tracksuit sets — affordable street fashion for Tembisa and beyond. Assorted colours, always in stock.
        </p>

        <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <NuxtLink to="/products" class="w-full sm:w-auto">
            <button class="w-full sm:w-auto bg-white text-primary hover:bg-cream px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-medium text-base sm:text-lg inline-flex items-center justify-center gap-2 shadow-lg">
              Shop Catalog
            </button>
          </NuxtLink>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto border-2 border-white/60 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg hover:bg-white/15 font-medium text-base sm:text-lg inline-flex items-center justify-center gap-2 backdrop-blur-sm text-center"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#140620]/90 to-transparent z-[2] pointer-events-none" />
  </section>
</template>

<script setup>
/** v2 filename — bypasses cached old embroidery photo */
const heroBg = '/hero-streetwear.jpg?v=2'
const { enquireUrl: whatsappUrl } = useWhatsApp()
</script>
