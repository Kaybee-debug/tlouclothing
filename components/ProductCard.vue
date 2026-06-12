<template>
  <div class="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div class="relative aspect-square overflow-hidden group bg-gray-100">
      <img
        :src="imageSrc"
        :alt="product.name"
        loading="lazy"
        class="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        @error="onImageError"
      />
      <div
        v-if="product.stock < 10"
        class="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded"
      >
        Limited stock
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div class="flex gap-3">
          <button type="button" class="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100" @click="viewProduct">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button type="button" class="bg-primary hover:bg-primary/90 text-white p-3 rounded-full" @click.stop="addToCart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 cursor-pointer" @click="viewProduct">
      <span class="text-xs font-medium text-primary uppercase tracking-wide">{{ product.category }}</span>
      <h3 class="font-display text-lg font-semibold text-foreground mb-2 mt-1">{{ product.name }}</h3>
      <p class="text-sm text-muted-foreground mb-4 line-clamp-2">{{ product.description }}</p>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-foreground">R{{ formatPrice(product.price) }}</span>
        <span v-if="product.category === 'Sets'" class="text-xs text-primary font-medium">Bundle deal</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productImages } from '~/data/tlou-products'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const cart = useCart()
const imageSrc = ref(props.product.image_url || productImages.fallback)

watch(
  () => props.product.image_url,
  (url) => {
    imageSrc.value = url || productImages.fallback
  }
)

const onImageError = () => {
  if (imageSrc.value !== productImages.fallback) {
    imageSrc.value = productImages.fallback
  }
}

const formatPrice = (price) => Number(price).toFixed(2)
const viewProduct = () => navigateTo(`/products/${props.product.id}`)
const addToCart = (e) => {
  e.stopPropagation()
  cart.addToCart(props.product, 1)
}
</script>
