<template>
  <div class="container py-12">
    <h1 class="font-display text-4xl font-bold text-foreground mb-8">Products</h1>
    
    <div v-if="products.length === 0 && loading" class="text-center py-12">
      <p>Loading products...</p>
    </div>
    
    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">No products found.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { sampleProducts } from '~/data/products';
import ProductCard from '~/components/products/ProductCard.vue';

const config = useRuntimeConfig();
const products = ref<Product[]>([]);
const loading = ref(true);

// Fetch from API
onMounted(async () => {
  try {
    const apiUrl = config.public.apiBase || 'http://localhost:3003';
    const res = await fetch(`${apiUrl}/products`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data: Product[] = await res.json();
    
    const mappedData = data.map((p) => ({
      id: p.id.toString(),
      name: p.name,
      description: p.description,
      price: Number(p.price),
      stock: p.stock,
      image_url: p.image_url,
      category: p.category || 'General',
    }));
    
    products.value = mappedData;
  } catch (err) {
    console.error('Failed to fetch products from API:', err);
    // Fallback to sample products if API fails
    products.value = sampleProducts;
  } finally {
    loading.value = false;
  }
});
</script>

