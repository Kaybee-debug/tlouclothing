import type { Product, CartItem } from '~/types';

export const useCart = () => {
  const items = useState<CartItem[]>('cart.items', () => {
    if (process.client) {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  watch(items, (newItems) => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
  }, { deep: true });

  const addToCart = (product: Product, quantity = 1) => {
    const existing = items.value.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({
        id: crypto.randomUUID(),
        product,
        quantity,
      });
    }
    
    // Show toast notification
    if (process.client) {
      // We'll use sonner for toast notifications
      const { toast } = useToast();
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (productId: string) => {
    items.value = items.value.filter(item => item.product.id !== productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() => 
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  return {
    items: readonly(items),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};

