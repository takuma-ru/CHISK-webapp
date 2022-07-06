<template>
  <Button
    icon="mdiOpenInApp"
    text-color="white"
    @click="openInstallationPrompt"
  >
    インストール画面を開く
  </Button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const openInstallationPrompt = () => {

    }

    return {
      openInstallationPrompt,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
