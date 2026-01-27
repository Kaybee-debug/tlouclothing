<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="md:col-span-2">
          <h3 class="font-display text-2xl font-bold mb-4 text-white">Artisan Fabrics</h3>
          <p class="text-gray-300 mb-6 max-w-md">
            Premium quality fabrics for designers, crafters, and manufacturers. Sustainably sourced materials with exceptional craftsmanship since 1985.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-4 text-white">Quick Links</h4>
          <ul class="space-y-2 text-gray-300">
            <li><NuxtLink to="/products" class="hover:text-white">Shop All</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white">About Us</NuxtLink></li>
            <li><NuxtLink to="/cart" class="hover:text-white">Shopping Cart</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold mb-4 text-white">Contact</h4>
          <div class="space-y-2 text-gray-300">
            <p>hello@artisanfabrics.com</p>
            <p>+1 (555) 123-4567</p>
            <p>123 Textile Lane<br>Fabric City, FC 12345</p>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p>&copy; 2024 Artisan Fabrics. All rights reserved.</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy" class="hover:text-white">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>

