<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: returnVariables(color)
    }"
    @click="$emit('click')"
  >
    <p class="text">
      <slot />
    </p>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import returnVariables from '~/composable/scss/returnVariables'

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
  },
  setup () {
    // store

    // const

    // methods

    // lifeCycle

    // other

    return {
      returnVariables,
    }
  },
})
</script>

<style lang="scss">
#Button {
  position: relative;
  width: auto;
  height: auto;
  border-radius: 8px;
  background-color: $primary-lighten-1;
  border: none;
  cursor: pointer;

  .text {
    padding: 0.5rem 1em;
    margin: 0px;

    font-size: 16px;
    font-weight: normal;
  }

  &:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }

  &[disabled] {

  }
}
</style>
