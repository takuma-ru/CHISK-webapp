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
    <!-- <Button
      class="primary-light-1"
      @click="deleteTaskData(userProfile.uid, 'bqaI2nU6XCvIdTitkFIu')"
    >
      delete
    </Button> -->
    <div
      id="task-group"
    >
      <TaskCard
        v-for="task in userTaskData"
        :key="task.id"
        :task-data="task"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  inject,
  useMeta,
  onMounted,
} from '@nuxtjs/composition-api'
import TaskCard from '~/components/task/TaskCard.vue'
import auth from '~/composable/firebase/auth'
import useUserProfile, {
  userProfileType,
  userProfileKey,
} from '~/composition/userProfile'
import useUserTaskData, {
  userTaskDataType,
  userTaskDataKey,
} from '~/composition/userTaskData'
import deleteTaskData from '~/composable/firebase/deleteTaskData'

export default defineComponent({
  components: { TaskCard },
  setup () {
    // store
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
      deleteUserTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType

    // watch
    watch(userProfile, async (newUserProfile) => {
      await getUserTaskData(newUserProfile.uid)
    })

    // methods
    onMounted(() => {
      getUserTaskData(userProfile.uid)
    })

    // lifeCycle

    // other
    useMeta({ title: 'Home' })

    return {
      userProfile,
      userTaskData,

      trySignIn,
      trySignOut,
      deleteUserTaskData,
      deleteTaskData,
    }
  },
  head: {},
})
</script>
