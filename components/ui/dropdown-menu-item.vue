<template>
  <div
    :class="cn('px-2 py-1.5 text-sm cursor-pointer hover:bg-accent', $attrs.class)"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

defineEmits<{
  click: [];
}>();
</script>

