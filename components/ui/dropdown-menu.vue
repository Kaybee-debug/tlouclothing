<template>
  <div class="relative inline-block text-left">
    <div @click.stop="toggle" data-dropdown-trigger>
      <slot name="trigger" />
    </div>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        v-click-outside="close"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        @click.stop
      >
        <div class="py-1" @click.stop>
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      // Don't close if clicking inside the dropdown
      if (el.contains(event.target)) {
        return;
      }
      // Don't close if clicking the trigger button
      const trigger = el.parentElement?.querySelector('[data-dropdown-trigger]');
      if (trigger && (trigger === event.target || trigger.contains(event.target as Node))) {
        return;
      }
      binding.value();
    };
    // Use a small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent);
    }, 100);
  },
  unmounted(el: any) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  },
};
</script>

