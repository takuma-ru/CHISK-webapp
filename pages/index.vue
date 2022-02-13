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
  inject,
  provide,
  useMeta,
} from '@nuxtjs/composition-api'
// import googleAuth from '~/composable/firebase/auth'
// import useUserProfile, { userProfileType, userProfileKey } from '~/composition/userProfile'
import auth, { authType, authKey } from '~/composable/firebase/auth'

export default defineComponent({
  components: { },
  setup () {
    // store
    provide(authKey, auth())
    // const { userProfile } = googleAuth()

    // const
    const { userProfile, trySignIn, trySignOut } = inject(authKey) as authType

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
