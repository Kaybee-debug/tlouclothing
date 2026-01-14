<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-display text-3xl font-bold text-foreground">
        Products
      </h1>
      <p class="text-muted-foreground mt-1">
        Manage your product catalog
      </p>
    </div>

    <div class="bg-card rounded-lg shadow-elegant p-6">
      <div class="mb-4 flex items-center gap-4">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="search"
            placeholder="Search products..."
            class="pl-10"
          />
        </div>
        <Button @click="openDialog()">
          <Plus class="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left p-4 font-semibold">Name</th>
              <th class="text-left p-4 font-semibold">Category</th>
              <th class="text-left p-4 font-semibold">Price</th>
              <th class="text-left p-4 font-semibold">Stock</th>
              <th class="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-b border-border"
            >
              <td class="p-4">{{ product.name }}</td>
              <td class="p-4">{{ product.category || 'General' }}</td>
              <td class="p-4">R{{ product.price.toFixed(2) }}</td>
              <td class="p-4">{{ product.stock }}</td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" @click="openDialog(product)">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="deleteProduct(product.id)">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Pencil, Trash2, Search } from 'lucide-vue-next';
import { sampleProducts } from '~/data/products';
import type { Product } from '~/types';
import Button from '~/components/ui/button.vue';
import Input from '~/components/ui/input.vue';
import { useToast } from '~/composables/useToast';

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
});

const { toast } = useToast();
const products = ref<Product[]>(sampleProducts);
const search = ref('');

const filteredProducts = computed(() =>
  products.value.filter(
    p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.value.toLowerCase())
  )
);

const openDialog = (product?: Product) => {
  toast({
    title: product ? 'Edit Product' : 'Add Product',
    description: 'Product dialog functionality coming soon',
  });
};

const deleteProduct = (id: string) => {
  products.value = products.value.filter(p => p.id !== id);
  toast({
    title: 'Product deleted',
    description: 'The product has been removed.',
  });
};
</script>

