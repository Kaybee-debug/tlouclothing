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
      <div class="overflow-x-auto">
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
              v-for="order in mockOrders"
              :key="order.id"
              class="border-b border-border"
            >
              <td class="p-4 font-medium">{{ order.id }}</td>
              <td class="p-4">
                <div>
                  <div class="font-medium">{{ order.customer }}</div>
                  <div class="text-sm text-muted-foreground">{{ order.email }}</div>
                </div>
              </td>
              <td class="p-4">{{ order.items }}</td>
              <td class="p-4">R{{ order.total.toFixed(2) }}</td>
              <td class="p-4">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    statusStyles[order.status]
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="p-4">{{ order.date }}</td>
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

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
});

const mockOrders = [
  {
    id: 'AF-1001',
    customer: 'John Smith',
    email: 'john@example.com',
    items: 3,
    total: 129.97,
    status: 'paid',
    date: '2024-01-15',
  },
  {
    id: 'AF-1002',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    items: 2,
    total: 89.98,
    status: 'paid',
    date: '2024-01-14',
  },
  {
    id: 'AF-1003',
    customer: 'Mike Davis',
    email: 'mike@example.com',
    items: 1,
    total: 54.99,
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: 'AF-1004',
    customer: 'Emily Brown',
    email: 'emily@example.com',
    items: 5,
    total: 234.95,
    status: 'paid',
    date: '2024-01-13',
  },
  {
    id: 'AF-1005',
    customer: 'Chris Wilson',
    email: 'chris@example.com',
    items: 2,
    total: 149.98,
    status: 'failed',
    date: '2024-01-13',
  },
];

const statusStyles = {
  paid: 'bg-sage/10 text-sage hover:bg-sage/20',
  pending: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  failed: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
};
</script>

