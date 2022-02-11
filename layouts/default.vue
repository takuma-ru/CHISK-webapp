<template>
  <v-container>
    <Nuxt />
  </v-container>
</template>

<script>
import {
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    const a = ref('hello')
    // let, computed
    // methods
    // lifeCycle
    // other
    return {
      a,
    }
  },
})
</script>
