<template>
  <div class="snack-bar-group">
    <div class="snack-bar">
      <div class="icon">
        <Icon
          color="red-lighten-2"
          icon="mdiClose"
        />
      </div>
      <div class="contents">
        テキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </div>
      <div class="actions">
        <Icon
          color="black"
          icon="mdiClose"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import returnMdiIcon from '~/composable/utils/returnMdiIcon'

export default defineComponent({
  setup () {
    return {
      returnMdiIcon,
    }
  },
})
</script>

<style lang="scss" scoped>
.snack-bar-group {
  z-index: 10;
  position: fixed;

  top: 56px;
  right: 0px;

  padding: 24px;
}

.snack-bar {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;

  width: min(calc(100vw - 24px), 342px);
  min-height: 48px;

  border-radius: 12px;
  background-color: $red-lighten-2;
  box-shadow: 0px 16px 40px rgba(0, 37, 80, 0.3);

  .icon {
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;

    background-color: $red;
    border-radius: 12px 0px 0px 12px;
  }

  .contents {
    padding: 8px;
  }

  .actions {
    justify-self: center;

    cursor: pointer;
  }
}
</style>
