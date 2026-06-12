<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <h1 class="font-display text-4xl font-bold text-center mb-2">Contact Us</h1>
      <p class="text-center text-muted-foreground mb-10">Visit the stall, call, WhatsApp or email — we'd love to hear from you.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="font-semibold text-lg mb-4 text-primary">Business Details</h2>
          <dl class="space-y-3 text-gray-700 text-sm">
            <div>
              <dt class="font-medium text-foreground">Trading name</dt>
              <dd>T.L.O.U. Clothing (The Last Of Us)</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">Address</dt>
              <dd>{{ config.public.businessAddress }}</dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">Phone / WhatsApp</dt>
              <dd>
                <a :href="`tel:${config.public.businessPhoneTel}`" class="text-primary hover:underline">{{ config.public.businessPhone }}</a>
                <span class="text-muted-foreground"> — tap below to enquire on WhatsApp</span>
              </dd>
            </div>
            <div>
              <dt class="font-medium text-foreground">Email</dt>
              <dd>
                <a :href="`mailto:${config.public.businessEmail}`" class="text-primary hover:underline lowercase">{{ config.public.businessEmail }}</a>
              </dd>
            </div>
          </dl>
          <a
            :href="whatsappEnquireUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex w-full justify-center items-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a]"
          >
            Enquire on WhatsApp — {{ config.public.businessPhone }}
          </a>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="font-semibold text-lg mb-4 text-primary">Social Media</h2>
          <ul class="space-y-4 text-sm text-gray-700">
            <li><span class="font-medium">Instagram:</span> {{ config.public.instagram }}</li>
            <li><span class="font-medium">Facebook:</span> {{ config.public.facebook }}</li>
            <li><span class="font-medium">TikTok:</span> {{ config.public.tiktok }}</li>
          </ul>
          <h2 class="font-semibold text-lg mt-8 mb-3">Stall Hours</h2>
          <p class="text-sm text-muted-foreground">Open daily for walk-in customers (hours may vary — WhatsApp ahead to confirm stock).</p>
        </div>
      </div>

      <div class="bg-white rounded-lg p-8 shadow-sm">
        <h2 class="font-semibold text-lg mb-4">Send a Message</h2>
        <p class="text-sm text-muted-foreground mb-6">Demo form — messages are not sent to a server. Use WhatsApp or email for real enquiries.</p>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="block mb-2 text-sm font-medium">Name</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium">Email</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium">Message</label>
            <textarea v-model="form.message" rows="4" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
            Submit (Demo)
          </button>
          <p v-if="submitted" class="text-green-700 text-sm">Thank you! For a real order, please use WhatsApp.</p>
        </form>
      </div>

      <p class="text-center text-xs text-muted-foreground mt-8">
        Developed by Kaybee Debug Solutions
      </p>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const submitted = ref(false)
const form = reactive({ name: '', email: '', message: '' })

const { enquireUrl: whatsappEnquireUrl } = useWhatsApp()

const onSubmit = () => {
  submitted.value = true
}
</script>
