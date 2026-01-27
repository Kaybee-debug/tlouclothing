<template>
  <div class="p-8">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p class="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-muted-foreground">Loading dashboard stats...</p>
      </div>

      <!-- Stats Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Total Products</h3>
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-foreground mb-1">{{ stats.totalProducts || 0 }}</div>
          <p class="text-sm" :class="stats.productsThisWeek > 0 ? 'text-green-600' : 'text-gray-500'">
            {{ stats.productsThisWeek > 0 ? `+${stats.productsThisWeek} this week` : 'No new products this week' }}
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-foreground mb-1">{{ stats.totalOrders || 0 }}</div>
          <p class="text-sm" :class="stats.ordersThisWeek > 0 ? 'text-green-600' : 'text-gray-500'">
            {{ stats.ordersThisWeek > 0 ? `+${stats.ordersThisWeek} this week` : 'No new orders this week' }}
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Revenue</h3>
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-foreground mb-1">R{{ formatCurrency(stats.totalRevenue || 0) }}</div>
          <p class="text-sm" :class="parseFloat(stats.revenueChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ parseFloat(stats.revenueChange || 0) >= 0 ? '+' : '' }}{{ stats.revenueChange || 0 }}% from last month
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold text-foreground mb-1">{{ stats.conversionRate || '0' }}%</div>
          <p class="text-sm" :class="parseFloat(stats.conversionRateChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ parseFloat(stats.conversionRateChange || 0) >= 0 ? '+' : '' }}{{ stats.conversionRateChange || '0' }}% from last month
          </p>
        </div>
      </div>

      <div v-if="!loading" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="font-semibold text-foreground mb-4">Recent Orders</h2>
          <div v-if="stats.recentOrders && stats.recentOrders.length > 0" class="space-y-4">
            <div 
              v-for="order in stats.recentOrders" 
              :key="order.id"
              class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p class="font-medium text-foreground">Order #{{ order.id }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ order.user_name || 'Customer' }} • R{{ formatCurrency(order.total_amount || order.total || 0) }}
                </p>
              </div>
              <span 
                class="text-xs px-2 py-1 rounded-full"
                :class="{
                  'bg-green-100 text-green-800': order.status === 'completed' || order.status === 'delivered',
                  'bg-yellow-100 text-yellow-800': order.status === 'pending',
                  'bg-blue-100 text-blue-800': order.status === 'processing',
                  'bg-gray-100 text-gray-800': !order.status
                }"
              >
                {{ order.status || 'pending' }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>No recent orders</p>
          </div>
        </div>

        <!-- Low Stock Alert -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="font-semibold text-foreground mb-4">Low Stock Alert</h2>
          <div v-if="stats.lowStockProducts && stats.lowStockProducts.length > 0" class="space-y-4">
            <div 
              v-for="product in stats.lowStockProducts" 
              :key="product.id"
              class="flex items-center gap-3 p-3 border border-orange-200 bg-orange-50 rounded-lg"
            >
              <img
                :src="product.image_url || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop'"
                :alt="product.name"
                class="w-12 h-12 object-cover rounded"
              />
              <div class="flex-1">
                <p class="font-medium text-foreground">{{ product.name }}</p>
                <p class="text-sm text-muted-foreground">{{ product.stock }} yards left</p>
              </div>
              <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Low Stock</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>No low stock products</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const auth = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const stats = ref({
  totalProducts: 0,
  productsThisWeek: 0,
  totalOrders: 0,
  ordersThisWeek: 0,
  totalRevenue: 0,
  revenueChange: '0',
  conversionRate: '0',
  conversionRateChange: '0',
  recentOrders: [],
  lowStockProducts: []
})
const loading = ref(true)

onMounted(async () => {
  // Initialize auth first
  if (process.client) {
    auth.initAuth()
    // Wait a bit for auth to initialize
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  await loadStats()
})

const loadStats = async () => {
  loading.value = true
  try {
    // Initialize auth if needed
    if (process.client && !auth.isAuthenticated) {
      auth.initAuth()
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) {
      console.error('No token available for loading stats')
      loading.value = false
      return
    }

    console.log('Loading stats from:', `${apiBase}/api/admin/stats`)

    const response = await fetch(`${apiBase}/api/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to load stats:', response.status, errorText)
      try {
        const errorData = JSON.parse(errorText)
        console.error('Error data:', errorData)
      } catch (e) {
        console.error('Could not parse error:', errorText)
      }
      loading.value = false
      return
    }

    const data = await response.json()
    console.log('Dashboard stats loaded:', data)
    console.log('Stats object:', JSON.stringify(data, null, 2))
    
    if (data.stats) {
      // Explicitly set each stat value to ensure reactivity
      stats.value.totalProducts = data.stats.totalProducts || 0
      stats.value.productsThisWeek = data.stats.productsThisWeek || 0
      stats.value.totalOrders = data.stats.totalOrders || 0
      stats.value.ordersThisWeek = data.stats.ordersThisWeek || 0
      stats.value.totalRevenue = data.stats.totalRevenue || 0
      stats.value.revenueChange = data.stats.revenueChange || '0'
      stats.value.conversionRate = data.stats.conversionRate || '0'
      stats.value.conversionRateChange = data.stats.conversionRateChange || '0'
      stats.value.recentOrders = data.stats.recentOrders || []
      stats.value.lowStockProducts = data.stats.lowStockProducts || []
      
      console.log('Stats updated:', stats.value)
      console.log('Total Products:', stats.value.totalProducts)
      console.log('Total Orders:', stats.value.totalOrders)
      console.log('Total Revenue:', stats.value.totalRevenue)
    } else {
      console.warn('No stats in response:', data)
    }
  } catch (err) {
    console.error('Error loading dashboard stats:', err)
    console.error('Error stack:', err.stack)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount) => {
  return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

