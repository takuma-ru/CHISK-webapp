<template>
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
      id="task-modal"
    >
      <h2>{{ taskData.title }}</h2>
      <h4>
        <Icon
          :icon="mdiCalendar"
          color="gray-lighten-1"
        />
        &nbsp;
        {{ returnUnixToJp(taskData.dateStart) }} から
        {{ returnUnixToJp(taskData.dateEnd) }} まで
      </h4>
      <Divider />
      <div class="task-modal-text">
        {{ taskData.text }}
      </div>
      <Divider />
      <div>
        <Button
          v-if="taskData.completed"
          color="red-lighten-1"
          @click="inCompleted(userProfile.uid, taskData.id)"
        >
          <Icon :icon="mdiCheck" :color="scssVar('black')" />
          &nbsp;やっぱり完了じゃない
        </Button>
        <Button
          v-else
          color="lightblue"
          @click="completed(userProfile.uid, taskData.id)"
        >
          <Icon :icon="mdiCheck" :color="scssVar('black')" />
          &nbsp;完了とする！
        </Button>
      </div>
    </div>
  </swipe-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import {
  mdiCheck,
  mdiCalendar,
} from '@mdi/js'
import swipeModal from '../swipeModal.vue'
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import scssVar from '~/composable/scss/returnVariables'
import completedTaskData from '~/composable/firebase/completedTaskData'

export default defineComponent({
  components: {
    swipeModal,
  },
  setup () {
    // const
    const route = useRoute()
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const taskData = ref<any>({})
    const { userTaskData } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType
    const modal = ref(false)

    // let, computed
    const taskId = computed(() => route.value.query.taskId)

    // watch
    watch(taskId, (newTaskId) => {
      checkTaskId(newTaskId)
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
      modal,
      taskId,
      taskData,
      userProfile,

      returnUnixToJp,
      scssVar,
      completed,
      inCompleted,

      mdiCheck,
      mdiCalendar,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
#task-modal {
  padding: 0px 16px 0px 16px;

  h4 {
    display: inline-flex;
  }

  .task-modal {
    &-text {
      padding: 16px 0px 16px 0px;
    }
  }
}

</style>
