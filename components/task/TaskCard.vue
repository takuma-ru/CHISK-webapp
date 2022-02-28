<template>
  <div
    :id="taskData.id"
    class="task-card"
  >
    <div
      class="task-contents-left"
      @click="router.push('?taskId=' + taskData.id)"
    >
      <span class="task-title">
        {{ taskData.title }}
      </span>
      <span
        class="task-date"
        v-text="dateEnd"
      />
    </div>
    <div
      v-if="taskData.completed"
      class="task-contents-right"
    >
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
  computed,
} from '@nuxtjs/composition-api'
import { userTaskDataInterface } from '~/composition/userTaskData'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'

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
  setup (props) {
    const router = useRouter()

    // const
    // let, computed
    const dateEnd = computed(() => {
      return props.taskData.dateEnd ? returnUnixToJp(props.taskData.dateEnd) : null
    })
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other

    return {
      router,
      dateEnd,

      returnUnixToJp,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  display: flex;
  height: 96px;
  max-width: 342px;

  margin: 8px;

  /* box-shadow: $primary-shadow; */

  .task-contents-left {
    width: 342px;

    padding: 16px;

    border-radius: 16px;
    background-color: $white;

    cursor: pointer;
  }

  .task-contents-right {
    position: relative;
    min-width: 80px;
    max-width: 80px;
    height: 100%;

    border-radius: 16px;
    text-align: center;
    background-color: $lightblue-darken-1;

    cursor: pointer;

    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      color: $white;
    }
  }

  .task-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }

  .task-date {
    position: absolute;

    bottom: 16px;
    left: 16px;
  }
}
</style>
