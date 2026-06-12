<template>
  <section id="media" class="py-20 bg-white border-t scroll-mt-20">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">Lookbook</h2>
        <p class="text-muted-foreground mt-2 max-w-2xl mx-auto">
          A snapshot of what we sell at the stall — hoodies, tracksuits and sets in Tembisa.
        </p>
      </div>

      <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <div
            v-for="photo in photos"
            :key="photo.src"
            class="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-100"
          >
            <img :src="photo.src" :alt="photo.alt" class="w-full h-full object-contain p-1" loading="lazy" />
          </div>
        </div>

        <p class="text-center mt-10">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Stall clips &amp; updates on our blog →
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tlouGallery } from '~/data/tlou-gallery'

const photos = tlouGallery
</script>
