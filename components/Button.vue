<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: scssVar(color)
    }"
    :size="size"
    :fab="fab"
    @click="$emit('click')"
  >
    <div class="text">
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import scssVar from '~/composable/scss/returnVariables'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'normal',
      validator: (value: string) => {
        return ['small', 'normal', 'large'].includes(value)
      },
    },
    fab: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    // store

    // const

    // methods

    // lifeCycle

    // other

    return {
      scssVar,
    }
  },
})
</script>

<style lang="scss">
#Button {
  position: relative;
  width: auto;
  height: auto;

  line-height: 28px;
  border: none;
  border-radius: 8px;
  background-color: $primary-lighten-1;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);

  .text {
    display: flex;
    position: relative;
    z-index: 1;
    height: calc(100% - 0.5rem);
    padding: 0.25rem 1em;
    margin: 0px;

    text-align: center;
    font-size: 14px;
    font-weight: normal;
    /* color: $white; */

    justify-content: center;
    align-items: center;
  }

  &:hover::before {
    position: absolute;
    z-index: 2;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }

  &:disabled {
    color: rgba(16, 16, 16, 0.5);
    svg path {
      fill: rgba(16, 16, 16, 0.5);
    }

    &::after {
      position: absolute;
      z-index: 0;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;

      border-radius: 8px;
      background-color: $gray-lighten-2;
    }
  }

  &:disabled:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC00;
  }

  &[fab] {
    .text {
      height: calc(100% - 16px);
      padding: 8px;
    }
  }

  &[size = "small"] {
    width: auto;
    height: 24px;
  }

  &[size = "normal"] {
    width: auto;
    height: 36px;
  }

  &[size = "large"] {
    width: auto;
    height: 64px;
    border-radius: 16px;

    &:hover::before {
      border-radius: 16px;
    }
  }
}
</style>
