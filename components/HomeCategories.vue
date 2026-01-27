<template>
  <section class="py-20">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
          Shop by Material
        </h2>
        <p class="text-muted-foreground mt-2">Explore our diverse range of premium textiles</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.name"
          :to="`/products?category=${category.name}`"
          class="group relative aspect-[4/5] rounded-lg overflow-hidden animate-fade-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 class="font-display text-xl md:text-2xl font-semibold text-cream">
              {{ category.name }}
            </h3>
            <p class="text-sm text-cream/70 mt-1">{{ category.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    name: 'Cotton',
    description: 'Breathable & versatile',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop',
  },
  {
    name: 'Linen',
    description: 'Natural elegance',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&h=500&fit=crop',
  },
  {
    name: 'Silk',
    description: 'Luxurious drape',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=500&fit=crop',
  },
  {
    name: 'Wool',
    description: 'Warmth & texture',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop'
  },
]
</script>

