<template>
  <!-- <swipe-modal> -->
  <div
    v-if="taskId"
    id="task-modal"
  >
    task-modal
    {{ taskData }}
  </div>
  <!-- </swipe-modal> -->
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  ref,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import useUserTaskData, { userTaskDataKey, userTaskDataType, userTaskDataInterface } from '~/composition/userTaskData'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()
    const taskData = ref<any>({})

    const {
      userTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType

    // let, computed
    const taskId = computed(() => route.value.query.taskId)

    // watch
    watch(taskId, (newTaskId) => {
      const index = userTaskData.findIndex(({ id }) => id === newTaskId)
      if (index !== -1) {
        taskData.value = userTaskData[index]
      }
    })

    // methods

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other

    return {
      taskId,
      taskData,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
#task-modal {
}
</style>
