<template>
  <div class="container mx-auto">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const NavBar = defineAsyncComponent(() => import('@/components/NavBar'))

export default {
  components: {
    NavBar,
  },
}
</script>

<style lang="scss" scoped></style>
