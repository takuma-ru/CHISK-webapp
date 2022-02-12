<!--
TODO: マウスホバー時にtitleを表示させたい
-->
<template>
  <div
    id="navigation-drawer"
    @mouseover="mini = false"
    @mouseout="mini = true"
  >
    <div
      class="link-btn-list"
    >
      <button
        v-for="item in items"
        :key="item.link"
        :active="nowPath === item.link"
        class="navi-btn"
        @click="pushRoute(item.link)"
      >
        <v-icon class="icon">
          {{ nowPath === item.link ? item.icon : item.icon_outline }}
        </v-icon>
        <span
          v-if="false /*!mini*/"
          class="title"
          v-text="item.title"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useRouter,
  onBeforeMount,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    const route = useRoute()
    const router = useRouter()
    const mini = ref(true)
    const items = ref([
      { title: 'ホーム', icon: 'mdi-home-variant', icon_outline: 'mdi-home-variant-outline', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard', icon_outline: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: '設定', icon: 'mdi-cog', icon_outline: 'mdi-cog-outline', link: '/setting' },
      { title: 'このアプリは？', icon: 'mdi-information', icon_outline: 'mdi-information-outline', link: '/about' },
      // { title: 'Team', icon: 'mdi-account-multiple-outline', link: '/team' },
    ])
    // let, computed
    const nowPath = computed(() => {
      return route.value.fullPath
    })

    // watch

    // methods
    const pushRoute = (path: string) => {
      router.push(path)
    }
    // lifeCycle
    onBeforeMount(() => {
    })
    // other

    return {
      mini,
      items,
      nowPath,

      pushRoute,
    }
  },
  head: {},
})
</script>

<style lang="scss">
  #navigation-drawer {
    & {
      position: fixed;
      min-width: 64px;
      height: 100vh;

      top: 0%;
      left: 0%;

      border-radius: 0px 24px 24px 0px;
      box-shadow: $primary-shadow;
      background-color: $primary-light-1;
    }

    .link-btn-list {
      display: flex;
      flex-flow: column;
      padding: 12px 0px 0px 0px;
    }
  }

.navi-btn {
  & {
    position: relative;
    display:flex;
    min-width: 40px;
    width: auto;
    min-height: 40px;

    margin: 12px;

    border-radius: 16px;
    background-color: $primary-light-1;
  }
  $element: #{&};

  &:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 16px;
    background-color: #FFFFFF10;
  }

  .icon {
    width: 40px;
    height: 40px;

    color: $primary-dark-1;
  }

  .title {
    line-height: 40px;
    padding: 0px 16px 0px 16px;
  }

  &[active] {
    @extend #{$element};
    background-color: $primary-dark-1;

    .icon {
      width: 40px;
      height: 40px;

      color: $primary-light-1;
    }

    .title {
      line-height: 40px;
      padding: 0px 16px 0px 16px;

      color: $primary-light-1;
    }
  }
}
</style>
