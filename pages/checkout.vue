<template>
  <div class="container py-12">
    <!-- Back Link -->
    <NuxtLink
      to="/cart"
      class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ArrowLeft class="h-4 w-4" />
      Back to Cart
    </NuxtLink>

    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Checkout Form -->
      <div class="animate-fade-up">
        <h1 class="font-display text-3xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Contact -->
          <div class="space-y-4">
            <h2 class="font-display text-lg font-semibold">Contact</h2>
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                required
              />
            </div>
          </div>

          <!-- Shipping -->
          <div class="space-y-4">
            <h2 class="font-display text-lg font-semibold">Shipping Address</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstName">First Name</Label>
                <Input
                  id="firstName"
                  v-model="form.firstName"
                  required
                />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  v-model="form.lastName"
                  required
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="address">Address</Label>
              <Input
                id="address"
                v-model="form.address"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="city">City</Label>
                <Input
                  id="city"
                  v-model="form.city"
                  required
                />
              </div>
              <div class="space-y-2">
                <Label for="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  v-model="form.zip"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="space-y-4">
            <h2 class="font-display text-lg font-semibold flex items-center gap-2">
              <CreditCard class="h-5 w-5" />
              Payment
            </h2>
            <div class="space-y-2">
              <Label for="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                v-model="form.cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  v-model="form.expiry"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div class="space-y-2">
                <Label for="cvc">CVC</Label>
                <Input
                  id="cvc"
                  v-model="form.cvc"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            class="w-full"
            :disabled="isProcessing"
          >
            <Lock v-if="!isProcessing" class="mr-2 h-4 w-4" />
            {{ isProcessing ? 'Processing...' : 'Complete Order' }}
          </Button>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg shadow-elegant p-6 sticky top-24">
          <h2 class="font-display text-xl font-bold text-foreground mb-6">
            Order Summary
          </h2>
          <div class="space-y-4">
            <div v-for="item in items" :key="item.id" class="flex justify-between text-sm">
              <span class="text-muted-foreground">{{ item.product.name }} x{{ item.quantity }}</span>
              <span>R{{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="border-t border-border pt-4 space-y-2">
              <div class="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R{{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{{ shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}` }}</span>
              </div>
              <div class="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span class="text-primary">R{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCard, Lock, ArrowLeft } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import Input from '~/components/ui/input.vue';
import Label from '~/components/ui/label.vue';
import { useCart } from '~/composables/useCart';
import { useAuth } from '~/composables/useAuth';
import { useToast } from '~/composables/useToast';

definePageMeta({
  middleware: 'auth',
});

const { items, totalPrice, clearCart } = useCart();
const { user } = useAuth();
const { toast } = useToast();
const isProcessing = ref(false);

const form = ref({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
});

// Pre-fill email when user is available
watchEffect(() => {
  if (user.value?.email) {
    form.value.email = user.value.email;
  }
});

const shipping = computed(() => totalPrice.value >= 100 ? 0 : 99.99);
const total = computed(() => totalPrice.value + shipping.value);

if (items.value.length === 0) {
  navigateTo('/cart');
}

const handleSubmit = async () => {
  if (!user.value) {
    toast({
      title: 'Error',
      description: 'You must be logged in to place an order.',
      variant: 'destructive',
    });
    navigateTo('/auth?from=/checkout');
    return;
  }

  isProcessing.value = true;

  try {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const token = process.client ? localStorage.getItem('token') : null;

    // Prepare order data
    const orderData = {
      items: items.value.map(item => ({
        productId: parseInt(item.product.id),
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: total.value,
      shippingAddress: {
        email: form.value.email,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        city: form.value.city,
        zip: form.value.zip,
      },
    };

    // Create order in database
    const response = await fetch(`${apiBase}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const orderResult = await response.json();

    clearCart();
    toast({
      title: 'Order placed successfully!',
      description: `Order #${orderResult.order.id} has been placed. Thank you for your purchase!`,
    });
    
    // Redirect to orders page to see the order
    navigateTo(`/orders?orderId=${orderResult.order.id}`);
  } catch (error) {
    console.error('Order error:', error);
    toast({
      title: 'Order failed',
      description: 'Unable to place order. Please try again.',
      variant: 'destructive',
    });
  } finally {
    isProcessing.value = false;
  }
};
</script>

