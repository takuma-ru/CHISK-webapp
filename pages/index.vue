<template>
  <div>
    <div class="contents">
      <div
        class="task-group"
      >
        <h3>タスク一覧</h3>
        <Divider />
        <TaskCard
          :task-data="userTaskData.find((v) => v.group === '目標')"
        />
      </div>
      <div class="earth-info">
        <h3>情報</h3>
        <Divider />
      </div>
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
import Divider from '~/components/Divider.vue'

export default defineComponent({
  components: { TaskCard, AddTaskModal, Earth, Divider },
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
.contents {
  position: relative;
  z-index: 11;
  display: flex;
  width: fit-content;

  flex-direction: column;

  h3 {
    margin: 0px;
    color: $white;
  }

  .task-group {
    position: relative;
    width: fit-content;

  }

  .earth-info {
    position: relative;

    margin-top: 32px;
  }
}
</style>
