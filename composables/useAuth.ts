import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(email: string, password: string) {
    return new Promise(async (resolve) => {
      try {
        const api = useApi()
        const response = await api.login(email, password)
        
        if (response.token && response.user) {
          token.value = response.token
          user.value = response.user
          
          if (process.client) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            
            // Load user-specific cart after login
            const cart = useCart()
            cart.loadCart(response.user.id)
          }
          
          resolve(true)
        } else {
          resolve(false)
        }
      } catch (error) {
        console.error('Login error:', error)
        resolve(false)
      }
    })
  }

  async function register(name: string, email: string, password: string) {
    return new Promise(async (resolve) => {
      try {
        const api = useApi()
        const response = await api.register(name, email, password)
        
        if (response.token && response.user) {
          token.value = response.token
          user.value = response.user
          
          if (process.client) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            
            // Load user-specific cart after registration
            const cart = useCart()
            cart.loadCart(response.user.id)
          }
          
          resolve(true)
        } else {
          resolve(false)
        }
      } catch (error) {
        console.error('Registration error:', error)
        resolve(false)
      }
    })
  }

  function logout() {
    user.value = null
    token.value = null
    
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }

  function initAuth() {
    if (process.client) {
      const saved = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')
      
      if (saved && savedToken) {
        try {
          const parsedUser = JSON.parse(saved)
          user.value = parsedUser
          token.value = savedToken
          
          // Load user-specific cart
          const cart = useCart()
          cart.loadCart(parsedUser.id)
        } catch (e) {
          console.error('Error parsing saved user:', e)
        }
      } else {
        // No user logged in, load guest cart
        const cart = useCart()
        cart.loadCart(null)
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    initAuth,
  }
})

// Alias for consistency - initialize on first use
export const useAuth = () => {
  const store = useAuthStore()
  
  if (process.client && !store.user) {
    store.initAuth()
  }
  
  return store
}

