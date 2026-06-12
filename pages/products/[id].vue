<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-4 max-w-7xl">
        <button type="button" class="flex items-center gap-2 text-primary hover:text-primary/80" @click="$router.back()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>
      </div>
    </div>

    <div v-if="product" class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-4">
          <div class="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-sm border">
            <img
              :src="imageSrc"
              :alt="product.name"
              class="w-full h-full object-contain p-4"
              @error="onImageError"
            />
          </div>
          <div v-if="galleryImages.length > 1" class="grid grid-cols-4 sm:grid-cols-5 gap-2">
            <button
              v-for="img in galleryImages"
              :key="img"
              type="button"
              class="aspect-square rounded-lg overflow-hidden border-2 bg-gray-50 transition-colors"
              :class="imageSrc === img ? 'border-primary' : 'border-transparent hover:border-primary/40'"
              @click="imageSrc = img"
            >
              <img :src="img" :alt="product.name" class="w-full h-full object-contain p-1" />
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <span class="text-sm font-medium text-primary uppercase tracking-wide">{{ product.category }}</span>
            <h1 class="font-display text-4xl font-bold text-foreground mt-2">{{ product.name }}</h1>
            <p class="text-3xl font-bold text-foreground mt-4">R{{ Number(product.price).toFixed(2) }}</p>
            <p class="text-sm text-muted-foreground mt-1">Assorted colours available</p>
          </div>

          <p class="text-lg text-muted-foreground leading-relaxed">{{ product.description }}</p>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-800 font-medium">In stock at our Tembisa stall</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Quantity:</label>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                max="99"
                class="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="button"
              class="w-full bg-primary hover:bg-primary/90 text-white py-4 px-8 rounded-lg font-semibold text-lg"
              @click="addToCart"
            >
              Add to Cart — R{{ (product.price * quantity).toFixed(2) }}
            </button>

            <a
              :href="whatsappOrderUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex justify-center items-center gap-2 border-2 border-[#25D366] text-[#128C7E] py-3 rounded-lg font-medium hover:bg-green-50"
            >
              Order this item on WhatsApp
            </a>
          </div>

          <ul class="border-t pt-6 space-y-2 text-muted-foreground text-sm">
            <li>✓ Walk-in at 933 Winnie Mandela, Zone 10</li>
            <li>✓ Bundle sets save vs buying pieces separately</li>
            <li>✓ Follow {{ config.public.instagram }} for new colours</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-16 text-center">
      <p class="text-muted-foreground mb-4">Product not found</p>
      <NuxtLink to="/products" class="text-primary hover:underline">Back to catalog</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { productImages } from '~/data/tlou-products'
import { getProductGallery } from '~/data/tlou-gallery'

const route = useRoute()
const config = useRuntimeConfig()
const { getProductById } = useTlouProducts()
const cart = useCart()

const quantity = ref(1)
const product = computed(() => getProductById(String(route.params.id)))
const imageSrc = ref(productImages.fallback)

const galleryImages = computed(() => {
  if (!product.value) return []
  return getProductGallery(String(product.value.id), product.value.image_url)
})

watch(
  product,
  (p) => {
    const gallery = p ? getProductGallery(String(p.id), p.image_url) : []
    imageSrc.value = gallery[0] || p?.image_url || productImages.fallback
  },
  { immediate: true }
)

const onImageError = () => {
  imageSrc.value = productImages.fallback
}

const { buildUrl, enquireUrl } = useWhatsApp()

const whatsappOrderUrl = computed(() => {
  if (!product.value) return enquireUrl.value
  return buildUrl(
    `Hi T.L.O.U., I'd like to order: ${product.value.name} (qty ${quantity.value}) — R${(product.value.price * quantity.value).toFixed(2)}`
  )
})

const addToCart = () => {
  if (product.value) cart.addToCart(product.value, quantity.value)
}
</script>
