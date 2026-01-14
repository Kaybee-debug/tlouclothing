<template>
  <div v-if="!product" class="container py-20 text-center">
    <h1 class="font-display text-3xl font-bold">Product Not Found</h1>
    <p class="mt-4 text-muted-foreground">
      The product you're looking for doesn't exist.
    </p>
    <NuxtLink to="/products" class="mt-8 inline-block">
      <Button>Back to Shop</Button>
    </NuxtLink>
  </div>

  <div v-else class="container py-12">
    <!-- Breadcrumb -->
    <NuxtLink
      to="/products"
      class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ArrowLeft class="h-4 w-4" />
      Back to Shop
    </NuxtLink>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Image -->
      <div class="aspect-square rounded-lg overflow-hidden shadow-elegant animate-fade-in">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Details -->
      <div class="animate-fade-up" style="animation-delay: 100ms">
        <span
          v-if="product.category"
          class="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded mb-4"
        >
          {{ product.category }}
        </span>
        <h1 class="font-display text-4xl font-bold text-foreground">
          {{ product.name }}
        </h1>
        <p class="mt-4 text-xl text-primary font-semibold">
          R{{ product.price.toFixed(2) }} <span class="text-sm text-muted-foreground font-normal">per yard</span>
        </p>

        <p class="mt-6 text-muted-foreground leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Stock Status -->
        <div class="mt-6 flex items-center gap-2">
          <Check v-if="product.stock > 0" class="h-5 w-5 text-accent" />
          <span :class="product.stock > 0 ? 'text-accent' : 'text-destructive'">
            {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
          </span>
        </div>

        <!-- Quantity Selector -->
        <div class="mt-8 flex items-center gap-4">
          <div class="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              class="h-10 w-10"
              @click="quantity > 1 && quantity--"
            >
              <Minus class="h-4 w-4" />
            </Button>
            <span class="w-12 text-center font-medium">{{ quantity }}</span>
            <Button
              variant="ghost"
              size="icon"
              class="h-10 w-10"
              @click="quantity < product.stock && quantity++"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Add to Cart -->
        <Button
          variant="hero"
          size="lg"
          class="mt-6 w-full md:w-auto"
          :disabled="product.stock === 0"
          @click="handleAddToCart"
        >
          <ShoppingBag class="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBag, Minus, Plus, ArrowLeft, Check } from 'lucide-vue-next';
import { sampleProducts } from '~/data/products';
import type { Product } from '~/types';
import Button from '~/components/ui/button.vue';
import { useCart } from '~/composables/useCart';
import { useToast } from '~/composables/useToast';

const route = useRoute();
const { addToCart } = useCart();
const { toast } = useToast();
const quantity = ref(1);

const product = computed(() => {
  const id = route.params.id as string;
  return sampleProducts.find(p => p.id === id);
});

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, quantity.value);
    toast({
      title: 'Added to cart',
      description: `${product.value.name} has been added to your cart.`,
    });
    quantity.value = 1;
  }
};
</script>

