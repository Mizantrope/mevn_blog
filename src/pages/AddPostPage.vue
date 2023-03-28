<template>
  <form
    class="w-1/3 mx-auto py-10"
    @submit.prevent="submitHandler"
  >
    <AppFileUpload v-model="form.file"></AppFileUpload>
    {{ form.file }}

    <div class="flex object-cover py-2">IMAGE</div>

    <label class="text-xs text-gray-400">
      Заголовок поста:
      <input
        v-model="v$.title.$model"
        type="text"
        placeholder="Заголовок поста"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
      />
    </label>
    <div
      class="text-xs text-red-400 mt-2"
      v-if="v$.title.$errors !== 0"
    >
      <span v-for="error in v$.title.$errors">
        {{ error.$message }}
      </span>
    </div>

    <label class="text-xs text-gray-400">
      Текст поста:
      <textarea
        v-model="v$.text.$model"
        placeholder="Текст поста"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
      ></textarea>
    </label>
    <div
      class="text-xs text-red-400 mt-2"
      v-if="v$.text.$errors !== 0"
    >
      <span v-for="error in v$.text.$errors">
        {{ error.$message }}
      </span>
    </div>

    <div class="flex gap-8 justify-center mt-4">
      <button
        type="submit"
        class="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 disabled:bg-gray-400"
      >
        Добавить
      </button>
      <button
        type="submit"
        class="flex justify-center items-center text-xs bg-red-500 text-white rounded-sm py-2 px-4 disabled:bg-gray-400"
      >
        Отменить
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import AppFileUpload from '@/components/AppFileUpload.vue'

export default {
  setup() {
    const title = ref('')
    const text = ref('')

    const rules = computed(() => ({
      title: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
      },
      text: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
      },
    }))

    const v$ = useVuelidate(rules, {
      title,
      text,
    })

    return { title, text, v$ }
  },
  components: { AppFileUpload },
  data: () => ({ form: { file: null } }),
  methods: {
    ...mapActions(['createPost']),
    async submitHandler() {
      this.v$.$touch()

      const data = new FormData()
      data.append('title', this.title)
      data.append('text', this.text)
      data.append('image', this.form.file)

      console.log(data)

      if (this.v$.$invalid) return

      await this.createPost(data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
