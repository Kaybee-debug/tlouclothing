<template>
  <div v-if="items.length === 0" class="container py-20 text-center">
    <div class="max-w-md mx-auto">
      <ShoppingBag class="h-16 w-16 text-muted-foreground mx-auto mb-6" />
      <h1 class="font-display text-3xl font-bold text-foreground">
        Your Cart is Empty
      </h1>
      <p class="mt-4 text-muted-foreground">
        Looks like you haven't added any fabrics to your cart yet.
      </p>
      <NuxtLink to="/products" class="mt-8 inline-block">
        <Button variant="hero" size="lg">
          Start Shopping
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </NuxtLink>
    </div>
  </div>

  <div v-else class="container py-12">
    <h1 class="font-display text-4xl font-bold text-foreground mb-8">
      Shopping Cart
    </h1>

    <div class="grid lg:grid-cols-3 gap-12">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-6">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="flex gap-4 md:gap-6 p-4 bg-card rounded-lg shadow-elegant animate-fade-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <!-- Image -->
          <NuxtLink
            :to="`/products/${item.product.id}`"
            class="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden flex-shrink-0"
          >
            <img
              :src="item.product.image_url"
              :alt="item.product.name"
              class="w-full h-full object-cover"
            />
          </NuxtLink>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <NuxtLink :to="`/products/${item.product.id}`">
              <h3 class="font-display font-semibold text-lg text-foreground hover:text-primary transition-colors">
                {{ item.product.name }}
              </h3>
            </NuxtLink>
            <p class="text-sm text-muted-foreground mt-1">
              R{{ item.product.price.toFixed(2) }} per yard
            </p>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-4 mt-4">
              <div class="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8"
                  @click="updateQuantity(item.product.id, item.quantity - 1)"
                >
                  <Minus class="h-4 w-4" />
                </Button>
                <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8"
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                >
                  <Plus class="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                class="text-destructive hover:text-destructive"
                @click="removeFromCart(item.product.id)"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Price -->
          <div class="text-right">
            <p class="font-semibold text-lg text-foreground">
              R{{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg shadow-elegant p-6 sticky top-24">
          <h2 class="font-display text-2xl font-bold text-foreground mb-6">
            Order Summary
          </h2>
          <div class="space-y-4">
            <div class="flex justify-between text-muted-foreground">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>R{{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="border-t border-border pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span class="text-primary">R{{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>
          <NuxtLink to="/checkout" class="mt-6 block">
            <Button variant="hero" size="lg" class="w-full">
              Proceed to Checkout
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import { useCart } from '~/composables/useCart';

const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
</script>

