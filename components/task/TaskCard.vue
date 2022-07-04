<template>
  <div
    :id="taskData.id"
    class="task-card"
  >
    <div
      :completed="isCompleted"
      class="task-card-completed-button"
      @click="isCompleted ? inCompleted(userProfile.uid, taskData.id) : completed(userProfile.uid, taskData.id)"
    >
      <Icon
        v-if="isCompleted"
        icon="mdiCheckboxOutline"
        color="red-darken-1"
        size="32px"
      />
      <Icon
        v-else
        icon="mdiCheckboxBlankOutline"
        color="lightblue-darken-1"
        size="32px"
      />
      <span
        :completed="isCompleted"
        v-text="isCompleted ? '完了済み' : '押して完了'"
      />
    </div>
    <div
      class="task-card-contents"
      @click="router.push('?taskId=' + taskData.id)"
    >
      <span class="task-title">
        {{ taskData.title }}
      </span>
      <span
        class="task-date"
      >
        <Icon
          text
          icon="mdiCalendar"
          size="20px"
          color="gray-lighten-1"
          style="margin-right: 4px"
        />
        {{ dateEnd }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  useRouter,
  computed,
  inject,
} from '@nuxtjs/composition-api'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import completedTaskData from '~/composable/firebase/completedTaskData'

export default defineComponent({
  props: {
    taskData: {
      type: Object,
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
    const isCompleted = computed(() => {
      return props.taskData.completed !== (undefined || null)
    })

    // methods
    const { completed, inCompleted } = completedTaskData()

    // lifeCycle
    onBeforeMount(async () => {
    })
    // other

    return {
      router,
      dateEnd,
      userProfile,
      isCompleted,

      returnUnixToJp,
      completed,
      inCompleted,
    }
  },
})
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  width: calc(100vw - 48px);
  max-width: 342px;
  height: 96px;
  min-height: 96px;
  max-height: 96px;

  margin: 4px 0px;

  background-color: $white;
  border-radius: 16px;
  transition: all 0.2s linear;

  &-completed-button {
    position: absolute;
    left: 0px;
    width: 104px;
    height: 100%;

    background-color: $lightblue-lighten-1;
    border-radius: 16px 0px 0px 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    cursor: pointer;

    &[completed] {
      background-color: $red-lighten-1;
    }

    span {
      position: absolute;
      top: 50%;
      left: 16px;

      transform: translate(-50%, -50%) rotate(-90deg);
      font-size: 10px;
      font-weight: bold;
      color: $lightblue-darken-1;

      &[completed] {
        color: $red-darken-1;
      }
    }

    #icon {
      position: absolute;
      top: 50%;
      left: calc(50% - 16px);
      transform: translate(calc(8px - 50%), -50%);
    }
  }

  &-contents {
    display: flex;
    flex-flow: column;
    justify-content: space-around;

    position: absolute;
    right: 0px;
    width: calc(100% - 88px);
    height: calc(100%);

    padding: 8px;
    padding-right: 24px;

    background-color: $white;
    border-radius: 8px 16px 16px 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    cursor: pointer;

    .task-title {
      position: relative;

      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
      white-space: nowrap;
      overflow: hidden;

      &::after {
        content: '';

        position: absolute;
        width: 40px;
        height: 100%;
        right: 0px;

        background: linear-gradient(270deg, #FFFFFF -3.05%, rgba(255, 255, 255, 0.8) 39.14%, rgba(255, 255, 255, 0.1) 76.17%, rgba(255, 255, 255, 0) 102.44%);
      }
    }

    .task-date {
      display: inline-flex;
      align-items: flex-end;

      color: $gray;
    }
  }
}
</style>
