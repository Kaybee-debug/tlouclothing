<template>
  <footer class="border-t border-border bg-secondary/30">
    <div class="container py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <NuxtLink to="/" class="inline-block">
            <span class="font-display text-2xl font-semibold text-primary">
              Xiselo Safety
            </span>
          </NuxtLink>
          <p class="mt-4 text-muted-foreground max-w-md">
            Premium quality fabrics for designers, crafters, and manufacturers. 
            Sustainably sourced materials with exceptional craftsmanship since 1985.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/products" class="text-muted-foreground hover:text-primary transition-colors">
                Shop All
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="text-muted-foreground hover:text-primary transition-colors">
                Shopping Cart
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-semibold text-foreground mb-4">Contact</h4>
          <ul class="space-y-2 text-muted-foreground">
            <li>hello@xiselosafety.co.za</li>
            <li>+27 671234567</li>
            <li>123 Polokwane<br />Limpopo</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          © 2025 Xiselo Safety. All rights reserved.
        </p>
        <div class="flex gap-6 text-sm text-muted-foreground">
          <NuxtLink to="#" class="hover:text-primary transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="#" class="hover:text-primary transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

