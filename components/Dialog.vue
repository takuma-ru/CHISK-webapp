<template>
  <div class="dialog">
    <transition name="dialog-contents-transition">
      <div
        v-if="model"
        class="dialog-contents"
        :style="{
          width: width,
        }"
      >
        <slot />
      </div>
    </transition>
    <transition name="dialog-background-transition">
      <div
        v-if="model"
        class="dialog-background"
        @click="close()"
      />
    </transition>
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
    width: {
      type: String,
      default: 'auto',
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
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 16px;

    border-radius: 16px;
    background-color: $white;

    &-transition {
      &-enter {
        & {
          opacity: 0;
        }
        &-active {
          transition: all 0.2s ease-out;
        }
        &-to {
          opacity: 1;
        }
      }
      &-leave {
        & {
          opacity: 1;
        }
        &-active {
          transition: all 0.05s ease-out;
        }
        &-to {
          opacity: 0;
        }
      }
    }
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

    &-transition {
      &-enter {
        & {
          opacity: 0;
        }
        &-active {
          transition: all 0.2s ease-out;
        }
        &-to {
          opacity: 1;
        }
      }
      &-leave {
        & {
          opacity: 1;
        }
        &-active {
          transition: all 0.2s ease-out;
        }
        &-to {
          opacity: 0;
        }
      }
    }
  }
}
</style>
