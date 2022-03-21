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
  border-top: 1px solid $gray-lighten-2;
  border-bottom: 0px;
  margin: 16px 0px;
}
</style>
