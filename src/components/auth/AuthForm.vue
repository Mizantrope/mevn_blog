<template>
  <form
    class="w-1/4 h-60 mx-auto mt-40"
    @submit.prevent="submitHandler"
  >
    <h1 class="text-large text-white text-center">
      {{ template == 'register' ? 'Регистрация' : 'Авторизация' }}
    </h1>
    <div>
      <label class="text-xs text-gray-400">
        Username:
        <input
          v-model="v$.username.$model"
          type="text"
          placeholder="Username"
          class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          :class="{ 'input-filled': v$.username.$model.length > 0 }"
        />
      </label>
      <div
        class="text-xs text-red-400 mt-2"
        v-if="v$.username.$errors !== 0"
      >
        <span v-for="error in v$.username.$errors">
          {{ error.$message }}
        </span>
      </div>
    </div>

    <div class="mt-4">
      <label class="text-xs text-gray-400">
        Password:
        <input
          v-model="v$.password.$model"
          type="password"
          placeholder="Password"
          class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          :class="{ 'input-filled': v$.password.$model.length > 0 }"
        />
      </label>
      <div
        class="text-xs text-red-400 mt-2"
        v-if="v$.password.$errors !== 0"
      >
        <span v-for="error in v$.password.$errors">
          {{ error.$message }}
        </span>
      </div>
    </div>

    <div class="flex gap-8 justify-center mt-4">
      <button
        :disabled="this.isLoadng"
        type="submit"
        class="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 disabled:bg-gray-400"
      >
        {{ template == 'register' ? 'Подтвердить' : 'Войти' }}
      </button>
      <router-link
        :to="template == 'register' ? '/login' : '/register'"
        class="flex justify-center items-center text-xs text-white"
      >
        {{ template == 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?' }}
      </router-link>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import { toast } from 'vue3-toastify'

export default {
  props: {
    template: {
      type: String,
      required: true,
    },
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const passwordLength = ref(6)
    const rules = computed(() => ({
      username: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
      },
      password: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        minLength: helpers.withMessage(
          `Поле должно содержать ${passwordLength.value} символов`,
          minLength(passwordLength.value)
        ),
      },
    }))

    const v$ = useVuelidate(rules, {
      username,
      password,
    })

    return { username, password, passwordLength, v$ }
  },
  computed: {
    ...mapGetters({
      status: 'status',
      isLoadng: 'isLoading',
      authenticate: 'authenticate',
    }),
  },
  methods: {
    ...mapActions(['auth']),
    async submitHandler(e) {
      this.v$.$touch()

      const data = {
        username: this.username,
        password: this.password,
      }

      if (this.v$.$invalid) return

      await this.auth({
        data,
        template: this.template,
      })

      this.username = ''
      this.password = ''

      if (this.template == 'login') {
        this.$router.push('/')
      }

      toast(this.status, {
        transition: toast.TRANSITIONS.BOUNCE,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
