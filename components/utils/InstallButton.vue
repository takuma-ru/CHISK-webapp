<template>
  <Button
    v-if="!isInstalled"
    icon="mdiOpenInApp"
    text-color="white"
    @click="openInstallationPrompt"
  >
    インストール画面を開く
  </Button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // cconst
    const deferredPrompt = ref<any | null>(null)

    // computed
    const isInstalled = computed(() => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true
      } else {
        return false
      }
    })

    // methods
    const openInstallationPrompt = () => {
      deferredPrompt.value?.prompt()
      deferredPrompt.value?.userChoice
        .then(function (choiceResult: { outcome: string }) {
          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled home screen install')
          } else {
            console.log('User added to home screen')
          }
          deferredPrompt.value = null
        })
    }

    // lifeCycle
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault()
      console.log(e)

      deferredPrompt.value = e

      return false
    })

    return {
      isInstalled,

      openInstallationPrompt,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
