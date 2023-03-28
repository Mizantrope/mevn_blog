<template>
  <AuthForm :template="'login'"></AuthForm>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const AuthForm = defineAsyncComponent(() => import('@/components/auth/AuthForm'))

export default {
  components: {
    AuthForm,
  },
}
</script>

<style lang="scss" scoped></style>
