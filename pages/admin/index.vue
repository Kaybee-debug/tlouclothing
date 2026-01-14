<template>
  <div class="space-y-8">
    <div>
      <h1 class="font-display text-3xl font-bold text-foreground">
        Dashboard
      </h1>
      <p class="text-muted-foreground mt-1">
        Welcome back! Here's an overview of your store.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="bg-card rounded-lg p-6 shadow-elegant animate-fade-up"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <div class="flex items-center justify-between">
          <div class="p-2 bg-primary/10 rounded-lg">
            <component :is="stat.icon" class="h-5 w-5 text-primary" />
          </div>
        </div>
        <div class="mt-4">
          <p class="text-2xl font-bold text-foreground">{{ stat.value }}</p>
          <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
          <p class="text-xs text-sage mt-1">{{ stat.change }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-vue-next';
import { sampleProducts } from '~/data/products';

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
});

const stats = [
  {
    label: 'Total Products',
    value: sampleProducts.length,
    icon: Package,
    change: '+2 this week',
  },
  {
    label: 'Total Orders',
    value: 24,
    icon: ShoppingCart,
    change: '+5 this week',
  },
  {
    label: 'Revenue',
    value: '$4,589',
    icon: DollarSign,
    change: '+12% from last month',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    icon: TrendingUp,
    change: '+0.5% from last month',
  },
];
</script>

