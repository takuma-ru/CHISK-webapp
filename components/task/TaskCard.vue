<template>
  <div
    :id="taskData.id"
    class="task-card"
  >
    <div class="task-contents-left">
      <span class="task-title">
        {{ taskData.title }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  PropType,
} from '@nuxtjs/composition-api'
import { userTaskDataInterface } from '~/composition/userTaskData'

export default defineComponent({
  props: {
    taskData: {
      type: Object as PropType<userTaskDataInterface>,
      default: () => ({
        id: 'id',
        title: 'title',
        text: 'text',
        dateStart: new Date(),
        dateEnd: new Date(),
        group: 'group',
        completed: new Date(),
        tag: [],
      }),
    },
  },
  setup () {
    // const
    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other

    return {
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-card {
  height: 96px;
  max-width: 342px;

  margin: 8px;

  border-radius: 16px;
  /* box-shadow: $primary-shadow; */
  background-color: $white;

  .task-contents-left {
    padding: 16px;
  }

  .task-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}
</style>
