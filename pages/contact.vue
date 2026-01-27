<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <h1 class="font-display text-4xl font-bold text-foreground mb-8 text-center">Contact Us</h1>
      
      <div class="bg-white rounded-lg p-8 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 class="font-semibold text-lg mb-4">Get in Touch</h2>
            <div class="space-y-3 text-gray-600">
              <p><strong>Email:</strong> hello@artisanfabrics.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong><br>123 Textile Lane<br>Fabric City, FC 12345</p>
            </div>
          </div>
          
          <div>
            <h2 class="font-semibold text-lg mb-4">Business Hours</h2>
            <div class="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div class="border-t pt-8">
          <h2 class="font-semibold text-lg mb-4">Send us a Message</h2>
          <form class="space-y-4">
            <div>
              <label class="block mb-2">Name</label>
              <input type="text" class="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block mb-2">Email</label>
              <input type="email" class="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="block mb-2">Message</label>
              <textarea rows="4" class="w-full px-4 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Contact page
</script>
