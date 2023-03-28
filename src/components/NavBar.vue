<template>
  <div class="flex py-4 justify-between items-center">
    <span class="flex justify-center items-center w-6 h-6 bg-gray-400 text-xs text-white rounded-sm">E</span>

    <ul
      class="flex gap-8"
      v-if="this.authenticate"
    >
      <li v-for="item in links">
        <router-link
          :to="item.url"
          class="text-sm font-medium text-gray-400 hover:text-white"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <div>
      <router-link
        to="/login"
        v-if="!this.authenticate"
        class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2"
      >
        Войти
      </router-link>
      <button
        v-else
        class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2"
        @click="exit"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      links: [
        { title: 'Главная', url: '/', exact: true },
        { title: 'Мои посты', url: '/posts' },
        { title: 'Добавить пост', url: '/new' },
      ],
    }
  },
  computed: {
    ...mapGetters(['authenticate']),
  },
  methods: {
    ...mapActions({
      me: 'me',
      logout: 'logout',
    }),
    exit() {
      this.logout()
      // console.log(this.authenticate)
      this.$router.push('/login')
      // console.log(this.authenticate)
    },
    async auth() {
      await this.me()
      this.isAuth = this.authenticate
    },
  },
  mounted() {
    this.auth()
  },
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #fff;
}
</style>
