<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: scssVar(color)
    }"
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
    padding: 0.25rem 1em;
    margin: 0px;

    text-align: center;
    font-size: 14px;
    font-weight: normal;

    justify-content: center;
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
