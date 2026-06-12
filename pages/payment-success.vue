<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <div class="bg-white rounded-lg p-8 shadow-sm text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="font-display text-4xl font-bold text-foreground mb-4">Order received!</h1>
        <p class="text-lg text-muted-foreground mb-6">
          Pay by EFT, then tap the button below to send your order on WhatsApp.
        </p>

        <div class="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h2 class="font-semibold text-foreground mb-2">Reference: {{ orderId }}</h2>
          <p v-if="orderTotal" class="text-sm text-muted-foreground mb-2">
            Amount due: <strong class="text-foreground">R{{ orderTotal }}</strong>
          </p>
          <p class="text-sm text-amber-700 font-medium mb-4">Status: Pending payment</p>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Bank</dt><dd>{{ config.public.bankName }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Account</dt><dd>{{ config.public.bankAccountName }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Account no.</dt><dd class="font-mono">{{ config.public.bankAccountNumber }}</dd></div>
          </dl>
          <p class="text-xs text-muted-foreground mt-4">Use reference <strong>{{ orderId }}</strong> when you pay.</p>
        </div>

        <div class="flex flex-col gap-3 justify-center mb-6 max-w-md mx-auto">
          <a
            v-if="orderWhatsappUrl"
            :href="orderWhatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Open WhatsApp — send your order
          </a>
          <p class="text-xs text-muted-foreground">
            Opens WhatsApp with your order details ready to send to T.L.O.U. Clothing.
          </p>
          <a
            :href="proofEmailHref"
            class="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 font-medium text-sm"
          >
            Email proof of payment instead
          </a>
        </div>

        <NuxtLink to="/products">
          <button type="button" class="text-primary hover:underline font-medium">Continue shopping</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { buildUrl } = useWhatsApp()

const orderId = computed(() => String(route.query.orderId || '—'))
const orderTotal = computed(() => String(route.query.total || ''))

const orderWhatsappUrl = ref('')

onMounted(() => {
  if (!process.client) return
  try {
    const saved = sessionStorage.getItem('tlou_last_order')
    if (saved) {
      const data = JSON.parse(saved)
      if (data.orderId === orderId.value && data.whatsappUrl) {
        orderWhatsappUrl.value = data.whatsappUrl
        return
      }
    }
  } catch { /* ignore */ }
  orderWhatsappUrl.value = buildUrl(
    `Hi T.L.O.U. Clothing, I placed order ${orderId.value}. Total R${orderTotal.value}. I will pay by EFT.`
  )
})

const proofEmailHref = computed(() => {
  const subject = encodeURIComponent(`Proof of payment — ${orderId.value}`)
  const body = encodeURIComponent(
    `Hi T.L.O.U. Clothing,\n\nProof of payment attached for order ${orderId.value}.\n\nThank you.`
  )
  return `mailto:${config.public.businessEmail}?subject=${subject}&body=${body}`
})
</script>
