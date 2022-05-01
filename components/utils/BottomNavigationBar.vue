<template>
  <div
    id="bottom-navigation-drawer"
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
          v-if="!mini"
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
  onBeforeMount,
  inject,
} from '@nuxtjs/composition-api'
import {
  mdiCog,
  mdiCogOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiViewDashboard,
  mdiViewDashboardOutline,
} from '@mdi/js'
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
      { title: 'ボード', icon: mdiViewDashboard, icon_outline: mdiViewDashboardOutline, link: '/taskboard' },
      { title: 'ホーム', icon: mdiHomeVariant, icon_outline: mdiHomeVariantOutline, link: '/' },
      { title: '設定', icon: mdiCog, icon_outline: mdiCogOutline, link: '/setting' },
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
#bottom-navigation-drawer {
  & {
    position: fixed;
    z-index: 13;
    width: 100vw;
    min-height: 64px;

    bottom: 0%;
    left: 0%;

    /* border-radius: 16px 16px 0px 0px; */
    filter: drop-shadow(0px 16px 40px rgba(0, 37, 80, 0.2));

    background-color: #0025504D;

    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .link-btn-list {
    display: flex;
    justify-content: space-around;
  }
}

.navi-btn {
  & {
    position: relative;
    display:flex;
    width: 40px;
    height: 40px;

    margin: 12px;

    border: none;
    border-radius: 14px;
    background-color: transparent;

    -webkit-transition: background-color 0.1s linear;
    -moz-transition: background-color 0.1s linear;
    -o-transition: background-color 0.1s linear;
    -ms-transition: background-color 0.1s linear;
    transition: background-color 0.1s linear;
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

    border-radius: 16px;
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

      color: $primary-lighten-1;
    }

    .title {
      line-height: 40px;
      padding: 0px 16px 0px 16px;

      color: $primary-lighten-1;
    }
  }
}
</style>
