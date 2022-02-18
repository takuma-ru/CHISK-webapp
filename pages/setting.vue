<template>
  <div>
    {{ a }}
  </div>
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
    useMeta({ title: 'Setting' })
    return {
      a,
    }
  },
  head: {},
})
</script>
