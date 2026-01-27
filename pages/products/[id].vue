<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Back Button -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-4 max-w-7xl">
        <button @click="$router.back()" class="flex items-center gap-2 text-primary hover:text-primary/80">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Shop
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div v-if="product" class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="aspect-square rounded-lg overflow-hidden">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <span class="text-sm font-medium text-primary uppercase tracking-wide">{{ product.category }}</span>
            <h1 class="font-display text-4xl font-bold text-foreground mt-2">{{ product.name }}</h1>
            <div class="flex items-baseline gap-2 mt-4">
              <span class="text-3xl font-bold text-foreground">R{{ product.price }}</span>
              <span class="text-lg text-muted-foreground">per yard</span>
            </div>
          </div>

          <p class="text-lg text-muted-foreground leading-relaxed">
            {{ product.description }}
          </p>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-800 font-medium">In Stock ({{ product.stock }} yards available)</p>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-foreground mb-2">Quantity (yards):</label>
              <input
                v-model="quantity"
                type="number"
                min="1"
                :max="product.stock"
                class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              @click="addToCart"
              class="w-full bg-primary hover:bg-primary/90 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
            >
              Add to Cart — R{{ (product.price * quantity).toFixed(2) }}
            </button>
          </div>

          <!-- Features -->
          <div class="border-t pt-6">
            <h3 class="font-semibold text-foreground mb-4">Features</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Premium quality materials
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Sustainably sourced
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Easy care instructions
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Free samples available
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-8 text-center">
      <p class="text-muted-foreground">Product not found</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const quantity = ref(1)
const product = ref(null)
const pending = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`${apiBase}/api/products/${route.params.id}`)
    if (response.ok) {
      const data = await response.json()
      product.value = data
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    pending.value = false
  }
})

const cart = useCart()

const addToCart = () => {
  if (product.value) {
    cart.addToCart(product.value, quantity.value)
    console.log('Added to cart:', product.value.name, 'Quantity:', quantity.value)
  }
}
</script>