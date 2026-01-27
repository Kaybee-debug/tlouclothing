<template>
  <header class="border-b">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
      <NuxtLink to="/" class="text-2xl font-bold">
        Artisan Fabrics
      </NuxtLink>
      
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <NuxtLink to="/products" class="hover:text-primary">Shop</NuxtLink>
        <NuxtLink to="/about" class="hover:text-primary">About</NuxtLink>
        <NuxtLink to="/cart" class="hover:text-primary relative">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
          </svg>
          <span v-if="cart.totalItems > 0" class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">{{ cart.totalItems }}</span>
        </NuxtLink>
        
        <!-- User menu dropdown -->
        <ClientOnly>
          <div v-if="auth.isAuthenticated" class="relative">
            <button 
              @click.stop="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 hover:text-primary focus:outline-none cursor-pointer"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="showUserMenu"
              v-click-outside="() => showUserMenu = false"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <!-- User info -->
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-semibold text-gray-900">{{ auth.user?.name }}</p>
                <p class="text-xs text-gray-500">{{ auth.user?.email }}</p>
                <span v-if="auth.isAdmin" class="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                  Admin
                </span>
              </div>
              
              <!-- Menu items -->
              <div class="py-1">
                <NuxtLink 
                  v-if="auth.isAdmin"
                  to="/admin" 
                  @click.stop="showUserMenu = false"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Admin Dashboard
                  </div>
                </NuxtLink>
                
                <NuxtLink 
                  to="/orders" 
                  @click.stop="showUserMenu = false"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    My Orders
                  </div>
                </NuxtLink>
                
                <button 
                  @click.stop="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Sign Out
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Show sign in if not logged in -->
          <NuxtLink v-else to="/auth" class="hover:text-primary">
            Sign In
          </NuxtLink>
          
          <template #fallback>
            <NuxtLink to="/auth" class="hover:text-primary">
              Sign In
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
    </nav>
  </header>
</template>

<script setup>
const auth = useAuth()
const cart = useCart()
const showUserMenu = ref(false)

onMounted(() => {
  // Initialize auth on mount
  if (process.client) {
    auth.initAuth()
  }
})

const handleLogout = () => {
  // Cart is cleared in auth.logout()
  auth.logout()
  showUserMenu.value = false
  setTimeout(() => {
    window.location.href = '/'
  }, 100)
}

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

