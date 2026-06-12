<template>
  <section class="relative min-h-[85vh] flex items-center overflow-hidden">
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
      <div class="max-w-2xl animate-fade-up ml-6 md:ml-12 py-16">
        <span class="inline-block px-4 py-1.5 text-sm font-medium text-white bg-primary/90 rounded-full mb-6">
          Est. 2021 · Tembisa Streetwear
        </span>

        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
          T.L.O.U.
          <span class="block text-2xl md:text-3xl font-normal text-white/95 mt-2">
            The Last Of Us Clothing
          </span>
        </h1>

        <p class="mt-6 text-lg text-white/90 max-w-lg drop-shadow-md">
          Quality hoodies, sweatpants, crop hoodies and coordinated tracksuit sets — affordable street fashion for Tembisa and beyond. Assorted colours, always in stock.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/products">
            <button class="bg-white text-primary hover:bg-cream px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center gap-2 shadow-lg">
              Shop Catalog
            </button>
          </NuxtLink>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="border-2 border-white/60 text-white px-8 py-4 rounded-lg hover:bg-white/15 font-medium text-lg inline-flex items-center gap-2 backdrop-blur-sm"
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
