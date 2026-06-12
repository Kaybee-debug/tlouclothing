import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loginError = ref<string | null>(null)
  const registerError = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(email: string, password: string) {
    return new Promise(async (resolve) => {
      loginError.value = null
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
          loginError.value = 'Invalid email or password'
          resolve(false)
        }
      } catch (error) {
        console.error('Login error:', error)
        loginError.value = error instanceof Error ? error.message : 'Login failed'
        resolve(false)
      }
    })
  }

  async function sendVerificationCode(email: string) {
    try {
      registerError.value = null
      const api = useApi()
      return await api.sendVerificationCode(email)
    } catch (error) {
      registerError.value = error instanceof Error ? error.message : 'Could not send verification code'
      throw error
    }
  }

  async function register(name: string, email: string, password: string, code: string) {
    return new Promise(async (resolve) => {
      registerError.value = null
      try {
        const api = useApi()
        const response = await api.register(name, email, password, code)

        if (response.token && response.user) {
          token.value = response.token
          user.value = response.user

          if (process.client) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))

            const cart = useCart()
            cart.loadCart(response.user.id)
          }

          resolve(true)
        } else {
          registerError.value = 'Registration failed'
          resolve(false)
        }
      } catch (error) {
        console.error('Registration error:', error)
        registerError.value = error instanceof Error ? error.message : 'Registration failed'
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
    loginError,
    registerError,
    sendVerificationCode,
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

