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
        <Icon
          :icon="nowPath === item.link ? item.icon : item.icon_outline"
          color="#FFFFFF"
          class="icon"
        />
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
  inject,
  ref,
  computed,
  useRoute,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import usePageTransition, { pageTransitionKey, pageTransitionType } from '~/composition/pageTransition'

export default defineComponent({
  setup () {
    // const
    const {
      push,
    } = inject(pageTransitionKey, usePageTransition()) as pageTransitionType
    const route = useRoute()
    const mini = ref(true)
    const items = ref([
      { title: 'ホーム', icon: 'mdiHomeVariant', icon_outline: 'mdiHomeVariantOutline', link: '/' },
      { title: 'ボード', icon: 'mdiViewDashboard', icon_outline: 'mdiViewDashboardOutline', link: '/taskboard' },
      { title: '設定', icon: 'mdiCog', icon_outline: 'mdiCogOutline', link: '/setting' },
      /* { title: 'このアプリは？', icon: mdiInformation, icon_outline: mdiInformationOutline, link: '/about' }, */
    ])
    // let, computed
    const nowPath = computed(() => {
      return route.value.path
    })

    // watch

    // methods
    const pushRoute = (path: string) => {
      push(nowPath.value, path)
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

<style lang="scss" scoped>
#navigation-drawer {
  & {
    position: fixed;
    z-index: 13;
    min-width: 64px;
    height: 100vh;

    top: 0%;
    left: 0%;

    /* border-radius: 0px 16px 16px 0px; */
    filter: drop-shadow(0px 16px 40px rgba(0, 37, 80, 0.2));
    /* background-color: $primary; */
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

    border: none;
    border-radius: 12px;
    background-color: transparent;

    -webkit-transition: background-color 0.05s linear;
    -moz-transition: background-color 0.05s linear;
    -o-transition: background-color 0.05s linear;
    -ms-transition: background-color 0.05s linear;
    transition: background-color 0.05s linear;

    cursor: pointer;
  }
  $element: #{&};

  &:hover::before {
    position: absolute;
    z-index: 11;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 12px;
    background-color: #FFFFFF10;
  }

  .icon {
    width: 40px;
    height: 40px;

    color: $white;
  }

  .title {
    line-height: 40px;
    padding: 0px 16px 0px 16px;
  }

  &[active] {
    @extend #{$element};
    background-color: $primary;

    .icon {
      width: 40px;
      height: 40px;

      color: $white;
    }

    .title {
      line-height: 40px;
      padding: 0px 16px 0px 16px;

      color: $primary-lighten-1;
    }
  }
}
</style>
