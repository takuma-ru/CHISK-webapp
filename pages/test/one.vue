<template>
  <v-row justify="center" align="center">
    {{ a }}
  </v-row>
</template>

<script>
import {
  defineComponent,
  ref,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import getAppData from '~/composable/firebase/getAppData'

export default defineComponent({
  setup () {
    // const
    const a = ref('hello')
    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
      await getAppData()
    })
    // other
    return {
      a,
    }
  },
})
</script>
