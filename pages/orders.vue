<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <h1 class="font-display text-4xl font-bold text-foreground mb-8">My Orders</h1>
      
      <div v-if="pending" class="text-center py-12">
        <p class="text-gray-500">Loading orders...</p>
      </div>
      
      <div v-else-if="orders && orders.length > 0" class="space-y-4">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="bg-white rounded-lg p-6 shadow-sm"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-semibold text-lg">Order #{{ order.id }}</h3>
              <p class="text-sm text-gray-500">{{ formatDate(order.created_at) }}</p>
            </div>
            <span 
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="statusClass(order.status)"
            >
              {{ formatStatus(order.status) }}
            </span>
          </div>

          <p v-if="order.status === 'pending'" class="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
            Payment pending — we will confirm your order after checking your EFT proof of payment.
          </p>
          
          <div class="space-y-2 mb-4">
            <div 
              v-for="(item, index) in getOrderItems(order)" 
              :key="index"
              class="flex justify-between text-sm"
            >
              <span>{{ item.quantity }}x {{ item.name || item.product_name || 'Product' }}</span>
              <span>R{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>R{{ order.total_amount || order.total }}</span>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500 mb-4">No orders yet</p>
        <NuxtLink to="/products" class="text-primary hover:underline">
          Start Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const orders = ref([])
const pending = ref(true)

onMounted(async () => {
  try {
    // Initialize auth first
    if (process.client) {
      auth.initAuth()
      // Wait a bit for auth to initialize
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    
    if (!token) {
      console.error('No token available for fetching orders')
      pending.value = false
      return
    }
    
    console.log('Fetching orders from:', `${apiBase}/api/orders`)
    
    const response = await fetch(`${apiBase}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to fetch orders:', response.status, errorText)
      pending.value = false
      return
    }
    
    const data = await response.json()
    console.log('Orders fetched:', data)
    orders.value = data.orders || data || []
    console.log('Orders set:', orders.value.length, 'orders')
  } catch (error) {
    console.error('Error fetching orders:', error)
    console.error('Error stack:', error.stack)
  } finally {
    pending.value = false
  }
})

const formatStatus = (status) => {
  const labels = {
    pending: 'Pending payment',
    paid: 'Payment confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return labels[status] || 'Pending payment'
}

const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-yellow-100 text-yellow-800'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getOrderItems = (order) => {
  if (!order.items) return []
  try {
    if (typeof order.items === 'string') {
      return JSON.parse(order.items)
    }
    return order.items
  } catch {
    return []
  }
}
</script>
