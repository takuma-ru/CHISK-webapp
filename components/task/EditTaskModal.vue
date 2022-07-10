<template>
  <div
    v-if="isEdit"
    class="task-modal-edit"
  >
    <div class="task-modal-contents">
      <div class="task-modal-contents-title">
        <TextField
          v-model="v$.title.$model"
          :v="v$.title"
          label="タイトル"
          icon="mdiFormatTitle"
        />
      </div>
      <div class="task-modal-edit-contents-date">
        <DateField
          v-model="inputData.dateStart"
          label="開始日"
          icon="mdiCalendarStart"
        />
        <h4>
          から
        </h4>
        <DateField
          v-model="inputData.dateEnd"
          label="終了日"
          :date-start="inputData.dateStart"
          icon="mdiCalendarEnd"
        />
        <h4>
          まで
        </h4>
      </div>
      <Divider />
      <div
        class="task-modal-edit-contents-text"
      >
        <Textarea
          v-model="v$.text.$model"
          :v="v$.text"
          label="詳細"
          icon="mdiFormatListBulleted"
        />
      </div>
    </div>

    <div class="task-modal-edit-action">
      <Divider />
      <div class="button-group">
        <Button
          color="transparent"
          @click="closeEditModal()"
        >
          取り消す
        </Button>
        <Button
          text
          color="lightblue"
          icon="mdiPlaylistEdit"
          :disabled="isUpdateCurrently"
          @click="submit()"
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
  reactive,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api'
import { maxLength, required } from '@vuelidate/validators'
// eslint-disable-next-line import/no-named-as-default
import useVuelidate from '@vuelidate/core'
import TextField from '../field/textField.vue'
import DateField from '../field/DateField.vue'
import Textarea from '../field/Textarea.vue'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import { userTaskDataInterface } from '~/composition/userTaskData'
import updateTaskData from '~/composable/firebase/updateTaskData'
import returnUnixToJp from '~/composable/utils/returnUnixToJp'
import scssVar from '~/composable/scss/returnVariables'
import deleteTaskData from '~/composable/firebase/deleteTaskData'
import { inputDataInterface } from '~/types/inputDataInterface'

export default defineComponent({
  components: { TextField, DateField, Textarea },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    taskData: {
      type: Object as () => userTaskDataInterface,
      required: true,
    },
  },
  setup (props, ctx: SetupContext) {
    /* -- variable -- */
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType

    /**
     * 更新中フラグ
     */
    const isUpdateCurrently = ref(false)

    /**
     * 入力データ
     */
    const inputData = reactive<inputDataInterface>({
      title: props.taskData.title,
      text: props.taskData.text,
      dateStart: props.taskData.dateStart!,
      dateEnd: props.taskData.dateEnd!,
      tag: [1],
    })

    /**
     * 入力データのバリデート用ルール
     */
    const inputDataRules = {
      title: {
        required,
        maxLength: maxLength(30),
        $lazy: true,
      },
      text: {
        required,
        maxLength: maxLength(300),
        $lazy: true,
      },
      dateStart: { required },
      dateEnd: { required },
      tag: { required },
    }

    /**
     * バリデート状態が含まれた入力データ
     */
    const v$ = useVuelidate(inputDataRules, inputData as any)

    /* -- methods -- */
    /**
     * EditModalを閉じる関数
     */
    const closeEditModal = () => {
      ctx.emit('close')
    }

    /**
     * タスクデータを更新する関数
     */
    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()

      if (isFormCorrect) {
        isUpdateCurrently.value = true
        await updateTaskData(userProfile.uid!, props.taskData.id!, inputData).then((isUpdateSuccess) => {
          if (isUpdateSuccess) {
            isUpdateCurrently.value = false
            ctx.emit('close')
          }
        })
      } else {
        isUpdateCurrently.value = false
        console.log('修正が必要です')
      }
    }

    return {
      isUpdateCurrently,
      inputData,
      v$,

      closeEditModal,
      submit,
      returnUnixToJp,
      scssVar,
      deleteTaskData,
    }
  },
  head: {},
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
      display: grid;

      h4 {
        margin: 0px 40px;
      }
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
