<template>
  <v-row justify="center" align="center">
    {{ a }}
  </v-row>
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
