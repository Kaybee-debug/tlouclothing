export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${apiBase}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  return {
    baseURL: apiBase,
    request,
    // Auth endpoints
    async login(email: string, password: string) {
      return request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
    },
    async register(name: string, email: string, password: string) {
      return request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })
    },
    async getMe(token: string) {
      return request('/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    // Product endpoints
    async getProducts() {
      return request('/api/products')
    },
    async getProduct(id: string) {
      return request(`/api/products/${id}`)
    },
  }
}


