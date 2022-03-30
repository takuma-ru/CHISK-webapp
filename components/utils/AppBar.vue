<template>
  <div
    v-if="nowPage != items[1]"
    id="app-bar"
  >
    {{ nowPage.title }}
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import {
  mdiCog,
  mdiCogOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiInformation,
  mdiInformationOutline,
  mdiViewDashboard,
  mdiViewDashboardOutline,
} from '@mdi/js'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()
    const items = ref([
      { title: 'ボード', icon: mdiViewDashboard, icon_outline: mdiViewDashboardOutline, link: '/taskboard' },
      { title: 'ホーム', icon: mdiHomeVariant, icon_outline: mdiHomeVariantOutline, link: '/' },
      { title: '設定', icon: mdiCog, icon_outline: mdiCogOutline, link: '/setting' },
      { title: 'このアプリは？', icon: mdiInformation, icon_outline: mdiInformationOutline, link: '/about' },
    ])
    // let, computed
    const nowPage = computed(() => {
      let item = items.value.find(element => element.link === route.value.path)
      if (item === undefined) {
        item = { title: 'Not Found', icon: mdiViewDashboard, icon_outline: mdiViewDashboardOutline, link: '' }
      }
      return item
    })

    return {
      nowPage,
      items,
    }
  },
})
</script>

<style lang="scss" scoped>
  #app-bar {
    position: relative;
    width: 100%;
    height: 56px;
  }
</style>
