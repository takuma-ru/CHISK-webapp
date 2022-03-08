<template>
  <hr
    class="divider"
    :dashed="dashed"
  >
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dashed: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
  },
})
</script>

<style lang="scss" scoped>
.divider {
  border-top: 2px solid $gray-lighten-1;

  &[dashed] {
    border-top: 2px dashed $gray-lighten-1;
  }
}
</style>
