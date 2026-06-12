<template>
  <div>
    <section class="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-hero">
      <div class="container mx-auto px-4 relative z-10 max-w-7xl">
        <div class="max-w-2xl animate-fade-up py-16">
          <span class="inline-block px-4 py-1.5 text-sm font-medium text-white bg-primary/90 rounded-full mb-6">
            Founded 2021 · Tembisa
          </span>
          <h1 class="font-display text-5xl md:text-6xl font-bold text-white">Our Story</h1>
          <p class="mt-6 text-lg text-white/85 max-w-lg">
            T.L.O.U. Clothing (The Last Of Us) started as a street vendor stall and grew into a recognised local streetwear brand.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-secondary/50">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in values" :key="item.title" class="bg-white rounded-lg p-6 shadow-sm text-center">
            <h3 class="font-display font-semibold text-lg mb-3">{{ item.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="font-display text-3xl font-bold text-center mb-8">About the Business</h2>
        <div class="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p>
            T.L.O.U. Clothing is a street-based clothing brand based at <strong>933 Winnie Mandela, Zone 10, Tembisa, Gauteng</strong>.
            We sell quality hoodies, sweatpants, crop hoodies, sweaters and coordinated tracksuit sets directly to walk-in customers and via WhatsApp and social media.
          </p>
          <p>
            <strong>Mission:</strong> To offer excellent service and affordable, high-quality clothing at our street stall — making street fashion available to the Tembisa community and beyond.
          </p>
          <p>
            <strong>Vision:</strong> To become one of the most trusted streetwear brands in Gauteng, growing from a vendor stall into a recognised local brand with fair pricing and consistent quality.
          </p>
          <p>
            <strong>What makes us different:</strong> We sell coordinated tracksuit bundles (trackpants + sweater or hoodie) so customers save compared to buying pieces separately. We offer assorted colours, keep popular items in stock, and stay active on social media for easy ordering.
          </p>
          <p>
            <strong>Target customers:</strong> Young adults, students and working people in Tembisa and neighbouring areas looking for affordable, stylish streetwear.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-soft">
      <div class="container mx-auto px-4 max-w-7xl text-center">
        <h2 class="font-display text-3xl font-bold mb-4">Visit Our Stall</h2>
        <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
          {{ config.public.businessAddress }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/products">
            <button class="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90">View Catalog</button>
          </NuxtLink>
          <NuxtLink to="/contact">
            <button class="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/5 font-medium">Contact Us</button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const values = [
  { title: 'Quality First', text: 'Every item is selected for durability and comfort — street fashion you can trust.' },
  { title: 'Affordable Prices', text: 'Budget-friendly casual wear for students and working-class customers.' },
  { title: 'Community Focus', text: 'Built in Tembisa for Tembisa — walk-in, WhatsApp and social orders welcome.' },
]
</script>
