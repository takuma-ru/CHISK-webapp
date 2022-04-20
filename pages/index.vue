<template>
  <div class="index">
    <div class="contents">
      <div
        class="task-group"
      >
        <h3>タスク一覧</h3>
        <Divider />
        <div class="task-list">
          <TaskCard
            :task-data="userTaskData.find((v) => v.group === '目標')"
          />
          <Button
            color="blue-lighten-1"
            text-color="white"
            :icon="mdiViewDashboard"
            to="/taskboard"
            class="taskboard-button"
          >
            &nbsp;&nbsp;タスクボードでもっと見る
          </Button>
        </div>
      </div>
      <div class="earth-info">
        <h3>この星の情報</h3>
        <Divider />
        <table>
          <tbody>
            <tr>
              <td>誕生してから</td>
              <td><span class="data-num">{{ 0 }}</span>日</td>
            </tr>
            <tr>
              <td>ペンギンが</td>
              <td><span class="data-num">{{ 0 }}</span>匹</td>
            </tr>
          </tbody>
        </table>
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
import {
  mdiViewDashboard,
} from '@mdi/js'
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

      mdiViewDashboard,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.index {
  max-width: 342px;

  .contents {
    position: relative;
    display: flex;
    z-index: 11;
    max-width: 342px;

    flex-direction: column;

    h3 {
      margin: 0px;
      color: $white;
    }

    .task-group {
      position: relative;
      width: 100%;

      .task-list {
        display: flex;
        flex-direction: column;
      }

      .taskboard-button {
        margin: 8px 0px;
      }
    }

    .earth-info {
      position: relative;
      width: 100%;

      margin-top: 32px;

      .data-num {
        padding-right: 12px;

        font-size: large;
        font-weight: bold;
      }

      table {
        width: 100%;

        border-radius: 16px;
        color: $white;
        background-color: #4242422D;

        td {
          padding: 8px 16px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
