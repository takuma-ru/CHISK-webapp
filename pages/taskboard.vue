<template>
  <div>
    <div
      v-if="isPhone"
    >
      <Tab
        v-model="tabPath"
        :tab-item="tabItem"
        width="calc(100vw - 48px)"
      />
      <div class="task-group-phone">
        <TaskCard
          v-for="task in userTaskData.filter((v) => v.group === tabPath)"
          :key="task.id"
          :task-data="task"
        />
      </div>
    </div>
    <div
      v-else
      class="task-group-desktop"
    >
      <div class="col" style="margin-right: 24px;">
        <TaskCard
          v-for="task in userTaskData.filter((v) => v.group === '目標' || v.group === '進行中')"
          :key="task.id"
          :task-data="task"
        />
      </div>
      <div class="col">
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
  ref,
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
import getIsPhone from '~/composable/utils/isPhone'
import Tab from '~/components/Tab.vue'

export default defineComponent({
  components: { TaskCard, AddTaskModal, Tab },
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
    const isPhone = getIsPhone().isPhone
    const tabPath = ref<string>('進行中')
    const tabItem = ref(['進行中', '完了'])

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
      isPhone,
      tabPath,
      tabItem,

      trySignIn,
      trySignOut,
      deleteTaskData,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-group-desktop {
  display: flex;

  .col {
    display: flex;
    flex-flow: column;
    justify-items: center;
    align-items: center;

    width: fit-content;

    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.task-group-phone {
  display: flex;

  flex-flow: column;
  justify-items: center;
  align-items: center;
}
</style>
