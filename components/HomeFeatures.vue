<template>
  <section class="py-16 bg-secondary/50">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="text-center animate-fade-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
            <span class="text-2xl" aria-hidden="true">{{ feature.emoji }}</span>
          </div>
          <h3 class="font-display font-semibold text-foreground">{{ feature.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { emoji: '🎨', title: 'Assorted Colours', description: 'Wide colour choices on every item' },
  { emoji: '✨', title: 'Bundle Savings', description: 'Tracksuit sets save you money' },
  { emoji: '📍', title: 'Walk-In Stall', description: '933 Winnie Mandela, Zone 10' },
  { emoji: '💬', title: 'WhatsApp Orders', description: 'Order easily via social media' },
]
</script>
