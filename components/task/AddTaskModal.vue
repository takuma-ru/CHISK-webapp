<template>
  <div class="add-task-modal">
    <div class="add-button">
      <Button
        color="blue-lighten-1"
        size="large"
        fab
        style="
          filter: drop-shadow(0px 16px 40px rgba(0, 37, 80, 0.2));
        "
        @click="modal = true"
      >
        <Icon
          text
          :icon="mdiPlus"
          color="white"
          size="2rem"
        />
      </Button>
    </div>
    <swipe-modal
      v-model="modal"
      border-top-radius="16px"
      fullscreen
      contents-width="min(100vw, 960px)"
      :contents-color="scssVar('white')"
      background-color="#00255077"
    >
      <div class="task-modal">
        <div class="task-modal-contents">
          <TextField
            v-model="v$.title.$model"
            :v="v$.title"
            label="タイトル"
            :icon="mdiFormatTitle"
          />
          <Textarea
            v-model="v$.text.$model"
            :v="v$.text"
            label="詳細説明"
            :icon="mdiFormatListBulleted"
          />
          <DateField
            v-model="inputData.dateStart"
            label="開始日"
            :icon="mdiCalendarStart"
          />
          <DateField
            v-model="inputData.dateEnd"
            label="終了日"
            :date-start="inputData.dateStart"
            :icon="mdiCalendarEnd"
          />
        </div>

        <div class="task-modal-action">
          <Divider />
          <div class="button-group">
            <Button
              color="transparent"
              @click="modal = false"
            >
              閉じる
            </Button>
            <Button
              text
              color="lightblue"
              @click="submit()"
            >
              <Icon
                text
                :icon="mdiPlus"
                color="gray-darken-1"
              />
              &nbsp;&nbsp;追加する
            </Button>
          </div>
        </div>
      </div>
    </swipe-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  reactive,
  inject,
} from '@nuxtjs/composition-api'
import {
  mdiPlus,
  mdiFormatTitle,
  mdiFormatListBulleted,
  mdiCalendarStart,
  mdiCalendarEnd,
} from '@mdi/js'
import useVuelidate, { ValidationArgs } from '@vuelidate/core'
import {
  required,
  maxLength,
} from '@vuelidate/validators'
import { Timestamp } from 'firebase/firestore'
import TextField from '../field/textField.vue'
import Textarea from '../field/Textarea.vue'
import DateField from '../field/DateField.vue'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import scssVar from '~/composable/scss/returnVariables'
import addTaskData from '~/composable/firebase/addTaskData'

interface inputDataType {
  title: string | null,
  text: string | null,
  dateStart: Date,
  dateEnd: Date,
  tag?: Array<any>,
}

export default defineComponent({
  components: { TextField, Textarea, DateField },
  setup () {
    // const
    const modal = ref(false)
    const inputData = reactive<inputDataType>({
      title: null,
      text: null,
      dateStart: new Date(),
      dateEnd: new Date(),
      tag: [1],
    })
    const inputDataRules = {
      title: {
        required,
        maxLength: maxLength(30),
      },
      text: {
        required,
        maxLength: maxLength(300),
      },
      dateStart: { required },
      dateEnd: { required },
      tag: { required },
    }
    const v$ = useVuelidate<inputDataType, ValidationArgs<inputDataType>>(inputDataRules, inputData)

    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType

    // let, computed

    // methods
    const submit = () => {
      addTaskData(userProfile.uid, {
        title: inputData.title!,
        text: inputData.text!,
        dateStart: Timestamp.fromDate(inputData.dateStart as Date),
        dateEnd: Timestamp.fromDate(inputData.dateEnd as Date),
        group: '進行中',
        completed: null,
        tag: inputData.tag!,
        id: '',
      })
    }

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other

    return {
      modal,
      inputData,
      v$,

      submit,
      scssVar,

      mdiPlus,
      mdiFormatTitle,
      mdiFormatListBulleted,
      mdiCalendarStart,
      mdiCalendarEnd,
    }
  },
})
</script>

<style lang="scss" scoped>
.add-task-modal {
  .add-button {
    position: fixed;
    bottom: 64px + 16px;
    right: 16px;
  }

  .task-modal {
    padding: 0px 16px 16px;
    display: flex;
    height: calc(100vh - 20px - 16px);

    padding: 0px 16px 16px 16px;
    border-radius: 16px;
    flex-direction: column;
    justify-content: space-between;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &-contents {

    }

    &-action {
      .button-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
