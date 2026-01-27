<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[60vh] flex items-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="/hero-background.jpg"
          alt="Fabric workshop"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#2b1b12]/80 via-[#3a2418]/70 to-[#1f140e]/80" />
      </div>

      <div class="container mx-auto px-4 relative z-10 max-w-7xl">
        <div class="max-w-2xl animate-fade-up ml-6 md:ml-12">
          <span class="inline-block px-4 py-1.5 text-sm font-medium text-white bg-orange-500/90 rounded-full mb-6">
            Fabric workshop
          </span>

          <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Our Story
          </h1>

          <p class="mt-6 text-lg text-white/80 max-w-lg">
            Since 1985, Artisan Fabrics has been the trusted source for premium textiles, serving designers, craftspeople, and manufacturers worldwide.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-secondary/50">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="grid grid-cols-3 gap-8">
          <div class="bg-white rounded-lg p-6 shadow-sm text-center">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-display font-semibold text-foreground mb-4">Quality First</h3>
            <p class="text-sm text-muted-foreground">
              Every fabric in our collection is hand-selected and tested to meet the highest standards of durability, texture, and performance.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm text-center">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="font-display font-semibold text-foreground mb-4">Sustainability</h3>
            <p class="text-sm text-muted-foreground">
              We partner with eco-conscious mills and prioritize organic, recycled, and responsibly-sourced materials.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm text-center">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="font-display font-semibold text-foreground mb-4">Expert Guidance</h3>
            <p class="text-sm text-muted-foreground">
              Our team of fabric specialists provides personalized recommendations to help you find the perfect textile for your project.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-4xl mx-auto">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Four Decades of Excellence
          </h2>
          
          <div class="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              What started as a small family-run fabric shop has grown into one of the most respected textile suppliers in the industry. Our founder, Maria Vasquez, had a simple vision: to provide artisans with the finest fabrics available, at fair prices.
            </p>
            
            <p>
              Today, we carry over 500 varieties of fabric, from everyday cottons to rare silks and specialty textiles. We work directly with mills around the world to ensure consistent quality and ethical production practices.
            </p>
            
            <p>
              Whether you're creating a single garment or sourcing materials for a large-scale production, our team is here to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-soft">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Collection
            </h2>
            <p class="text-muted-foreground mb-8">
              Ready to Start Your Project?
            </p>
            <p class="text-muted-foreground mb-8">
              Browse our collection of premium fabrics or get in touch with our expert team for personalized recommendations.
            </p>
            
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/products">
                <button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium">
                  Shop Now
                </button>
              </NuxtLink>
              <NuxtLink to="/contact">
                <button class="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 font-medium">
                  Contact Us
                </button>
              </NuxtLink>
            </div>
          </div>
          
          <div class="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop"
              alt="Fabric rolls"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// About page
</script>