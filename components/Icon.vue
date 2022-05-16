<template>
  <div
    id="icon"
    :text="text"
    :style="{
      width: size,
      height: size,
      height: `calc(${size} + 4px)`,
      marginRight: text ? '4px' : undefined,
    }"
  >
    <svg viewBox="0 0 24 24">
      <path
        :d="returnMdiIcon(icon)"
        :fill="scssVar(color)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import scssVar from '~/composable/scss/returnVariables'
import returnMdiIcon from '~/composable/utils/returnMdiIcon'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: null,
      require: true,
    },
    color: {
      type: String,
      default: '#489384',
    },
    size: {
      type: String,
      default: '24px',
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {
      scssVar,
      returnMdiIcon,
    }
  },
})
</script>

<style lang="scss">
#icon {
  display: inline-flex;
  margin: auto;

  &[text] {
    margin: 0px;
  }
}
</style>
