<template>
  <!-- <swipe-modal> -->
  <div
    v-if="taskId"
    id="task-modal"
  >
    task-modal
    {{ taskId }}
  </div>
  <!-- </swipe-modal> -->
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()

    // let, computed
    const taskId = computed(() => route.value.query.taskId)

    // methods

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other

    return {
      taskId,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
#task-modal {
}
</style>
