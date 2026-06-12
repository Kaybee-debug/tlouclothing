<template>
  <section class="py-20">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
        <p class="text-muted-foreground mt-2">Caps, hats, sweaters, T-shirts, hoodies, trackpants &amp; more</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.name"
          :to="categoryLink(category.name)"
          class="group relative aspect-[4/5] rounded-lg overflow-hidden animate-fade-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-contain bg-gray-900/30 p-4 transform group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 class="font-display text-xl md:text-2xl font-semibold text-cream">{{ category.name }}</h3>
            <p class="text-sm text-cream/70 mt-1">{{ category.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tlouCategories } from '~/data/tlou-products'

const categories = tlouCategories

const categoryLink = (name) =>
  name === 'All' ? '/products' : `/products?category=${encodeURIComponent(name)}`
</script>
