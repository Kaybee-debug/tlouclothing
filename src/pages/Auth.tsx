import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      if (isLogin) {
        success = await login(form.email, form.password);
        if (!success) {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Try admin@fabric.com / admin123",
            variant: "destructive",
          });
        }
      } else {
        success = await register(form.name, form.email, form.password);
        if (!success) {
          toast({
            title: "Registration failed",
            description: "This email is already registered.",
            variant: "destructive",
          });
        }
      }

      if (success) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin ? "You've been logged in." : "Welcome to Artisan Fabrics!",
        });
        navigate(from);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-up">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Card */}
          <div className="bg-card rounded-xl shadow-elegant p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {isLogin
                  ? 'Sign in to your account to continue'
                  : 'Join us and explore premium fabrics'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-2">
                Demo credentials:
              </p>
              <div className="text-xs text-center text-muted-foreground space-y-1">
                <p>Admin: admin@fabric.com / admin123</p>
                <p>Customer: john@example.com / customer123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
