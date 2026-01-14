<template>
  <div class="min-h-screen bg-background">
    <!-- Mobile Header -->
    <header class="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-border bg-background">
      <NuxtLink to="/admin" class="font-display text-xl font-semibold text-primary">
        Admin Panel
      </NuxtLink>
      <Button
        variant="ghost"
        size="icon"
        @click="sidebarOpen = !sidebarOpen"
      >
        <X v-if="sidebarOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </Button>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 lg:static',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="flex flex-col h-full">
          <!-- Logo -->
          <div class="p-6 border-b border-sidebar-border hidden lg:block">
            <NuxtLink to="/admin" class="font-display text-xl font-semibold text-sidebar-primary">
              Admin Panel
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 p-4 space-y-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.href"
              :to="item.href"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === item.href
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'"
              @click="sidebarOpen = false"
            >
              <component :is="item.icon" class="h-5 w-5" />
              {{ item.label }}
            </NuxtLink>
          </nav>

          <!-- User & Actions -->
          <div class="p-4 border-t border-sidebar-border space-y-2">
            <NuxtLink
              to="/"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <Home class="h-5 w-5" />
              View Store
            </NuxtLink>
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <LogOut class="h-5 w-5" />
              Logout
            </button>
            <div class="px-4 py-2 text-xs text-muted-foreground">
              Logged in as {{ user?.name }}
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-charcoal/50 z-30 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 min-h-screen">
        <div class="p-6 lg:p-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X, Home } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import { useAuth } from '~/composables/useAuth';
import { cn } from '~/lib/utils';

const route = useRoute();
const { user, logout } = useAuth();
const sidebarOpen = ref(false);

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
];

const handleLogout = () => {
  logout();
  navigateTo('/');
};
</script>

