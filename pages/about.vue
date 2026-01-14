<template>
  <div>
    <!-- Hero -->
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1920&h=800&fit=crop"
          alt="Fabric workshop"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-hero" />
      </div>
      <div class="container relative z-10">
        <div class="max-w-2xl animate-fade-up">
          <h1 class="font-display text-5xl md:text-6xl font-bold text-cream">
            Our Story
          </h1>
          <p class="mt-6 text-lg text-cream/80">
            Since 1985, Xisekelo Fabrics has been the trusted source for premium textiles,
            serving designers, craftspeople, and manufacturers worldwide.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20">
      <div class="container">
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(value, index) in values"
            :key="value.title"
            class="text-center p-8 bg-card rounded-lg shadow-elegant animate-fade-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
              <component :is="value.icon" class="h-6 w-6" />
            </div>
            <h3 class="font-display text-xl font-semibold">{{ value.title }}</h3>
            <p class="mt-3 text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20 bg-secondary/30">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-up">
            <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
              Four Decades of Excellence
            </h2>
            <div class="mt-6 space-y-4 text-muted-foreground">
              <p>
                What started as a small family-run fabric shop has grown into one of the
                most respected textile suppliers in the industry. Our founder, Maria
                Vasquez, had a simple vision: to provide xisekelo with the finest fabrics
                available, at fair prices.
              </p>
              <p>
                Today, we carry over 500 varieties of fabric, from everyday cottons to
                rare silks and specialty textiles. We work directly with mills around the
                world to ensure consistent quality and ethical production practices.
              </p>
              <p>
                Whether you're creating a single garment or sourcing materials for a
                large-scale production, our team is here to help you succeed.
              </p>
            </div>
            <NuxtLink to="/products" class="inline-block mt-8">
              <Button variant="hero" size="lg">
                Explore Our Collection
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </NuxtLink>
          </div>
          <div class="aspect-square rounded-lg overflow-hidden shadow-elegant animate-fade-up" style="animation-delay: 100ms">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop"
              alt="Fabric rolls"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="container">
        <div class="bg-primary rounded-2xl p-12 text-center">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Start Your Project?
          </h2>
          <p class="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Browse our collection of premium fabrics or get in touch with our expert
            team for personalized recommendations.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/products">
              <Button
                variant="secondary"
                size="lg"
                class="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Shop Now
              </Button>
            </NuxtLink>
            <Button
              variant="outline"
              size="lg"
              class="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Award, Heart, Leaf } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description:
      'Every fabric in our collection is hand-selected and tested to meet the highest standards of durability, texture, and performance.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We partner with eco-conscious mills and prioritize organic, recycled, and responsibly-sourced materials.',
  },
  {
    icon: Heart,
    title: 'Expert Guidance',
    description:
      'Our team of fabric specialists provides personalized recommendations to help you find the perfect textile for your project.',
  },
];
</script>

