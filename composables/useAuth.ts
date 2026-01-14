import type { User } from '~/types';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const user = useState<User | null>('auth.user', () => {
    if (process.client) {
      const saved = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (saved && token) {
        return JSON.parse(saved);
      }
    }
    return null;
  });

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!process.client) return false;
    
    // Validate inputs
    if (!email || !password) {
      console.error('❌ Login error: Email and password are required');
      console.log('Email received:', email);
      console.log('Password received:', password ? '***' : 'empty');
      return false;
    }
    
    try {
      const url = `${apiBase}/api/auth/login`;
      console.log('🔐 Login request to:', url);
      console.log('📧 Email:', email);
      console.log('🔑 Password length:', password.length);
      
      const requestBody = { email: email.trim(), password: password.trim() };
      console.log('📦 Request body:', { email: requestBody.email, password: '***' });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Login error: Expected JSON but got:', text.substring(0, 200));
        return false;
      }

      const data = await response.json();
      console.log('✅ Login response:', data);

      if (!response.ok) {
        console.error('❌ Login failed:', data.message || 'Unknown error');
        return false;
      }

      user.value = data.user;
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
      console.log('✅ Login successful!');
      return true;
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!process.client) return false;
    
    try {
      const url = `${apiBase}/api/auth/register`;
      console.log('Register request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Registration error: Expected JSON but got:', text.substring(0, 100));
        return false;
      }

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      user.value = data.user;
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('🔓 Logout function called');
    user.value = null;
    if (process.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log('✅ User data cleared from localStorage');
    }
  };

  // Check if user is logged in on app load
  const checkAuth = async () => {
    if (process.client) {
      const token = localStorage.getItem('token');
      if (token && !user.value) {
        try {
          const response = await fetch(`${apiBase}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            user.value = userData;
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
        }
      }
    }
  };

  return {
    user: readonly(user),
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    checkAuth,
  };
};

