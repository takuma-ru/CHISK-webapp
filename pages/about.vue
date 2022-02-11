<template>
  <v-row justify="center" align="center">
    {{ a }}
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  components: { },
  setup () {
    // const
    const a = ref('hello')
    // let, computed
    // methods
    // lifeCycle
    // other
    useMeta({ title: 'About' })
    return {
      a,
    }
  },
  head: {},
})
</script>
