<template>
  <input
    :type="type"
    :value="modelValue"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      $attrs.class
    )"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

interface Props {
  type?: string;
  modelValue?: string | number;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
});

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

