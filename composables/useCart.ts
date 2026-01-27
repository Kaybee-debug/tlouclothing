import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const currentUserId = ref<string | null>(null)

  // Get cart key for current user
  function getCartKey(userId?: string | null) {
    if (!userId && process.client) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          return `cart_${user.id}`
        } catch (e) {
          return 'cart_guest'
        }
      }
      return 'cart_guest'
    }
    return userId ? `cart_${userId}` : 'cart_guest'
  }

  // Load cart from localStorage for specific user
  function loadCart(userId?: string | null) {
    if (process.client) {
      const cartKey = getCartKey(userId)
      const saved = localStorage.getItem(cartKey)
      
      // If user changed, clear old cart
      if (userId && currentUserId.value && currentUserId.value !== userId) {
        const oldCartKey = getCartKey(currentUserId.value)
        localStorage.removeItem(oldCartKey)
      }
      
      currentUserId.value = userId || null
      
      if (saved) {
        try {
          cartItems.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading cart:', e)
          cartItems.value = []
        }
      } else {
        cartItems.value = []
      }
    }
  }

  // Save cart to localStorage for current user
  function saveCart() {
    if (process.client) {
      const cartKey = getCartKey(currentUserId.value)
      if (cartItems.value.length > 0) {
        localStorage.setItem(cartKey, JSON.stringify(cartItems.value))
      } else {
        localStorage.removeItem(cartKey)
      }
    }
  }

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        ...product,
        quantity
      })
    }
    
    saveCart()
    console.log('Cart updated:', cartItems.value)
  }

  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      saveCart()
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveCart()
    }
  }
  
  const clearCart = () => {
    cartItems.value = []
    if (process.client) {
      const cartKey = getCartKey(currentUserId.value)
      localStorage.removeItem(cartKey)
    }
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const shipping = computed(() => {
    return subtotal.value >= 100 ? 0 : 99.99
  })

  const total = computed(() => {
    return subtotal.value + shipping.value
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    totalItems,
    subtotal,
    shipping,
    total
  }
})

// Alias for consistency
export const useCart = () => {
  const store = useCartStore()
  
  // Load cart on first use if not loaded
  if (process.client && store.cartItems.length === 0) {
    store.loadCart()
  }
  
  return store
}