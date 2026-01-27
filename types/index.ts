export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image_url: string
  category?: string
  created_at?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'paid' | 'failed'
  created_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product?: Product
}


