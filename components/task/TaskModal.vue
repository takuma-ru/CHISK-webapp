<template>
  <div>
    <swipe-modal
      v-model="modal"
      border-top-radius="16px"
      contents-height="100vh"
      contents-width="min(100vw, 960px)"
      :contents-color="scssVar('white')"
      background-color="#00255077"
    >
      <div
        v-if="taskId"
        class="task-modal"
      >
        <div class="task-modal-contents">
          <div class="task-modal-contents-title">
            <h2>{{ taskData.title }}</h2>
          </div>
          <div class="task-modal-contents-date">
            <Icon
              text
              icon="mdiCalendar"
              color="gray-lighten-1"
            />
            <h4 style="margin: 0px">
              &nbsp;
              {{ returnUnixToJp(taskData.dateStart) }} から
              {{ returnUnixToJp(taskData.dateEnd) }} まで
            </h4>
          </div>
          <Divider />
          <div
            class="task-modal-contents-text"
          >
            <span class="title">
              <Icon
                text
                icon="mdiFormatListBulleted"
                color="gray-lighten-1"
                size="1rem"
              />
              &nbsp;詳細
            </span>
            <span class="text">
              {{ taskData.text }}
            </span>
          </div>
        </div>

        <div class="task-modal-action">
          <Divider />
          <div class="button-group">
            <div class="icon-group">
              <Button
                color="transparent"
              >
                <Icon
                  text
                  icon="mdiPencilOutline"
                  color="black"
                  size="1.5rem"
                />
              </Button>
              <Button
                color="transparent"
                @click="dialog = true"
              >
                <Icon
                  text
                  icon="mdiTrashCanOutline"
                  color="black"
                  size="1.5rem"
                />
              </Button>
            </div>
            <Button
              v-if="taskData.completed"
              color="red-lighten-1"
              icon="mdiClose"
              @click="inCompleted(userProfile.uid, taskData.id)"
            >
              やっぱり完了じゃない
            </Button>
            <Button
              v-else
              text
              color="lightblue"
              icon="mdiCheck"
              @click="completed(userProfile.uid, taskData.id)"
            >
              完了とする！
            </Button>
          </div>
        </div>
      </div>
    </swipe-modal>
    <Dialog
      v-model="dialog"
      width="320px"
    >
      <h4 style="margin: 0px;">
        このタスクを削除してもよろしいですか？
      </h4>
      <p style="margin-top: 8px">
        &#x203B;一度消したら復元することはできません
      </p>
      <Divider />
      <div class="dialog-button-group">
        <Button
          color="lightblue"
          @click="dialog = false"
        >
          とじる
        </Button>
        <Button
          color="red-lighten-1"
          icon="mdiTrashCanOutline"
          @click="deleteTaskData(userProfile.uid, taskData.id).then(() => { dialog = false; router.push('?') })"
        >
          削除
        </Button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import swipeModal from '../swipeModal.vue'
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import scssVar from '~/composable/scss/returnVariables'
import completedTaskData from '~/composable/firebase/completedTaskData'
import deleteTaskData from '~/composable/firebase/deleteTaskData'

export default defineComponent({
  components: {
    swipeModal,
  },
  setup () {
    // const
    const route = useRoute()
    const router = useRouter()
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const taskData = ref<any>({})
    const { userTaskData } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType
    const modal = ref(false)
    const dialog = ref(false)

    // let, computed
    const taskId = computed(() => route.value.query.taskId)

    // watch
    watch(taskId, (newTaskId) => {
      checkTaskId(newTaskId)
    })

    watch(userTaskData, () => {
      checkTaskId(taskId.value)
    })

    // methods
    const checkTaskId = (newTaskId: string | (string | null)[]) => {
      if (taskId.value) {
        const index = userTaskData.findIndex(({ id }) => id === newTaskId)
        if (index !== -1) {
          taskData.value = userTaskData[index]
          modal.value = true
        }
      } else {
        modal.value = false
      }
    }

    const {
      completed,
      inCompleted,
    } = completedTaskData()

    // lifeCycle
    onMounted(() => {
      checkTaskId(taskId.value)
    })

    // other

    return {
      router,
      modal,
      taskId,
      taskData,
      userProfile,
      dialog,

      returnUnixToJp,
      scssVar,
      completed,
      inCompleted,
      deleteTaskData,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-modal {
  display: flex;
  height: calc(100vh - 20px - 16px);

  padding: 0px 16px 16px 16px;
  flex-direction: column;
  justify-content: space-between;

  &-contents {
    &-title {
      display: inline-flex;
      width: 100%;

      justify-content: space-between;
      align-self: center;
    }

    &-date {
      display: inline-flex;
    }

    &-text {
      display: flex;
      padding: 0px 0px 16px 0px;

      flex-direction: column;

      .title {
        display: inline-flex;
        margin-bottom: 4px;

        font-size: 14px;
        color: $gray-lighten-1;
      }

      .text {
        white-space: pre-line;
        word-wrap: break-word;
      }
    }
  }

  &-action {
    .button-group {
      display: inline-flex;
      width: 100%;

      justify-content: space-between;
      align-self: center;

      .icon-group {
        display: inline-flex;
      }
    }
  }

}

.dialog-button-group {
  display: flex;

  justify-content: space-between;
}
</style>
