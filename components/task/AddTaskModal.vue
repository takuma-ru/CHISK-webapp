<template>
  <div class="add-task-modal">
    <div class="add-button">
      <Button
        color="blue-lighten-1"
        size="large"
        fab
        @click="modal = true"
      >
        <Icon
          text
          :icon="mdiPlus"
          color="white"
          size="2rem"
        />
        <!-- &nbsp;&nbsp;追加 -->
      </Button>
    </div>
    <swipe-modal
      v-model="modal"
      border-top-radius="16px"
      contents-height="100vh"
      contents-width="min(100vw, 960px)"
      :contents-color="scssVar('white')"
      background-color="#00255077"
    >
      swipe-modal
    </swipe-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import {
  mdiPlus,
} from '@mdi/js'
import scssVar from '~/composable/scss/returnVariables'

export default defineComponent({
  setup () {
    // const
    const modal = ref(false)

    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other
    useMeta({ title: 'test one' })

    return {
      modal,

      scssVar,

      mdiPlus,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.add-task-modal {
  position: fixed;
  bottom: 64px + 16px;
  right: 16px;
}
</style>
