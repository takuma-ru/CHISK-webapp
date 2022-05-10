<template>
  <hr
    class="divider"
    :dashed="dashed"
    :vertical="vertical"
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
    vertical: {
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

<style lang="scss" scoped>
.divider {
  border-top: 1px solid;
  border-bottom: 0px;

  &[vertical] {
    width: 1px;
    height: 100%;
    border-width:0;
    margin: 0px;
  }
}
</style>
