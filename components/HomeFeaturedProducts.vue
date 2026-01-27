<template>
  <section class="py-20 bg-gradient-soft">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
          Featured Collection
        </h2>
        <p class="text-muted-foreground mt-2">Hand-picked selections of our finest fabrics, perfect for your next creative project.</p>
      </div>

      <div v-if="pending" class="text-center">Loading...</div>
      <div v-else-if="featuredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in featuredProducts"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
      <div v-else class="text-center text-muted-foreground">
        No products available
      </div>

      <div class="mt-12 text-center">
        <NuxtLink to="/products">
          <button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2">
            View All Products
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const featuredProducts = ref([])
const pending = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`${apiBase}/api/products`)
    if (response.ok) {
      const data = await response.json()
      // Show first 4 products as featured
      featuredProducts.value = (data || []).slice(0, 4)
    }
  } catch (error) {
    console.error('Error fetching featured products:', error)
  } finally {
    pending.value = false
  }
})
</script>

