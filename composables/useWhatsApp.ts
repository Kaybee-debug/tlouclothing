/**
 * WhatsApp links for +27 79 943 4968 (27799434968).
 * Uses api.whatsapp.com — works when wa.me is blocked on some networks/DNS.
 */
export const useWhatsApp = () => {
  const config = useRuntimeConfig()

  const phone = config.public.whatsapp || '27799434968'

  const buildUrl = (message?: string) => {
    const base = `https://api.whatsapp.com/send?phone=${phone}`
    if (!message) return base
    return `${base}&text=${encodeURIComponent(message)}`
  }

  const enquireUrl = computed(() =>
    buildUrl('Hi T.L.O.U. Clothing, I would like to enquire about your products.')
  )

  const orderUrl = computed(() =>
    buildUrl('Hi, I would like to order from T.L.O.U. Clothing.')
  )

  const orderProductUrl = (productName: string, qty: number, total: string) =>
    buildUrl(
      `Hi T.L.O.U., I'd like to order: ${productName} (qty ${qty}) — R${total}`
    )

  return {
    phone,
    displayPhone: config.public.businessPhone || '+27 79 943 4968',
    telUrl: computed(() => `tel:${config.public.businessPhoneTel || '+27799434968'}`),
    enquireUrl,
    orderUrl,
    orderProductUrl,
    buildUrl,
  }
}
