<template>
  <button
    id="Button"
    :disabled="disabled"
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

export default defineComponent({
  props: {
    disabled: {
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
