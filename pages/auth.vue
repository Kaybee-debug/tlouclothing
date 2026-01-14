<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md animate-fade-up">
      <!-- Back Link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Home
      </NuxtLink>

      <!-- Card -->
      <div class="bg-card rounded-xl shadow-elegant p-8">
        <div class="text-center mb-8">
          <h1 class="font-display text-3xl font-bold text-foreground">
            {{ isLogin ? 'Welcome Back' : 'Create Account' }}
          </h1>
          <p class="mt-2 text-muted-foreground">
            {{ isLogin ? 'Sign in to your account' : 'Join us to start shopping' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div v-if="!isLogin" class="mb-4">
            <Label for="name">Full Name</Label>
            <Input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div class="mb-4">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="mb-6">
            <Label for="password">Password</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            class="w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account' }}
          </Button>
        </form>

        <div class="mt-6 text-center">
          <button
            type="button"
            class="text-sm text-muted-foreground hover:text-primary transition-colors"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff, ArrowLeft } from 'lucide-vue-next';
import Button from '~/components/ui/button.vue';
import Input from '~/components/ui/input.vue';
import Label from '~/components/ui/label.vue';
import { useAuth } from '~/composables/useAuth';
import { useToast } from '~/composables/useToast';

const route = useRoute();
const { login, register } = useAuth();
const { toast } = useToast();
const isLogin = ref(true);
const showPassword = ref(false);
const isLoading = ref(false);

const form = ref({
  name: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    let success: boolean;
    if (isLogin.value) {
      success = await login(form.value.email, form.value.password);
      if (!success) {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Try admin@fabric.com / admin123',
          variant: 'destructive',
        });
      }
    } else {
      success = await register(form.value.name, form.value.email, form.value.password);
      if (!success) {
        toast({
          title: 'Registration failed',
          description: 'This email is already registered.',
          variant: 'destructive',
        });
      }
    }

    if (success) {
      toast({
        title: isLogin.value ? 'Welcome back!' : 'Account created!',
        description: isLogin.value ? "You've been logged in." : 'Welcome to Xisekelo Fabrics!',
      });
      const from = (route.query.from as string) || '/';
      navigateTo(from);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

