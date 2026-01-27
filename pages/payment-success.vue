<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="bg-white rounded-lg p-8 shadow-sm text-center">
        <!-- Success Icon -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 class="font-display text-4xl font-bold text-foreground mb-4">
          Payment Successful!
        </h1>

        <p class="text-lg text-muted-foreground mb-8">
          Thank you for your order. We've sent a confirmation email with your order details.
        </p>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 class="font-semibold text-foreground mb-2">Order #{{ orderId || 'AF-699188' }}</h2>
          <p class="text-muted-foreground">
            Your fabrics will be carefully packaged and shipped within 2-3 business days. You'll receive tracking information via email once your order ships.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/orders">
            <button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium">
              View Order History
            </button>
          </NuxtLink>
          <NuxtLink to="/products">
            <button class="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 font-medium">
              Continue Shopping
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const orderId = computed(() => route.query.orderId || null)
</script>