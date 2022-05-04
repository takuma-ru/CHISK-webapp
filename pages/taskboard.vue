<template>
  <div>
    <div
      class="task-group"
    >
      <div class="group">
        <TaskCard
          v-for="task in userTaskData.filter((v) => v.group === '目標' || v.group === '進行中')"
          :key="task.id"
          :task-data="task"
        />
      </div>
      <div class="group">
        <TaskCard
          v-for="task in userTaskData.filter((v) => v.group === '完了')"
          :key="task.id"
          :task-data="task"
        />
      </div>
    </div>
    <AddTaskModal />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
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
import AddTaskModal from '~/components/task/AddTaskModal.vue'

export default defineComponent({
  components: { TaskCard, AddTaskModal },
  setup () {
    // store
    const {
      trySignIn,
      trySignOut,
    } = auth()
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const {
      userTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType

    // const

    // watch

    // methods
    onMounted(() => {
    })

    // lifeCycle

    // other
    useMeta({ title: 'TaskBoard' })

    return {
      userProfile,
      userTaskData,

      trySignIn,
      trySignOut,
      deleteTaskData,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-group {
  display: flex;

  .group {
    margin-right: 16px;
  }
}
</style>
