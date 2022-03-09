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
      v-if="taskData.completed === (undefined || null)"
      class="task-contents-right"
      @click="completed(userProfile.uid, taskData.id)"
    >
      <span class="text">
        完了
        <Icon
          :icon="mdiCheck"
          color="#000A13"
        />
      </span>
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
  inject,
} from '@nuxtjs/composition-api'
import {
  mdiCheck,
} from '@mdi/js'
import { userTaskDataInterface } from '~/composition/userTaskData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import completedTaskData from '~/composable/firebase/completedTaskData'

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
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType

    // let, computed
    const dateEnd = computed(() => {
      return props.taskData.dateEnd ? returnUnixToJp(props.taskData.dateEnd) : null
    })
    // methods
    const { completed } = completedTaskData()

    // lifeCycle
    onBeforeMount(async () => {
    })
    // other

    return {
      router,
      dateEnd,
      userProfile,

      returnUnixToJp,
      completed,

      mdiCheck,
    }
  },
})
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  display: flex;
  height: 96px;
  max-width: 342px;

  margin: 8px;

  filter: drop-shadow(4px 4px 0px rgba(255, 255, 255, 0.2));

  .task-contents-left {
    position: relative;
    width: 342px;

    padding: 16px;

    border-radius: 16px;
    background-color: $white;

    border: 1px solid #E6EBF0;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);

    &:hover::after {
      position: absolute;
      z-index: 1;
      content: '';
      width: 100%;
      height: 100%;

      top: 0%;
      left: 0%;

      border-radius: 16px;
      background-color: #CCCCCC3A;
    }
  }

  .task-contents-right {
    position: relative;
    min-width: 80px;
    max-width: 80px;
    height: 100%;

    border-radius: 16px;
    text-align: center;
    background-color: $lightblue;

    border: 1px solid $lightblue-darken-1;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);

    &::before {
      position: absolute;
      content: '';

      width: -1px;
      height: calc(100% - 32px);
      top: 50%;
      left: 0px;

      transform: translate(-50%, -50%);

      border: 1px dashed;
    }

    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      color: $black;
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

    color: $gray;
  }
}
</style>
