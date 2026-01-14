<template>
  <div>
    <Hero />
    <Features />
    <FeaturedProducts :products="sampleProducts" />
    <Categories />
  </div>
</template>

<script setup lang="ts">
import { sampleProducts } from '~/data/products';
import Hero from '~/components/home/Hero.vue';
import Features from '~/components/home/Features.vue';
import FeaturedProducts from '~/components/home/FeaturedProducts.vue';
import Categories from '~/components/home/Categories.vue';
</script>

