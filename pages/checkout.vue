<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Back Button -->
      <div class="mb-6">
        <NuxtLink to="/cart" class="flex items-center gap-2 text-primary hover:text-primary/80">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Cart
        </NuxtLink>
      </div>

      <h1 class="font-display text-4xl font-bold text-foreground mb-8">Checkout</h1>

      <!-- Empty Cart Message -->
      <div v-if="cart.cartItems.length === 0" class="bg-white rounded-lg p-8 shadow-sm text-center">
        <p class="text-gray-500 mb-4">Your cart is empty</p>
        <NuxtLink to="/products" class="text-primary hover:underline">
          Continue Shopping
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Contact -->
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="font-semibold text-foreground mb-4">Contact</h2>
            <div>
              <label class="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="font-semibold text-foreground mb-4">Shipping Address</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-foreground mb-2">Address</label>
                <input
                  v-model="formData.address"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">City</label>
                <input
                  v-model="formData.city"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                <input
                  v-model="formData.zipCode"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="font-semibold text-foreground mb-4">Payment</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <input
                  v-model="formData.cardNumber"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                  <input
                    v-model="formData.expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-2">CVC</label>
                  <input
                    v-model="formData.cvc"
                    type="text"
                    placeholder="123"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button 
              @click="handlePayment"
              :disabled="processing || !isFormValid"
              class="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 mt-6 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processing">Processing...</span>
              <span v-else>Pay R{{ cart.total.toFixed(2) }}</span>
            </button>

            <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-red-800 text-sm">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 class="font-semibold text-foreground mb-4">Order Summary</h2>
          
          <div class="space-y-3 mb-4">
            <div 
              v-for="item in cart.cartItems" 
              :key="item.id"
              class="flex gap-3 pb-3 border-b"
            >
              <img
                :src="item.image_url || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop'"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="font-medium text-foreground">{{ item.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ item.category || 'Fabric' }}</p>
                <p class="text-sm text-muted-foreground">Qty: {{ item.quantity }} yards</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-foreground">R{{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal ({{ cart.totalItems }} items)</span>
              <span>R{{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>R{{ cart.shipping.toFixed(2) }}</span>
            </div>
            <div class="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>R{{ cart.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCart()
const auth = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const formData = ref({
  email: auth.user?.value?.email || '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvc: ''
})

const processing = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return formData.value.email &&
    formData.value.firstName &&
    formData.value.lastName &&
    formData.value.address &&
    formData.value.city &&
    formData.value.zipCode &&
    formData.value.cardNumber &&
    formData.value.expiryDate &&
    formData.value.cvc &&
    cart.cartItems.length > 0
})

const handlePayment = async () => {
  if (!isFormValid.value || processing.value) return

  // Check if user is logged in
  if (!auth.isAuthenticated) {
    error.value = 'Please log in to complete your order'
    await navigateTo('/auth')
    return
  }

  processing.value = true
  error.value = ''

  try {
    const token = auth.token?.value || auth.token || (process.client ? localStorage.getItem('token') : null)
    if (!token) {
      throw new Error('Authentication required')
    }

    const shippingAddress = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      address: formData.value.address,
      city: formData.value.city,
      zipCode: formData.value.zipCode
    }

    const orderData = {
      items: cart.cartItems,
      total: cart.total,
      shippingAddress
    }

    const response = await fetch(`${apiBase}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Order creation error:', errorData)
      throw new Error(errorData.error || errorData.message || 'Failed to create order')
    }

    const result = await response.json()
    
    // Clear cart after successful order
    cart.clearCart()
    
    // Redirect to payment success with order ID
    await navigateTo(`/payment-success?orderId=${result.order.id}`)
  } catch (err) {
    console.error('Payment error:', err)
    error.value = err.message || 'Failed to process payment. Please try again.'
  } finally {
    processing.value = false
  }
}

// Redirect to cart if empty
onMounted(() => {
  if (process.client && cart.cartItems.length === 0) {
    navigateTo('/cart')
  }
})
</script>

