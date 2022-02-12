<template>
  <div id="app">
    <NavigationBar v-if="!isPhone" />
    <BottomNavigationBar v-if="isPhone" />
    <v-container id="main">
      <Nuxt />
    </v-container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import NavigationBar from '~/components/utils/NavigationBar.vue'
import BottomNavigationBar from '~/components/utils/BottomNavigationBar.vue'
import getIsPhone from '~/composable/utils/isPhone'

export default defineComponent({
  components: { NavigationBar, BottomNavigationBar },
  setup () {
    // const
    const isPhone = ref<boolean>(false)
    // let, computed
    // methods
    const resizeEvent = () => {
      isPhone.value = getIsPhone().isPhone
    }
    // lifeCycle
    onMounted(() => {
      window.addEventListener('resize', resizeEvent)
      resizeEvent()
    })
    // other
    return {
      isPhone,
    }
  },
})
</script>

<style lang="scss">
html {
  overscroll-behavior-y: none;
  background-color: $primary;
}
body {
  font-family: 'Noto Sans JP', sans-serif;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

body::-webkit-scrollbar {
  display:none;
}
</style>
