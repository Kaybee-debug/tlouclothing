export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated.value) {
    return navigateTo('/auth');
  }
  
  if (!isAdmin.value) {
    return navigateTo('/');
  }
});

