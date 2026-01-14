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
    <div class="container relative z-10">
      <div class="max-w-2xl animate-fade-up mx-auto md:mx-0 md:ml-6">
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
          Discover our curated collection of premium textiles. From sustainable cottons
          to luxurious silks, find the perfect fabric for your next masterpiece.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/products">
            <Button variant="hero" size="xl">
              Explore Collection
              <ArrowRight class="ml-2 h-5 w-5" />
            </Button>
          </NuxtLink>

          <NuxtLink to="/about">
            <Button
              variant="outline"
              size="xl"
              class="border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
              Our Story
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decorative Fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1f140e] to-transparent" />
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
</script>

