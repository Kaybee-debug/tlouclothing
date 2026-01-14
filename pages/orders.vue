<template>
  <div class="container py-12">
    <h1 class="font-display text-4xl font-bold text-foreground mb-8">My Orders</h1>

    <div v-if="loading" class="text-center py-12">
      <p class="text-muted-foreground">Loading orders...</p>
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-12">
      <p class="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
      <NuxtLink to="/products">
        <Button>Start Shopping</Button>
      </NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-card rounded-lg shadow-elegant p-6 animate-fade-up"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="font-display text-xl font-semibold text-foreground">
              Order #{{ order.id }}
            </h2>
            <p class="text-sm text-muted-foreground">
              {{ formatDate(order.createdAt) }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-lg font-semibold text-primary">
              R{{ order.totalAmount.toFixed(2) }}
            </div>
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
          </div>
        </div>

        <div class="border-t border-border pt-4 mt-4">
          <h3 class="font-semibold text-foreground mb-3">Items:</h3>
          <div class="space-y-2">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span class="text-muted-foreground">
                {{ item.product_name }} x{{ item.quantity }}
              </span>
              <span>R{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button.vue';
import { useAuth } from '~/composables/useAuth';
import { useToast } from '~/composables/useToast';

definePageMeta({
  middleware: 'auth',
});

const { user } = useAuth();
const { toast } = useToast();
const config = useRuntimeConfig();
const route = useRoute();

const orders = ref<any[]>([]);
const loading = ref(true);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

    const response = await fetch(`${apiBase}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    orders.value = data;

    // If there's an orderId in query, show success message
    if (route.query.orderId) {
      toast({
        title: 'Order placed successfully!',
        description: `Your order #${route.query.orderId} has been confirmed.`,
      });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast({
      title: 'Error',
      description: 'Unable to load your orders.',
      variant: 'destructive',
    });
  } finally {
    loading.value = false;
  }
});
</script>

