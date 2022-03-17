<template>
  <div class="dialog">
    <div
      v-if="model"
      class="dialog-contents"
    >
      <slot />
    </div>
    <div
      v-if="model"
      class="dialog-background"
      @click="close()"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Dialog',

  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],
  setup (props, ctx) {
    // const
    const model = computed({
      get: () => props.modelValue,
      set: (value: any) => ctx.emit('update:modelValue', value),
    })

    // methods
    const close = () => {
      model.value = false
    }

    return {
      model,

      close,
    }
  },
})
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 99;
  position: fixed;

  &-contents {
    z-index: 2;
    position: fixed;
    width: auto;
    height: auto;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 16px;

    border-radius: 16px;
    background-color: $white;
  }

  &-background {
    z-index: 1;
    position:fixed;
    width: 100vw;
    height: 100vh;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #80808080;
  }
}
</style>
