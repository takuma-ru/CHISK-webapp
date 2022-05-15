<template>
  <div class="index">
    <div class="contents">
      <div
        class="task-group"
      >
        <h3>ハイライト</h3>
        <div class="task-list">
          <TaskCard
            :task-data="(userTaskData[0])"
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
      <Divider />
      <div class="earth-info">
        <h3>この星の情報</h3>
        <table>
          <tbody>
            <tr>
              <td>誕生してから</td>
              <td style="text-align: right;">
                <span class="data-num">
                  {{ userPlanetData.created ? Math.floor((new Date().getTime() - userPlanetData.created.getTime()) / 86400000) : 0 }}
                </span>
                日
              </td>
            </tr>
            <tr>
              <td>ペンギンが</td>
              <td style="text-align: right;">
                <span class="data-num">
                  {{ userPlanetData.creatures ? userPlanetData.creatures.valueOf() : 0 }}
                </span>
                匹
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AddTaskModal />
    <Earth :creatures="userPlanetData.creatures ? userPlanetData.creatures.valueOf() : 0" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useMeta,
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
import useUserPlanetData, {
  userPlanetDataType,
  userPlanetDataKey,
} from '~/composition/userPlanetData'
import AddTaskModal from '~/components/task/AddTaskModal.vue'
import Earth from '~/components/earth/earth.vue'
import Divider from '~/components/Divider.vue'

export default defineComponent({
  components: { TaskCard, AddTaskModal, Earth, Divider },
  setup () {
    // store
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const {
      userTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType
    const {
      userPlanetData,
    } = inject(userPlanetDataKey, useUserPlanetData()) as userPlanetDataType

    // lifeCycle

    // other
    useMeta({ title: 'Home' })

    return {
      userProfile,
      userTaskData,
      userPlanetData,

      mdiViewDashboard,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.index {
  max-width: 342px;

  margin: auto;

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

      h3 {
        margin-bottom: 16px;
      }

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

      h3 {
        margin-bottom: 16px;
      }

      .data-num {
        padding-right: 12px;

        font-size: x-large;
        font-weight: bold;
      }

      table {
        width: 100%;

        border-radius: 16px;
        color: $white;
        background-color: rgba(0,37,80,0.4);

        td {
          padding: 8px 16px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
