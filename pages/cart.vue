<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <h1 class="font-display text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div v-if="cart.cartItems.length === 0" class="text-center py-12">
        <p class="text-gray-500 mb-4">Your cart is empty</p>
        <NuxtLink to="/products" class="text-primary hover:underline">
          Continue Shopping
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in cart.cartItems" 
            :key="item.id"
            class="bg-white rounded-lg p-6 shadow-sm"
          >
            <div class="flex gap-4">
              <img
                :src="item.image_url || fallbackImage"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-lg bg-gray-100"
                @error="(e) => (e.target.src = fallbackImage)"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-foreground">{{ item.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ item.category || 'Clothing' }}</p>
                <p class="text-primary font-medium">R{{ Number(item.price).toFixed(2) }} each</p>
              </div>
              <div class="flex items-center gap-3">
                <input
                  :value="item.quantity"
                  @input="cart.updateQuantity(item.id, parseInt($event.target.value) || 1)"
                  type="number"
                  min="1"
                  class="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <button 
                  @click="cart.removeFromCart(item.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              <div class="text-right">
                <p class="font-semibold text-foreground">R{{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 class="font-semibold text-foreground mb-4">Order Summary</h2>
          
          <div class="space-y-2 mb-4">
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

          <div v-if="cart.subtotal < 100" class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p class="text-orange-800 text-sm">
              Add R{{ (100 - cart.subtotal).toFixed(2) }} more for free shipping!
            </p>
          </div>

          <NuxtLink to="/checkout">
            <button class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 mb-3">
              Proceed to Checkout
            </button>
          </NuxtLink>
          
          <NuxtLink to="/products" class="block text-center text-primary hover:text-primary/80">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productImages } from '~/data/tlou-products'

const cart = useCart()
const fallbackImage = productImages.fallback
</script>

