<template>
  <div
    :id="taskData.id"
    class="task-card"
  >
    <div
      @click="router.push('?taskId=' + taskData.id)"
      class="task-contents-left"
    >
      <span class="task-title">
        {{ taskData.title }}
      </span>
    </div>
    <div class="task-contents-right">
      <span class="text">完了</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  PropType,
  useRouter,
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
    const router = useRouter()

    // const
    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other

    return {
      router,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-card {
  display: flex;
  height: 96px;
  max-width: 342px;

  margin: 8px;

  /* box-shadow: $primary-shadow; */

  .task-contents-left {
    width: 256px;

    padding: 16px;

    border-radius: 16px;
    background-color: $white;

    cursor: pointer;
  }

  .task-contents-right {
    width: 80px;

    border-radius: 16px;
    text-align: center;
    background-color: $lightblue-darken-1;

    cursor: pointer;

    .text {
      line-height: 96px;
      color: $white;
    }
  }

  .task-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}
</style>
