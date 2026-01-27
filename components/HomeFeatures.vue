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
            <svg v-if="feature.icon === 'truck'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else-if="feature.icon === 'shield'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <svg v-else-if="feature.icon === 'leaf'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            <svg v-else-if="feature.icon === 'headphones'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="font-display font-semibold text-foreground">
            {{ feature.title }}
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'truck',
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: 'shield',
    title: 'Quality Guarantee',
    description: '100% satisfaction promise',
  },
  {
    icon: 'leaf',
    title: 'Sustainable',
    description: 'Eco-friendly materials',
  },
  {
    icon: 'headphones',
    title: 'Expert Support',
    description: 'Dedicated fabric consultants',
  },
]
</script>

