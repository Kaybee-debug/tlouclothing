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

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
});

const config = useRuntimeConfig();
const loading = ref(true);
const stats = ref([
  {
    label: 'Total Products',
    value: '0',
    icon: Package,
    change: 'Loading...',
  },
  {
    label: 'Total Orders',
    value: '0',
    icon: ShoppingCart,
    change: 'Loading...',
  },
  {
    label: 'Revenue',
    value: 'R0.00',
    icon: DollarSign,
    change: 'Loading...',
  },
  {
    label: 'Orders This Week',
    value: '0',
    icon: TrendingUp,
    change: 'Loading...',
  },
]);

onMounted(async () => {
  try {
    const apiBase = config.public.apiBase;
    const token = process.client ? localStorage.getItem('token') : null;

    if (!token) {
      navigateTo('/auth');
      return;
    }

    const response = await fetch(`${apiBase}/api/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    const data = await response.json();

    stats.value = [
      {
        label: 'Total Products',
        value: data.totalProducts.toString(),
        icon: Package,
        change: 'From database',
      },
      {
        label: 'Total Orders',
        value: data.totalOrders.toString(),
        icon: ShoppingCart,
        change: `${data.weekOrders} this week`,
      },
      {
        label: 'Revenue',
        value: `R${data.revenue}`,
        icon: DollarSign,
        change: `R${data.weekRevenue} this week`,
      },
      {
        label: 'Orders This Week',
        value: data.weekOrders.toString(),
        icon: TrendingUp,
        change: 'Last 7 days',
      },
    ];
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  } finally {
    loading.value = false;
  }
});
</script>
