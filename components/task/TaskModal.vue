<template>
  <swipe-modal
    v-model="modal"
    border-top-radius="16px"
    contents-height="100vh"
    contents-color="#F7FBFF"
    background-color="#002550"
  >
    <div
      v-if="taskId"
      id="task-modal"
    >
      task-modal
      {{ taskData }}
    </div>
  </swipe-modal>
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
/* import { component as swipeModal } from '@takuma-ru/vue-swipe-modal' */
import swipeModal from '../swipeModal.vue'
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'

export default defineComponent({
  components: { swipeModal },
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
      if (taskId) {
        const index = userTaskData.findIndex(({ id }) => id === newTaskId)
        if (index !== -1) {
          taskData.value = userTaskData[index]
          modal.value = true
        }
      } else {
        modal.value = false
      }
    })
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other
    return {
      modal,
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
