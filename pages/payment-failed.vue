<template>
  <div class="container py-20">
    <div class="max-w-lg mx-auto text-center animate-fade-up">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-8">
        <XCircle class="h-10 w-10" />
      </div>

      <h1 class="font-display text-4xl font-bold text-foreground">
        Payment Failed
      </h1>

      <p class="mt-4 text-lg text-muted-foreground">
        We couldn't process your payment. Please try again or use a different payment method.
      </p>

      <div class="mt-8 p-6 bg-secondary/50 rounded-lg text-left">
        <h3 class="font-semibold mb-2">What you can try:</h3>
        <ul class="text-sm text-muted-foreground space-y-2">
          <li>• Check that your card details are correct</li>
          <li>• Ensure you have sufficient funds</li>
          <li>• Try a different payment method</li>
          <li>• Contact your bank if the issue persists</li>
        </ul>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/checkout">
          <Button variant="hero" size="lg">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </NuxtLink>
        <NuxtLink to="/cart">
          <Button variant="outline" size="lg">
            Back to Cart
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircle, ArrowRight, RefreshCw } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
</script>

