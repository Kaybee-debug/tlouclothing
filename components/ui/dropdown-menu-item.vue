<template>
  <div
    :class="cn('px-2 py-1.5 text-sm cursor-pointer hover:bg-accent transition-colors', $attrs.class)"
    @click.stop="handleClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

const emit = defineEmits<{
  click: [event?: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  console.log('DropdownMenuItem clicked');
  emit('click', event);
};
</script>
