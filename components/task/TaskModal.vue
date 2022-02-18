<template>
  <div
    v-if="taskID"
    id="task-modal"
  >
    task-modal
    {{ taskID }}
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  useMeta,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()

    // let, computed
    const taskID = computed(() => route.value.query.taskID)

    // methods

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other
    useMeta({ title: 'test one' })

    return {
      taskID,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
#task-modal {
}
</style>
