<template>
  <div>
    <div
      id="task-group"
    >
      <TaskCard
        v-for="task in userTaskData"
        :key="task.id"
        :task-data="task"
      />
    </div>
    <AddTaskModal />
    <Earth />
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
import useUserProfile, {
  userProfileType,
  userProfileKey,
} from '~/composition/userProfile'
import useUserTaskData, {
  userTaskDataType,
  userTaskDataKey,
} from '~/composition/userTaskData'
import deleteTaskData from '~/composable/firebase/deleteTaskData'
import AddTaskModal from '~/components/task/AddTaskModal.vue'
import Earth from '~/components/earth/earth.vue'

export default defineComponent({
  components: { TaskCard, AddTaskModal, Earth },
  setup () {
    // store
    // const
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

      deleteUserTaskData,
      deleteTaskData,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>

</style>
