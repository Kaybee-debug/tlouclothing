<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold text-foreground mb-2">Orders</h1>
      <p class="text-muted-foreground">T.L.O.U. Clothing — customer orders &amp; EFT payments</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-muted-foreground">Loading orders...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <!-- Orders Table -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-medium text-gray-900">#{{ order.id }}</span>
              </td>
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ order.user_name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">{{ order.user_email || order.email || 'N/A' }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.created_at) }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(order.created_at) }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-900">{{ getOrderItemCount(order) }} items</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-gray-900">R{{ parseFloat(order.total_amount || order.total || 0).toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="getStatusClass(order.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ order.status || 'pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewOrderDetails(order)"
                  class="text-primary hover:text-primary/80 mr-4"
                >
                  View
                </button>
                <select
                  v-model="order.status"
                  @change="updateOrderStatus(order.id, order.status)"
                  class="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pending">Pending payment</option>
                  <option value="paid">Payment confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="orders.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p class="text-gray-500 mb-4">No orders found</p>
      </div>
    </div>

    <!-- Order Details Modal -->
    <Teleport to="body">
      <div
        v-if="selectedOrder"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="selectedOrder = null"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Order #{{ selectedOrder.id }}</h2>
            <button
              @click="selectedOrder = null"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <!-- Customer Info -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Name:</span>
                  <span class="text-sm font-medium text-gray-900">{{ selectedOrder.user_name || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Email:</span>
                  <span class="text-sm font-medium text-gray-900">{{ selectedOrder.user_email || selectedOrder.email || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Order Date:</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Status:</span>
                  <span :class="getStatusClass(selectedOrder.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ selectedOrder.status || 'pending' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in getOrderItems(selectedOrder)"
                  :key="index"
                  class="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
                >
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ item.name || 'Product' }}</p>
                    <p class="text-sm text-gray-500">Quantity: {{ item.quantity || 1 }} × R{{ parseFloat(item.price || 0).toFixed(2) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">R{{ (parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Subtotal:</span>
                <span class="text-sm font-medium text-gray-900">R{{ parseFloat(selectedOrder.total_amount || selectedOrder.total || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>R{{ parseFloat(selectedOrder.total_amount || selectedOrder.total || 0).toFixed(2) }}</span>
              </div>
            </div>
          </div>
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

const auth = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const orders = ref([])
const loading = ref(true)
const error = ref(null)
const selectedOrder = ref(null)

onMounted(async () => {
  await loadOrders()
})

const loadOrders = async () => {
  loading.value = true
  error.value = null
  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    
    if (!token) {
      error.value = 'You must be logged in to view orders'
      return
    }

    const response = await fetch(`${apiBase}/api/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to load orders')
    }

    const data = await response.json()
    orders.value = data.orders || []
  } catch (err) {
    console.error('Error loading orders:', err)
    error.value = 'Failed to load orders. Please try again.'
  } finally {
    loading.value = false
  }
}

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    
    const response = await fetch(`${apiBase}/api/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })

    if (!response.ok) {
      throw new Error('Failed to update order status')
    }

    // Reload orders to reflect the change
    await loadOrders()
  } catch (err) {
    console.error('Error updating order status:', err)
    alert('Failed to update order status. Please try again.')
  }
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
}

const getStatusClass = (status) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}

const getOrderItemCount = (order) => {
  if (order.items && Array.isArray(order.items)) {
    return order.items.length
  }
  if (order.items && typeof order.items === 'string') {
    try {
      const items = JSON.parse(order.items)
      return Array.isArray(items) ? items.length : 1
    } catch {
      return 1
    }
  }
  return 1
}

const getOrderItems = (order) => {
  if (order.items && Array.isArray(order.items)) {
    return order.items
  }
  if (order.items && typeof order.items === 'string') {
    try {
      return JSON.parse(order.items)
    } catch {
      return [{ name: 'Product', price: order.total_amount || order.total || 0, quantity: 1 }]
    }
  }
  return [{ name: 'Product', price: order.total || 0, quantity: 1 }]
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>
