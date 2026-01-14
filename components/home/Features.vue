<template>
  <section class="py-16 bg-secondary/50">
    <div class="container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="text-center animate-fade-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
            <component :is="feature.icon" class="h-6 w-6" />
          </div>
          <h3 class="font-display font-semibold text-foreground">
            {{ feature.title }}
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Truck, Shield, Leaf, Headphones } from 'lucide-vue-next';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% satisfaction promise',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Eco-friendly materials',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated fabric consultants',
  },
];
</script>

