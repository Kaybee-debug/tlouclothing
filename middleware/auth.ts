export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated.value) {
    // Redirect to auth page with return URL
    return navigateTo(`/auth?from=${encodeURIComponent(to.fullPath)}`);
  }
});

