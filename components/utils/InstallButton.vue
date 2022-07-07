<template>
  <Button
    v-if="!isInstalled"
    icon="mdiOpenInApp"
    text-color="white"
    @click="openInstallationPrompt"
  >
    インストールする
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
        .then((choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled home screen install')
          } else {
            console.log('User added to home screen')
          }
          deferredPrompt.value = null
        })
    }

    // lifeCycle
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      console.log(deferredPrompt.value)
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
