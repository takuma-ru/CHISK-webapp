<template>
  <v-row justify="center" align="center">
    <button @click="trySignIn()">
      signin
    </button>
    {{ userProfile }}
    {{ userTaskData }}
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
import auth, {
  authType,
  authKey,
} from '~/composable/firebase/auth'
import useUserTaskData, {
  userTaskDataType,
  userTaskDataKey,
} from '~/composition/userTaskData'

export default defineComponent({
  components: {},
  setup () {
    // store
    provide(authKey, auth())
    provide(userTaskDataKey, useUserTaskData())

    // const
    const {
      userProfile,
      trySignIn,
      trySignOut,
    } = inject(authKey) as authType
    const {
      userTaskData,
      getUserTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType

    // watch
    watch(userProfile, async (newUserProfile) => {
      console.log('changed userProfile')
      await getUserTaskData(newUserProfile.uid)
    })
    // methods

    // lifeCycle

    // other
    useMeta({ title: 'Home' })

    return {
      userProfile,
      userTaskData,

      trySignIn,
      trySignOut,
    }
  },
  head: {},
})
</script>
