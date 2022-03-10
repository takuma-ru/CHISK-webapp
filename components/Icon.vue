<template>
  <span id="icon">
    <svg viewBox="0 0 24 24">
      <path
        :d="icon"
        :fill="scssVar(color)"
      />
    </svg>
  </span>
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
}
</style>
