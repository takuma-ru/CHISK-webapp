<template>
  <div>
    <Button>
      button
    </Button>
    <Button
      class="primary-light-1"
      @click="trySignIn()"
    >
      signin
    </Button>
    {{ userProfile }}
    {{ userTaskData }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  inject,
  provide,
  useMeta,
} from '@nuxtjs/composition-api'
import auth from '~/composable/firebase/auth'
import useUserProfile, {
  userProfileType,
  userProfileKey,
} from '~/composition/userProfile'
import useUserTaskData, {
  userTaskDataType,
  userTaskDataKey,
} from '~/composition/userTaskData'

export default defineComponent({
  components: {},
  setup () {
    // store
    provide(userTaskDataKey, useUserTaskData())

    // const
    const {
      trySignIn,
      trySignOut,
    } = auth()
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const {
      userTaskData,
      getUserTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType

    // watch
    watch(userProfile, async (newUserProfile) => {
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
