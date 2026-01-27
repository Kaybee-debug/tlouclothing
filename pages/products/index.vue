<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        <h1 class="font-display text-4xl font-bold text-foreground mb-2">Our Collection</h1>
        <p class="text-muted-foreground">Explore our complete range of premium fabrics, from everyday essentials to luxury textiles.</p>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-6 max-w-7xl">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search fabrics..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div class="flex items-center gap-4">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <span class="text-sm text-muted-foreground">
              Showing {{ filteredProducts.length }} products
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const searchQuery = ref('')
const selectedCategory = ref('')
const products = ref([])
const pending = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`${apiBase}/api/products`)
    if (response.ok) {
      const data = await response.json()
      products.value = data || []
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
})

const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category).filter(Boolean))]
  return cats.sort()
})

const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  return filtered
})
</script>