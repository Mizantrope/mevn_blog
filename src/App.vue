<template>
  <LayoutMain />
</template>

<script>
import { defineAsyncComponent } from 'vue'
const LayoutMain = defineAsyncComponent(() => import('@/components/LayoutMain'))

export default {
  components: {
    LayoutMain,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

@import '@/assets/style/global';
</style>
