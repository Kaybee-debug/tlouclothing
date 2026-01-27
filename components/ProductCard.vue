<template>
  <div class="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div class="relative aspect-square overflow-hidden group">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <!-- Low Stock Badge -->
      <div v-if="product.lowStock" class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        Low Stock
      </div>
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div class="flex gap-3">
          <!-- Eye Icon -->
          <button @click="viewProduct" class="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
          
          <!-- Cart Icon -->
          <button @click.stop="addToCart" class="bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="p-6" @click="viewProduct">
      <div class="mb-2">
        <span class="text-xs font-medium text-primary uppercase tracking-wide">{{ product.category }}</span>
      </div>
      
      <h3 class="font-display text-lg font-semibold text-foreground mb-2">
        {{ product.name }}
      </h3>
      
      <p class="text-sm text-muted-foreground mb-4">
        {{ product.description }}
      </p>
      
      <div class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-foreground">R{{ product.price }}</span>
          <span class="text-sm text-muted-foreground ml-1">per yard</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product', 'index'])

const viewProduct = () => {
  navigateTo(`/products/${props.product.id}`)
}

const cart = useCart()

const addToCart = (e) => {
  e.stopPropagation() // Prevent triggering viewProduct
  cart.addToCart(props.product, 1)
  console.log('Added to cart:', props.product.name)
  console.log('Cart items:', cart.cartItems.value)
  console.log('Total items:', cart.totalItems.value)
}
</script>