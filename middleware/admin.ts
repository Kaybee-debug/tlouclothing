export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  
  // Initialize auth if needed
  if (process.client && !auth.user) {
    auth.initAuth()
  }
  
  if (!auth.isAuthenticated) {
    return navigateTo('/auth')
  }
  
  if (!auth.isAdmin) {
    return navigateTo('/')
  }
})


