<template>
  <div class="p-8">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="font-display text-3xl font-bold text-foreground mb-2">T.L.O.U. Products</h1>
          <p class="text-muted-foreground">Manage hoodies, sweaters, trackpants, caps &amp; hats</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          :disabled="syncing"
          class="border border-primary text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          @click="syncCatalog"
        >
          {{ syncing ? 'Syncing…' : 'Sync T.L.O.U. catalog' }}
        </button>
        <button
          @click="showAddModal = true"
          class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Product
        </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-muted-foreground">Loading products...</p>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-green-800 font-medium">{{ successMessage }}</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Products Table -->
      <div v-else class="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3 min-w-0">
                  <img
                    :src="product.image_url || productFallback"
                    :alt="product.name"
                    class="w-16 h-16 object-contain bg-gray-50 rounded-lg flex-shrink-0 border"
                  />
                  <div class="min-w-0 flex-1">
                    <div class="text-sm font-semibold text-gray-900 mb-1">{{ product.name }}</div>
                    <div class="text-xs text-gray-500 line-clamp-2">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">{{ product.category }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-gray-900">R{{ parseFloat(product.price).toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <span class="text-sm text-gray-900">{{ product.stock }} in stock</span>
                  <span v-if="product.stock < 50" class="text-xs text-orange-600 font-medium">⚠ Low Stock</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="editProduct(product)"
                    class="px-3 py-1 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="products.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <p class="text-gray-500 mb-4">No products found</p>
          <button
            @click="showAddModal = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add your first product
          </button>
        </div>
      </div>

      <!-- Add/Edit Product Modal -->
      <Teleport to="body">
        <div
          v-if="showAddModal || editingProduct"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="closeModal"
        >
          <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
              </h2>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

          <form @submit.prevent="saveProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                v-model="productForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div class="flex gap-2">
                  <select
                    v-model="productForm.category"
                    required
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option v-for="cat in displayCategories" :key="cat.id" :value="cat.name">
                      {{ cat.name }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="showNewCategoryInput = !showNewCategoryInput"
                    class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    title="Add new category"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
                <input
                  v-if="showNewCategoryInput"
                  v-model="newCategoryName"
                  type="text"
                  placeholder="New category name"
                  @keyup.enter="addNewCategory"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
                <input
                  v-model.number="productForm.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stock (units)</label>
                <input
                  v-model.number="productForm.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div class="space-y-2">
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <div class="flex gap-2">
                    <button
                      type="button"
                      @click="fileInputRef?.click()"
                      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {{ selectedFile ? 'Change Image' : 'Upload Image' }}
                    </button>
                    <div class="flex-1 relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">OR</span>
                      <input
                        v-model="productForm.image_url"
                        type="url"
                        placeholder="Enter image URL"
                        class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        @input="selectedFile = null"
                      />
                    </div>
                  </div>
                  <div v-if="imagePreview" class="mt-2">
                    <img
                      :src="imagePreview"
                      alt="Preview"
                      class="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <p v-if="selectedFile" class="text-xs text-gray-500 mt-1">{{ selectedFile.name }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg v-if="saving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product') }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      </Teleport>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

import { tlouCategoryNames, productImages, sortTlouCategories } from '~/data/tlou-products'

const productFallback = productImages.fallback
const auth = useAuth()
const api = useApi()
const products = ref([])
const categories = ref([])

/** Always include T.L.O.U. categories in admin dropdown */
const displayCategories = computed(() => {
  const names = new Set<string>([...tlouCategoryNames])
  categories.value.forEach((c) => names.add(c.name))
  return sortTlouCategories(names).map((name, i) => ({ id: `cat-${i}`, name }))
})
const loading = ref(true)
const syncing = ref(false)
const error = ref(null)

const LEGACY_CATEGORIES = [
  'Corporate Uniform',
  'Protective Clothing',
  'Hospitality Wear',
  'Security Clothing',
]

function isLegacyCatalog(list) {
  return list.some(
    (p) =>
      LEGACY_CATEGORIES.includes(p.category) ||
      (p.image_url && !String(p.image_url).includes('tlou_'))
  )
}
const showAddModal = ref(false)
const editingProduct = ref(null)
const saving = ref(false)
const successMessage = ref('')
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')

const productForm = ref({
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  image_url: ''
})
const selectedFile = ref(null)
const fileInputRef = ref(null)

const imagePreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  }
  if (productForm.value.image_url) {
    return productForm.value.image_url
  }
  return ''
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // Clear URL input when file is selected
    productForm.value.image_url = ''
  }
}

onMounted(async () => {
  // Initialize auth if needed
  if (process.client && !auth.isAuthenticated) {
    auth.initAuth()
  }
  
  // Wait a bit for auth to initialize
  await new Promise(resolve => setTimeout(resolve, 100))
  
  await loadCategories()
  await loadProducts()
  if (products.value.length > 0 && isLegacyCatalog(products.value)) {
    await syncCatalog(true)
  }
})

const loadProducts = async () => {
  loading.value = true
  error.value = null
  try {
    products.value = await api.getProducts()
  } catch (err) {
    console.error('Error loading products:', err)
    error.value = 'Failed to load products. Is the backend running on port 3003?'
  } finally {
    loading.value = false
  }
}

const syncCatalog = async (silent = false) => {
  syncing.value = true
  if (!silent) error.value = null
  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) throw new Error('Not logged in')

    const config = useRuntimeConfig()
    const response = await fetch(`${config.public.apiBase}/api/admin/sync-catalog`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.message || 'Sync failed')
    }

    await loadProducts()
    if (!silent) {
      successMessage.value = 'T.L.O.U. catalog synced — old template products replaced.'
      setTimeout(() => { successMessage.value = '' }, 5000)
    }
  } catch (err) {
    console.error('Catalog sync error:', err)
    if (!silent) error.value = err.message || 'Failed to sync catalog'
  } finally {
    syncing.value = false
  }
}

const loadCategories = async () => {
  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) {
      console.warn('No token available for loading categories')
      return
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const response = await fetch(`${apiBase}/api/admin/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to load categories:', response.status, errorText)
      return
    }

    const data = await response.json()
    categories.value = data.categories || []
    console.log('Categories loaded:', categories.value.length)
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

const addNewCategory = () => {
  if (newCategoryName.value.trim()) {
    productForm.value.category = newCategoryName.value.trim()
    newCategoryName.value = ''
    showNewCategoryInput.value = false
    // Reload categories after adding (will be created when product is saved)
  }
}

const editProduct = (product) => {
  editingProduct.value = product
  selectedFile.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  productForm.value = {
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url || ''
  }
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  selectedFile.value = null
  showNewCategoryInput.value = false
  newCategoryName.value = ''
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  productForm.value = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    image_url: ''
  }
}

const saveProduct = async () => {
  saving.value = true
  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) {
      alert('You must be logged in to perform this action')
      return
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    let imageUrl = productForm.value.image_url

    // Upload file if selected
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('image', selectedFile.value)

      const uploadResponse = await fetch(`${apiBase}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({ message: 'Failed to upload image' }))
        throw new Error(errorData.message || 'Failed to upload image')
      }

      const uploadData = await uploadResponse.json()
      // Construct full URL
      imageUrl = `${apiBase}${uploadData.url}`
    }

    const url = editingProduct.value
      ? `${apiBase}/api/admin/products/${editingProduct.value.id}`
      : `${apiBase}/api/admin/products`

    const productData = {
      ...productForm.value,
      image_url: imageUrl
    }

    const response = await fetch(url, {
      method: editingProduct.value ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to save product' }))
      throw new Error(errorData.message || 'Failed to save product')
    }

    await Promise.all([loadProducts(), loadCategories()])
    successMessage.value = editingProduct.value ? 'Product updated successfully!' : 'Product added successfully!'
    selectedFile.value = null
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
    closeModal()
    
    // Show success message
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Error saving product:', err)
    error.value = err.message || 'Failed to save product. Please try again.'
    setTimeout(() => {
      error.value = null
    }, 5000)
  } finally {
    saving.value = false
  }
}

const deleteProduct = async (productId) => {
  if (!confirm('Are you sure you want to delete this product?')) {
    return
  }

  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) {
      alert('You must be logged in to perform this action')
      return
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const response = await fetch(`${apiBase}/api/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }))
      throw new Error(errorData.message || 'Failed to delete product')
    }

    await loadProducts()
  } catch (err) {
    console.error('Error deleting product:', err)
    alert(err.message || 'Failed to delete product. Please try again.')
  }
}
</script>
