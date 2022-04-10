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
      contents-height="100%"
      contents-width="min(100vw, 960px)"
      :contents-color="scssVar('white')"
      background-color="#00255077"
    >
      <div class="contents">
        <TextField
          v-model="inputData.title"
          label="タイトル"
        />
        <Textarea
          v-model="inputData.title"
          label="詳細説明"
        />
        {{ inputData.title }}
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
  position: fixed;
  bottom: 64px + 16px;
  right: 16px;

  .contents {
    padding: 0px 16px 16px;
  }
}
</style>
