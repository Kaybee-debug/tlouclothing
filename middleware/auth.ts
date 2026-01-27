export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  
  // Initialize auth if not already initialized
  if (process.client && !auth.user) {
    auth.initAuth()
  }
  
  if (!auth.isAuthenticated) {
    return navigateTo('/auth')
  }
})


