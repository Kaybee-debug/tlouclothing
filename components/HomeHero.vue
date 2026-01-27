<template>
  <section class="relative min-h-[85vh] flex items-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src="/hero-background.jpg"
        alt="Fabric manufacturing"
        class="w-full h-full object-cover"
      />
      <!-- Dark Brown Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#2b1b12]/80 via-[#3a2418]/70 to-[#1f140e]/80" />
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
      <div class="max-w-2xl animate-fade-up ml-6 md:ml-12">
        <span class="inline-block px-4 py-1.5 text-sm font-medium text-white bg-orange-500/90 rounded-full mb-6">
          Premium Quality Since 1985
        </span>

        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Exquisite Fabrics for 
          <span class="text-orange-300 font-semibold">
            Extraordinary
          </span> 
          Creations
        </h1>

        <p class="mt-6 text-lg text-white/80 max-w-lg">
          Discover our curated collection of premium textiles. From sustainable cottons to luxurious silks, find the perfect fabric for your next masterpiece.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/products">
            <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center gap-2">
              Explore Collection
            </button>
          </NuxtLink>
          <NuxtLink to="/about">
            <button class="border-2 border-white/40 text-white px-8 py-4 rounded-lg hover:bg-white/10 font-medium text-lg">
              Our Story
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decorative Fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1f140e] to-transparent" />
  </section>
</template>

