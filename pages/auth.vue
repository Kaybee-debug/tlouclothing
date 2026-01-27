<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-8">
        {{ isLogin ? 'Welcome Back' : 'Create Account' }}
      </h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="!isLogin">
          <label class="block mb-2">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label class="block mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label class="block mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <button
          @click="isLogin = !isLogin"
          class="text-primary hover:underline"
        >
          {{ isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()

const isLogin = ref(true)
const isLoading = ref(false)
const form = ref({
  name: '',
  email: '',
  password: '',
})

const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    let success = false
    
    if (isLogin.value) {
      success = await auth.login(form.value.email, form.value.password)
      if (!success) {
        alert('Login failed: Invalid email or password')
      }
    } else {
      success = await auth.register(form.value.name, form.value.email, form.value.password)
      if (!success) {
        alert('Registration failed: This email is already registered')
      }
    }
    
    if (success) {
      // Redirect admins to admin dashboard, others to home
      if (auth.isAdmin) {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }
  } finally {
    isLoading.value = false
  }
}
</script>


