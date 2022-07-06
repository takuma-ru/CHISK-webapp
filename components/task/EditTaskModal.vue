<template>
  <div
    v-if="isEdit"
    class="task-modal-edit"
  >
    <div class="task-modal-contents">
      <div class="task-modal-contents-title">
        <TextField
        
        />
      </div>
      <div class="task-modal-edit-contents-date">
        <Icon
          text
          icon="mdiCalendar"
          color="gray-lighten-1"
        />
        <h4 style="margin: 0px">
              &nbsp;
          {{ returnUnixToJp(taskData.dateStart) }} から
          {{ returnUnixToJp(taskData.dateEnd) }} まで
        </h4>
      </div>
      <Divider />
      <div
        class="task-modal-edit-contents-text"
      >
        <span class="title">
          <Icon
            text
            icon="mdiFormatListBulleted"
            color="gray-lighten-1"
            size="1rem"
          />
          &nbsp;詳細
        </span>
        <span class="text">
          {{ taskData.text }}
        </span>
      </div>
    </div>

    <div class="task-modal-edit-action">
      <Divider />
      <div class="button-group">
        <Button
          color="transparent"
          @click=""
        >
          取り消す
        </Button>
        <Button
          text
          color="lightblue"
          icon="mdiPencilOutline"
          @click=""
        >
          保存する
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import scssVar from '~/composable/scss/returnVariables'
import deleteTaskData from '~/composable/firebase/deleteTaskData'
import TextField from '../field/textField.vue'

export default defineComponent({
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        // const
        const { userProfile, } = inject(userProfileKey, useUserProfile()) as userProfileType;
        const taskData = ref<any>({});
        // let, computed
        // watch
        // methods
        // lifeCycle
        onMounted(() => {
        });
        // other
        return {
            taskData,
            userProfile,
            returnUnixToJp,
            scssVar,
            deleteTaskData,
        };
    },
    head: {},
    components: { TextField }
})
</script>

<style lang="scss" scoped>
.task-modal-edit {
  display: flex;
  height: calc(100vh - 20px - 16px - 42px);

  padding: 0px 16px 16px 16px;
  flex-direction: column;
  justify-content: space-between;

  &-contents {
    width: 100%;

    &-title {
      width: 100%;
      display: inline-flex;

      justify-content: space-between;
      align-self: center;

      h2 {
        width: 100%;
        overflow-wrap: break-word;
      }
    }

    &-date {
      display: inline-flex;
    }

    &-text {
      display: flex;
      padding: 0px 0px 16px 0px;

      flex-direction: column;

      .title {
        display: inline-flex;
        margin-bottom: 4px;

        font-size: 14px;
        color: $gray-lighten-1;
      }

      .text {
        white-space: pre-line;
        word-wrap: break-word;
      }
    }
  }

  &-action {
    .button-group {
      display: inline-flex;
      width: 100%;

      justify-content: space-between;
      align-self: center;
    }
  }
}
</style>
