<template>
  <swipe-modal
    v-model="modal"
    border-top-radius="16px"
    contents-height="100vh"
    contents-color="#F7FBFF"
    background-color="#00255077"
  >
    <div
      v-if="taskId"
      id="task-modal"
    >
      <h2>{{ taskData.title }}</h2>
      <h4>
        {{ returnUnixToJp(taskData.dateStart) }} から
        {{ returnUnixToJp(taskData.dateEnd) }} まで
      </h4>
      <Divider />
      <div>
        {{ taskData.text }}
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
/* import { component as swipeModal } from '@takuma-ru/vue-swipe-modal' */
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()
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

    // lifeCycle
    onMounted(() => {
      checkTaskId(taskId.value)
    })

    // other

    return {
      modal,
      taskId,
      taskData,

      returnUnixToJp,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
#task-modal {
  padding: 0px 16px 0px 16px;
}
</style>
