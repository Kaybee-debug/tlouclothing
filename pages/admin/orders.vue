<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-display text-3xl font-bold text-foreground">
        Orders
      </h1>
      <p class="text-muted-foreground mt-1">
        View and manage customer orders
      </p>
    </div>

    <div class="bg-card rounded-lg shadow-elegant p-6">
      <div v-if="loading" class="text-center py-12">
        <p class="text-muted-foreground">Loading orders...</p>
      </div>
      <div v-else-if="orders.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">No orders found</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left p-4 font-semibold">Order ID</th>
              <th class="text-left p-4 font-semibold">Customer</th>
              <th class="text-left p-4 font-semibold">Items</th>
              <th class="text-left p-4 font-semibold">Total</th>
              <th class="text-left p-4 font-semibold">Status</th>
              <th class="text-left p-4 font-semibold">Date</th>
              <th class="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b border-border"
            >
              <td class="p-4 font-medium">#{{ order.id }}</td>
              <td class="p-4">
                <div>
                  <div class="font-medium">{{ order.customer }}</div>
                  <div class="text-sm text-muted-foreground">{{ order.email }}</div>
                </div>
              </td>
              <td class="p-4">{{ order.items?.length || 0 }} items</td>
              <td class="p-4">R{{ order.totalAmount.toFixed(2) }}</td>
              <td class="p-4">
                <span
                  :class="{
                    'bg-green-100 text-green-800': order.status === 'paid',
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-red-100 text-red-800': order.status === 'failed',
                  }"
                  class="px-2 py-1 rounded text-xs font-medium capitalize"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="p-4">{{ formatDate(order.createdAt) }}</td>
              <td class="p-4 text-right">
                <Button variant="ghost" size="icon">
                  <Eye class="h-4 w-4" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import { useToast } from '~/composables/useToast';

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
});

const config = useRuntimeConfig();
const { toast } = useToast();
const orders = ref<any[]>([]);
const loading = ref(true);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

onMounted(async () => {
  try {
    const apiBase = config.public.apiBase;
    const token = process.client ? localStorage.getItem('token') : null;

    if (!token) {
      navigateTo('/auth');
      return;
    }

    const response = await fetch(`${apiBase}/api/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    orders.value = data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast({
      title: 'Error',
      description: 'Unable to load orders.',
      variant: 'destructive',
    });
  } finally {
    loading.value = false;
  }
});
</script>
