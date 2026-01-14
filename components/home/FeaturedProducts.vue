<template>
  <section class="py-20 bg-gradient-soft">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
          Featured Collection
        </h2>
        <p class="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Hand-picked selections of our finest fabrics, perfect for your next creative project.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in featured"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>

      <div class="mt-12 text-center">
        <NuxtLink to="/products">
          <Button variant="default" size="lg">
            View All Products
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import type { Product } from '~/types';
import ProductCard from '~/components/products/ProductCard.vue';
import Button from '~/components/ui/button.vue';

interface Props {
  products: Product[];
}

const props = defineProps<Props>();

const featured = computed(() => props.products.slice(0, 4));
</script>

