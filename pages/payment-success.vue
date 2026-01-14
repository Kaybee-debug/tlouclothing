<template>
  <div class="container py-20">
    <div class="max-w-lg mx-auto text-center animate-fade-up">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/10 text-sage mb-8">
        <CheckCircle class="h-10 w-10" />
      </div>

      <h1 class="font-display text-4xl font-bold text-foreground">
        Payment Successful!
      </h1>

      <p class="mt-4 text-lg text-muted-foreground">
        Thank you for your order. We've sent a confirmation email with your order details.
      </p>

      <div class="mt-8 p-6 bg-secondary/50 rounded-lg text-left">
        <div class="flex items-center gap-3 mb-4">
          <Package class="h-5 w-5 text-primary" />
          <span class="font-semibold">Order #AF-{{ orderId }}</span>
        </div>
        <p class="text-sm text-muted-foreground">
          Your fabrics will be carefully packaged and shipped within 2-3 business days.
          You'll receive tracking information via email once your order ships.
        </p>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/products">
          <Button variant="hero" size="lg">
            Continue Shopping
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </NuxtLink>
        <NuxtLink to="/">
          <Button variant="outline" size="lg">
            Back to Home
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Package, ArrowRight } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';

const orderId = Date.now().toString().slice(-6);
</script>

