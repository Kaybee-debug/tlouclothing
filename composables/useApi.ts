export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${apiBase}${endpoint}`
    let response: Response
    try {
      response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
    } catch {
      throw new Error('Cannot reach the server. Start the backend with: npm run dev:backend')
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`)
    }

    return data
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
    async sendVerificationCode(email: string) {
      return request('/api/auth/send-verification-code', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
    },
    async register(name: string, email: string, password: string, code: string) {
      return request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, code }),
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


