<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="mb-6">
        <NuxtLink to="/cart" class="flex items-center gap-2 text-primary hover:text-primary/80">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </NuxtLink>
      </div>

      <h1 class="font-display text-4xl font-bold text-foreground mb-2">Checkout</h1>
      <p class="text-muted-foreground mb-8">No account needed — pay by EFT and confirm on WhatsApp.</p>

      <div v-if="cart.cartItems.length === 0" class="bg-white rounded-lg p-8 shadow-sm text-center">
        <p class="text-gray-500 mb-4">Your cart is empty</p>
        <NuxtLink to="/products" class="text-primary hover:underline">Continue Shopping</NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="font-semibold text-foreground mb-4">Your details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium mb-2">Full name</label>
                <input v-model="formData.name" type="text" required class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">WhatsApp / phone</label>
                <input v-model="formData.phone" type="tel" required placeholder="e.g. 079 123 4567" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input v-model="formData.email" type="email" required class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium mb-2">Delivery address (optional)</label>
                <input v-model="formData.address" type="text" placeholder="Street address, Tembisa or area" class="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h2 class="font-semibold text-foreground mb-2">Pay by EFT</h2>
            <p class="text-sm text-muted-foreground mb-4">
              Transfer the total below, then send proof to our email or WhatsApp.
            </p>

            <dl class="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2 text-sm mb-4">
              <div class="flex justify-between"><dt class="text-muted-foreground">Bank</dt><dd class="font-medium">{{ config.public.bankName }}</dd></div>
              <div class="flex justify-between"><dt class="text-muted-foreground">Account holder</dt><dd class="font-medium">{{ config.public.bankAccountName }}</dd></div>
              <div class="flex justify-between items-center gap-2">
                <dt class="text-muted-foreground">Account no.</dt>
                <dd class="flex items-center gap-2">
                  <span class="font-mono font-semibold">{{ config.public.bankAccountNumber }}</span>
                  <button type="button" class="text-xs text-primary hover:underline" @click="copyAccountNumber">
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                </dd>
              </div>
              <div class="flex justify-between border-t border-primary/10 pt-2">
                <dt class="font-medium">Amount</dt>
                <dd class="font-bold text-primary text-lg">R{{ cart.total.toFixed(2) }}</dd>
              </div>
            </dl>

            <label class="flex items-start gap-3 cursor-pointer mb-4">
              <input v-model="formData.paymentAcknowledged" type="checkbox" class="mt-1 rounded text-primary" />
              <span class="text-sm">I will pay <strong>R{{ cart.total.toFixed(2) }}</strong> by EFT and send proof of payment.</span>
            </label>

            <button
              type="button"
              class="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 font-semibold disabled:opacity-50"
              :disabled="!isFormValid"
              @click="placeOrder"
            >
              Complete order — R{{ cart.total.toFixed(2) }}
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 class="font-semibold mb-4">Order summary</h2>
          <div class="space-y-3 mb-4">
            <div v-for="item in cart.cartItems" :key="item.id" class="flex gap-3 pb-3 border-b">
              <img :src="item.image_url || fallbackImage" :alt="item.name" class="w-14 h-14 object-contain bg-gray-50 rounded" />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm truncate">{{ item.name }}</p>
                <p class="text-xs text-muted-foreground">Qty {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-semibold">R{{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
          <div class="flex justify-between font-semibold border-t pt-3">
            <span>Total</span>
            <span>R{{ cart.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productImages } from '~/data/tlou-products'

const cart = useCart()
const config = useRuntimeConfig()
const { buildUrl } = useWhatsApp()
const fallbackImage = productImages.fallback

const formData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  paymentAcknowledged: false,
})

const copied = ref(false)

const isFormValid = computed(() =>
  formData.value.name &&
  formData.value.phone &&
  formData.value.email &&
  formData.value.paymentAcknowledged &&
  cart.cartItems.length > 0
)

function buildOrderMessage(orderId) {
  const lines = cart.cartItems.map(
    (i) => `• ${i.quantity}x ${i.name} — R${(i.price * i.quantity).toFixed(2)}`
  )
  return [
    `Hi T.L.O.U. Clothing,`,
    ``,
    `New order: ${orderId}`,
    ``,
    `Name: ${formData.value.name}`,
    `Phone: ${formData.value.phone}`,
    `Email: ${formData.value.email}`,
    formData.value.address ? `Address: ${formData.value.address}` : '',
    ``,
    `Items:`,
    ...lines,
    ``,
    `Total: R${cart.total.toFixed(2)}`,
    ``,
    `I will pay by EFT and send proof of payment. Please confirm on WhatsApp.`,
  ].filter(Boolean).join('\n')
}

async function copyAccountNumber() {
  if (!process.client) return
  try {
    await navigator.clipboard.writeText(config.public.bankAccountNumber)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch { /* ignore */ }
}

function placeOrder() {
  if (!isFormValid.value) return

  const orderId = `TLU-${Date.now().toString().slice(-8)}`
  const total = cart.total.toFixed(2)
  const orderMessage = buildOrderMessage(orderId)
  const whatsappUrl = buildUrl(orderMessage)

  if (process.client) {
    sessionStorage.setItem('tlou_last_order', JSON.stringify({
      orderId,
      total,
      name: formData.value.name,
      whatsappUrl,
      orderMessage,
    }))
  }

  cart.clearCart()
  navigateTo(`/payment-success?orderId=${encodeURIComponent(orderId)}&total=${encodeURIComponent(total)}`)
}

onMounted(() => {
  if (process.client && cart.cartItems.length === 0) {
    navigateTo('/cart')
  }
})
</script>
