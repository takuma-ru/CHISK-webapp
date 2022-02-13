<template>
  <v-row justify="center" align="center">
    <button
      @click="trySignIn()"
    >
      signin
    </button>
    {{ userProfile }}
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  inject,
  provide,
  useMeta,
} from '@nuxtjs/composition-api'
import auth, { authType, authKey } from '~/composable/firebase/auth'
import { getTaskData } from '~/composable/firebase/getTaskData'

export default defineComponent({
  components: { },
  setup () {
    // store
    provide(authKey, auth())

    // const
    const { userProfile, trySignIn, trySignOut } = inject(authKey) as authType

    // watch
    watch(
      userProfile,
      async (newUserProfile) => {
        await getTaskData(newUserProfile.uid)
      },
    )
    // methods

    // lifeCycle

    // other
    useMeta({ title: 'Home' })

    return {
      userProfile,

      trySignIn,
      trySignOut,
    }
  },
  head: {},
})
</script>
