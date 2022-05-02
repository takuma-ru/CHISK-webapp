<template>
  <hr
    class="divider"
    :dashed="dashed"
    :style="{
      margin: `${margin} 0px`,
      borderTopColor: scssVar(color),
    }"
  >
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import scssVar from '~/composable/scss/returnVariables'

export default defineComponent({
  props: {
    dashed: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: String,
      default: '16px',
    },
    color: {
      type: String,
      default: '#BEC6CF7A',
    },
  },
  setup () {
    return {
      scssVar,
    }
  },
})
</script>

<style lang="scss" scoped>
.divider {
  border-top: 1px solid;
  border-bottom: 0px;
}
</style>
