<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-sm border-r flex flex-col fixed left-0 top-0 bottom-0">
      <div class="p-6 border-b">
        <h1 class="font-display text-xl font-bold text-primary">T.L.O.U.</h1>
        <p class="text-xs text-muted-foreground mt-0.5">Clothing Admin</p>
      </div>
      
      <nav class="px-4 py-4 space-y-2 flex-1 overflow-y-auto">
        <NuxtLink to="/admin" class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-gray-100 transition-colors" :class="{ 'bg-primary/10 text-primary': $route.path === '/admin' }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7"></path>
          </svg>
          Dashboard
        </NuxtLink>
        
        <NuxtLink to="/admin/products" class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-gray-100 transition-colors" :class="{ 'bg-primary/10 text-primary': $route.path === '/admin/products' }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          Products
        </NuxtLink>
        
        <NuxtLink to="/admin/orders" class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-gray-100 transition-colors" :class="{ 'bg-primary/10 text-primary': $route.path === '/admin/orders' }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Orders
        </NuxtLink>
        
        <NuxtLink to="/" class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-gray-100 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          View Store
        </NuxtLink>
        
        <button 
          @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-gray-100 w-full text-left transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </nav>
      
      <div class="p-4 border-t">
        <div class="bg-gray-100 rounded-lg p-3">
          <p class="text-sm text-muted-foreground">Logged in as</p>
          <p class="font-medium text-foreground">{{ auth.user?.name || 'Admin User' }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <slot />
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()

const handleLogout = () => {
  auth.logout()
  window.location.href = '/'
}
</script>