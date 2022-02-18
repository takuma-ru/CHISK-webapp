<template>
  <div>
    hello
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other
    useMeta({ title: 'test one' })

    return {
    }
  },
  head: {},
})
</script>
