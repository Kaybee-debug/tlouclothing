<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/50 bg-white backdrop-white supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="font-display text-2xl font-semibold text-primary">
          Xisekelo Safety
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="flex items-center gap-8">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Shop
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          About
        </NuxtLink>
      </nav>

      <!-- Desktop Actions -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/cart" class="relative">
          <Button variant="ghost" size="icon">
            <ShoppingBag class="h-5 w-5" />
          </Button>
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
          >
            {{ totalItems }}
          </span>
        </NuxtLink>

        <DropdownMenu v-if="isAuthenticated">
          <template #trigger>
            <Button variant="ghost" size="icon">
              <User class="h-5 w-5" />
            </Button>
          </template>
          <div class="px-2 py-1.5 min-w-[200px]">
            <p class="text-sm font-medium text-foreground">{{ user?.name || 'User' }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ user?.email }}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem v-if="isAdmin" @click="() => navigateTo('/admin')">
            <LayoutDashboard class="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/orders')">
            <ShoppingBag class="mr-2 h-4 w-4" />
            My Orders
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenu>

        <NuxtLink v-else to="/auth">
          <Button variant="default" size="sm">
            Sign In
          </Button>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <Button
        variant="ghost"
        size="icon"
        class="md:hidden ml-4"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </Button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="md:hidden border-t border-border animate-fade-in">
        <nav class="container py-4 flex flex-col gap-4">
          <NuxtLink
            to="/"
            class="text-sm font-medium py-2"
            @click="isOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="text-sm font-medium py-2"
            @click="isOpen = false"
          >
            Shop
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-sm font-medium py-2"
            @click="isOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/cart"
            class="text-sm font-medium py-2 flex items-center gap-2"
            @click="isOpen = false"
          >
            <ShoppingBag class="h-4 w-4" />
            Cart ({{ totalItems }})
          </NuxtLink>
          <template v-if="isAuthenticated">
            <NuxtLink
              to="/orders"
              class="text-sm font-medium py-2 flex items-center gap-2"
              @click="isOpen = false"
            >
              <ShoppingBag class="h-4 w-4" />
              My Orders
            </NuxtLink>
            <NuxtLink
              v-if="isAdmin"
              to="/admin"
              class="text-sm font-medium py-2"
              @click="isOpen = false"
            >
              Admin Dashboard
            </NuxtLink>
            <Button
              variant="outline"
              class="mt-2"
              @click="handleLogout(); isOpen = false"
            >
              Logout
            </Button>
          </template>
          <NuxtLink v-else to="/auth" @click="isOpen = false">
            <Button variant="default" class="w-full mt-2">
              Sign In
            </Button>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import DropdownMenu from '~/components/ui/dropdown-menu.vue';
import DropdownMenuItem from '~/components/ui/dropdown-menu-item.vue';
import DropdownMenuSeparator from '~/components/ui/dropdown-menu-separator.vue';

const { totalItems } = useCart();
const { user, isAuthenticated, isAdmin, logout } = useAuth();
const isOpen = ref(false);

const handleLogout = () => {
  console.log('🔓 Logout button clicked');
  console.log('Current user:', user.value);
  
  logout();
  
  console.log('User after logout:', user.value);
  console.log('Navigating to home...');
  
  // Use window.location for reliable navigation
  setTimeout(() => {
    window.location.href = '/';
  }, 200);
};
</script>

