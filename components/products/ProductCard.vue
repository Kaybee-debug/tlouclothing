<template>
  <div
    :class="cn(
      'group relative bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-500 animate-fade-up',
      className
    )"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <!-- Image -->
    <NuxtLink :to="`/products/${product.id}`" class="block aspect-square overflow-hidden">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
    </NuxtLink>

    <!-- Quick Actions Overlay -->
    <div class="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
      <div class="flex gap-2">
        <NuxtLink :to="`/products/${product.id}`">
          <Button variant="secondary" size="icon" class="rounded-full">
            <Eye class="h-4 w-4" />
          </Button>
        </NuxtLink>
        <Button
          variant="hero"
          size="icon"
          class="rounded-full"
          @click="addToCart(product)"
        >
          <ShoppingBag class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- Category Badge -->
    <span
      v-if="product.category"
      class="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded"
    >
      {{ product.category }}
    </span>

    <!-- Low Stock Badge -->
    <span
      v-if="product.stock < 30"
      class="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded"
    >
      Low Stock
    </span>

    <!-- Content -->
    <div class="p-4">
      <NuxtLink :to="`/products/${product.id}`">
        <h3 class="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <p class="mt-1 text-sm text-muted-foreground line-clamp-2">
        {{ product.description }}
      </p>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-lg font-semibold text-primary">
          R{{ product.price.toFixed(2) }}
        </span>
        <span class="text-xs text-muted-foreground">per yard</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBag, Eye } from 'lucide-vue-next';
import type { Product } from '~/types';
import Button from '~/components/ui/button.vue';
import { useCart } from '~/composables/useCart';
import { cn } from '~/lib/utils';

interface Props {
  product: Product;
  className?: string;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
});

const { addToCart } = useCart();
</script>

