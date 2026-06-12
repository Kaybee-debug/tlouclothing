<template>

  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">

    <div class="w-full max-w-md">

      <h1 class="text-3xl font-bold text-center mb-2">

        {{ isLogin ? 'Welcome Back' : 'Create Account' }}

      </h1>

      <p v-if="!isLogin" class="text-center text-sm text-muted-foreground mb-8">

        We will email you a 6-digit code to confirm your address.

      </p>

      <div v-else class="mb-8" />



      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div v-if="!isLogin">

          <label class="block mb-2">Full Name</label>

          <input

            v-model="form.name"

            type="text"

            class="w-full px-4 py-2 border rounded-lg"

            required

          />

        </div>



        <div>

          <label class="block mb-2">Email</label>

          <div class="flex gap-2">

            <input

              v-model="form.email"

              type="email"

              class="flex-1 px-4 py-2 border rounded-lg"

              required

              @input="onEmailChange"

            />

            <button

              v-if="!isLogin"

              type="button"

              class="shrink-0 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 text-sm font-medium disabled:opacity-50"

              :disabled="sendingCode || !form.email || codeCooldown > 0"

              @click="sendCode"

            >

              {{ codeCooldown > 0 ? `${codeCooldown}s` : sendingCode ? 'Sending…' : codeSent ? 'Resend' : 'Send code' }}

            </button>

          </div>

        </div>



        <div v-if="!isLogin && codeSent">

          <label class="block mb-2">Verification code</label>

          <input

            v-model="form.verificationCode"

            type="text"

            inputmode="numeric"

            maxlength="6"

            placeholder="6-digit code from your email"

            class="w-full px-4 py-2 border rounded-lg tracking-widest"

            required

          />

          <p v-if="codeMessage" class="text-sm text-green-700 mt-2">{{ codeMessage }}</p>

          <p v-if="devCodeHint" class="text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-100 rounded px-3 py-2">

            Dev mode — your code is: <strong>{{ devCodeHint }}</strong> (email not configured on server)

          </p>

        </div>



        <div>

          <label class="block mb-2">Password</label>

          <input

            v-model="form.password"

            type="password"

            minlength="6"

            class="w-full px-4 py-2 border rounded-lg"

            required

          />

          <p v-if="!isLogin" class="text-xs text-muted-foreground mt-1">At least 6 characters</p>

        </div>



        <p v-if="errorMessage" class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">

          {{ errorMessage }}

        </p>



        <button

          type="submit"

          class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"

          :disabled="isLoading || (!isLogin && !codeSent)"

        >

          {{ isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account' }}

        </button>

      </form>



      <p v-if="isLogin" class="mt-4 text-center text-xs text-muted-foreground">

        Demo admin: admin@fabric.com / admin123

      </p>



      <div class="mt-6 text-center">

        <button

          type="button"

          class="text-primary hover:underline"

          @click="toggleMode"

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

const sendingCode = ref(false)

const codeSent = ref(false)

const codeMessage = ref('')

const devCodeHint = ref('')

const codeCooldown = ref(0)

const errorMessage = ref('')

const form = ref({

  name: '',

  email: '',

  password: '',

  verificationCode: '',

})



let cooldownTimer = null



function onEmailChange() {
  if (codeSent.value) {
    codeSent.value = false
    codeMessage.value = ''
    devCodeHint.value = ''
    form.value.verificationCode = ''
  }
}

function resetSignupState() {

  codeSent.value = false

  codeMessage.value = ''

  devCodeHint.value = ''

  form.value.verificationCode = ''

  codeCooldown.value = 0

  if (cooldownTimer) {

    clearInterval(cooldownTimer)

    cooldownTimer = null

  }

}



function toggleMode() {

  isLogin.value = !isLogin.value

  errorMessage.value = ''

  resetSignupState()

}



function startCooldown(seconds = 60) {

  codeCooldown.value = seconds

  cooldownTimer = setInterval(() => {

    codeCooldown.value -= 1

    if (codeCooldown.value <= 0) {

      clearInterval(cooldownTimer)

      cooldownTimer = null

    }

  }, 1000)

}



async function sendCode() {

  errorMessage.value = ''

  codeMessage.value = ''

  devCodeHint.value = ''

  sendingCode.value = true



  try {

    const data = await auth.sendVerificationCode(form.value.email)

    codeSent.value = true

    codeMessage.value = data.message || 'Verification code sent. Check your inbox.'

    if (data.devCode) devCodeHint.value = data.devCode

    startCooldown()

  } catch (err) {

    errorMessage.value = auth.registerError || err.message || 'Could not send verification code'

  } finally {

    sendingCode.value = false

  }

}



const handleSubmit = async () => {

  isLoading.value = true

  errorMessage.value = ''



  try {

    let success = false



    if (isLogin.value) {

      success = await auth.login(form.value.email, form.value.password)

      if (!success) {

        errorMessage.value = auth.loginError || 'Invalid email or password'

      }

    } else {

      if (!codeSent.value) {

        errorMessage.value = 'Please send a verification code to your email first.'

        return

      }

      if (!form.value.verificationCode.trim()) {

        errorMessage.value = 'Enter the 6-digit verification code from your email.'

        return

      }

      success = await auth.register(

        form.value.name,

        form.value.email,

        form.value.password,

        form.value.verificationCode.trim()

      )

      if (!success) {

        errorMessage.value = auth.registerError || 'Registration failed.'

      }

    }



    if (success) {

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



onUnmounted(() => {

  if (cooldownTimer) clearInterval(cooldownTimer)

})

</script>


