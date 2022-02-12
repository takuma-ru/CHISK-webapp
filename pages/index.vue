<template>
  <v-row justify="center" align="center">
    <button
      @click="trySignIn()"
    >
      signin
    </button>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import googleAuth from '~/composable/firebase/googleAuth'

export default defineComponent({
  components: { },
  setup () {
    // const
    // let, computed
    // methods
    const { trySignIn, trySignOut } = googleAuth()
    // lifeCycle
    // other
    useMeta({ title: 'Home' })

    return {
      trySignIn,
      trySignOut,
    }
  },
  head: {},
})
</script>
