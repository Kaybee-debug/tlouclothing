<template>
  <div class="min-h-screen flex flex-col">
    <LayoutNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
// Layout can be empty or have shared logic
</script>


