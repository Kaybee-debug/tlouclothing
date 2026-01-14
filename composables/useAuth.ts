import type { User } from '~/types';

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => {
    if (process.client) {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Demo users for MVP
  const demoUsers: (User & { password: string })[] = [
    { id: '1', name: 'Admin User', email: 'admin@fabric.com', password: 'admin123', role: 'admin' },
    { id: '2', name: 'John Customer', email: 'john@example.com', password: 'customer123', role: 'customer' },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - will be replaced with Supabase
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      user.value = userData;
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Demo registration - will be replaced with Supabase
    const exists = demoUsers.find(u => u.email === email);
    if (exists) return false;
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'customer',
    };
    user.value = newUser;
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    return true;
  };

  const logout = () => {
    user.value = null;
    if (process.client) {
      localStorage.removeItem('user');
    }
  };

  return {
    user: readonly(user),
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };
};

