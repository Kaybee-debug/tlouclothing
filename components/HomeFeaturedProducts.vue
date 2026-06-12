<template>
  <section class="py-20 bg-gradient-soft">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
        <p class="text-muted-foreground mt-2">Our most popular streetwear — prices before you visit the stall</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in featuredProducts"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>

      <div class="mt-12 text-center">
        <NuxtLink to="/products">
          <button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2">
            View Full Catalog
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { getFeatured } = useTlouProducts()
const featuredProducts = getFeatured(4)
</script>
