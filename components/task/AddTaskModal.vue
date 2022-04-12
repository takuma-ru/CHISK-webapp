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
            v-model="inputData.title"
            label="タイトル"
            :icon="mdiPlus"
          />
          <Textarea
            v-model="inputData.text"
            label="詳細説明"
            :icon="mdiPlus"
          />
        </div>

        <div class="task-modal-action">
          <Divider />
          <Button
            @click="modal = false"
          >
            閉じる
          </Button>
          <!-- <div class="button-group">
            <Button
              v-if="taskData.completed"
              color="red-lighten-1"
              @click="inCompleted(userProfile.uid, taskData.id)"
            >
              <Icon
                text
                :icon="mdiClose"
                color="gray-darken-1"
              />
              &nbsp;&nbsp;やっぱり完了じゃない
            </Button>
            <Button
              v-else
              text
              color="lightblue"
              @click="completed(userProfile.uid, taskData.id)"
            >
              <Icon
                text
                :icon="mdiCheck"
                color="gray-darken-1"
              />
              &nbsp;&nbsp;完了とする！
            </Button>
            <div class="icon-group">
              <Button
                color="transparent"
              >
                <Icon
                  text
                  :icon="mdiPencilOutline"
                  color="black"
                  size="1.5rem"
                />
              </Button>
              <Button
                color="transparent"
                @click="dialog = true"
              >
                <Icon
                  text
                  :icon="mdiTrashCanOutline"
                  color="black"
                  size="1.5rem"
                />
              </Button>
            </div>
          </div> -->
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
} from '@nuxtjs/composition-api'
import {
  mdiPlus,
} from '@mdi/js'
import { Timestamp } from 'firebase/firestore'
import TextField from '../field/textField.vue'
import Textarea from '../field/Textarea.vue'
import scssVar from '~/composable/scss/returnVariables'

interface inputData {
  title?: string,
  text?: string,
  dateStart?: Timestamp | Date,
  dateEnd?: Timestamp | Date,
  group?: string,
  completed?: Timestamp | Date,
  tag?: Array<any>,
}

export default defineComponent({
  components: { TextField, Textarea },
  setup () {
    // const
    const modal = ref(false)
    const inputData = reactive<inputData>({
      title: undefined,
      text: undefined,
      dateStart: new Date(),
      dateEnd: new Date(),
      group: undefined,
      completed: new Date(),
      tag: [],
    })

    // let, computed

    // methods

    // lifeCycle
    onBeforeMount(async () => {
    })

    // other

    return {
      modal,
      inputData,
      scssVar,
      mdiPlus,
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
    flex-direction: column;
    justify-content: space-between;

    &-contents {

    }
  }
}
</style>
