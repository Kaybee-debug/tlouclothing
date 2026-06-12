<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        <h1 class="font-display text-4xl font-bold text-foreground mb-2">Shop Catalog</h1>
        <p class="text-muted-foreground">
          Browse prices before you visit our stall at 933 Winnie Mandela, Zone 10, Tembisa — or order via WhatsApp.
        </p>
      </div>
    </div>

    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-6 max-w-7xl">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search clothing..."
            class="flex-1 max-w-md w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="flex items-center gap-4 w-full md:w-auto">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <span class="text-sm text-muted-foreground whitespace-nowrap">
              {{ filteredProducts.length }} items
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
      <p v-else class="text-center text-muted-foreground py-12">No products match your search.</p>

      <div class="mt-12 text-center">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#20bd5a]"
        >
          Order on WhatsApp — {{ config.public.businessPhone }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
import { sortTlouCategories } from '~/data/tlou-products'

const { products, categories } = useTlouProducts()

function normalizeCategory(cat) {
  const value = cat ? String(cat) : ''
  return value === 'All' ? '' : value
}

const searchQuery = ref('')
const selectedCategory = ref(normalizeCategory(route.query.category))

watch(
  () => route.query.category,
  (cat) => {
    selectedCategory.value = normalizeCategory(cat)
  }
)

const { orderUrl: whatsappUrl } = useWhatsApp()

const filteredProducts = computed(() => {
  let list = products.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    )
  }
  if (selectedCategory.value) {
    list = list.filter((p) => p.category === selectedCategory.value)
  }
  const categoryOrder = sortTlouCategories(list.map((p) => p.category || ''))
  return [...list].sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category || '')
    const catB = categoryOrder.indexOf(b.category || '')
    if (catA !== catB) return catA - catB
    return a.name.localeCompare(b.name)
  })
})
</script>
