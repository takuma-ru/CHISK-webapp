<template>
  <div class="add-task-modal">
    <div class="add-button">
      <Button
        color="blue-lighten-1"
        text-color="white"
        size="large"
        fab
        @click="isModal = true"
      >
        <Icon
          text
          icon="mdiPlus"
          size="2rem"
        />
        &nbsp;&nbsp;追加する
      </Button>
    </div>
    <swipe-modal
      v-model="isModal"
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
            icon="mdiFormatTitle"
          />
          <Textarea
            v-model="v$.text.$model"
            :v="v$.text"
            label="詳細説明"
            icon="mdiFormatListBulleted"
          />
          <DateField
            v-model="inputData.dateStart"
            label="開始日"
            icon="mdiCalendarStart"
          />
          <DateField
            v-model="inputData.dateEnd"
            label="終了日"
            :date-start="inputData.dateStart"
            icon="mdiCalendarEnd"
          />
        </div>

        <div class="task-modal-action">
          <Divider />
          <div class="button-group">
            <div />
            <Button
              text
              color="lightblue"
              :disabled="isAddCurrently"
              @click="submit()"
            >
              <Icon
                text
                icon="mdiPlus"
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
  watch,
} from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
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
  title: string,
  text: string,
  dateStart: Date,
  dateEnd: Date,
  tag: Array<string | number>,
}

export default defineComponent({
  components: { TextField, Textarea, DateField },
  setup () {
    // const
    const isModal = ref(false)
    const isAddCurrently = ref(false)
    const inputData = reactive<inputDataType>({
      title: '',
      text: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      tag: [1],
    })
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
    const v$ = useVuelidate(inputDataRules, inputData as inputDataType)

    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType

    // let, computed

    // watch
    watch(isModal, (newIsModal) => {
      if (newIsModal) {
        init()
      }
    })

    // methods
    const init = () => {
      isAddCurrently.value = false
      v$.value.title.$model = ''
      v$.value.text.$model = ''
      v$.value.dateStart.$model = new Date()
      v$.value.dateEnd.$model = new Date()
      v$.value.tag.$model = [1]
    }

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()

      if (isFormCorrect) {
        isAddCurrently.value = true
        if (await addTaskData(userProfile.uid!, {
          title: inputData.title!,
          text: inputData.text!,
          dateStart: Timestamp.fromDate(inputData.dateStart as Date),
          dateEnd: Timestamp.fromDate(inputData.dateEnd as Date),
          group: '進行中',
          completed: null,
          tag: inputData.tag!,
          id: '',
        })) {
          isModal.value = false
        }
      } else {
        isAddCurrently.value = false
        console.log('修正が必要です')
      }
    }

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other

    return {
      isModal,
      inputData,
      isAddCurrently,
      v$,

      submit,
      scssVar,
    }
  },
})
</script>

<style lang="scss" scoped>
.add-task-modal {
  .add-button {
    position: fixed;
    z-index: 15;
    bottom: calc(64px + 16px + constant(safe-area-inset-bottom));
    bottom: calc(64px + 16px + env(safe-area-inset-bottom));
    right: 24px;

    filter: drop-shadow(0px 16px 40px rgba(0, 37, 80, 0.2));
  }

  .task-modal {
    display: flex;
    height: calc(100vh - 20px - 16px - 42px);

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
