<template>
  <div id="icon" :text="text">
    <svg viewBox="0 0 24 24">
      <path
        :d="icon"
        :fill="scssVar(color)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import scssVar from '~/composable/scss/returnVariables'

export default defineComponent({
  props: {
    icon: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      default: '#489384',
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {
      scssVar,
    }
  },
})
</script>

<style lang="scss">
#icon {
  width: 24px;
  height: 24px;

  margin: auto;

  &[text] {
    height: 0.8rem;
    margin: 0px;
  }
}
</style>
