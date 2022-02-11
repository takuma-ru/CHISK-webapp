<template>
  <div id="app">
    <NavigationBar />
    <v-container id="main">
      <Nuxt />
    </v-container>
  </div>
</template>

<script>
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import NavigationBar from '~/components/utils/NavigationBar.vue'

export default defineComponent({
  components: { NavigationBar },
  setup () {
    // const
    // let, computed
    // methods
    // lifeCycle
    // other
    return {}
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
