<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { checkAuth } = useAuth();

onMounted(() => {
  checkAuth();
});
</script>
