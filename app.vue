<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Initialize auth and cart on app load
const auth = useAuth()
const cart = useCart()

onMounted(() => {
  if (process.client) {
    auth.initAuth()
    // Cart will be loaded by initAuth based on logged-in user
  }
})
</script>


