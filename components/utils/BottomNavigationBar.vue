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
        <v-icon class="icon">
          {{ nowPath === item.link ? item.icon : item.icon_outline }}
        </v-icon>
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
      { title: 'ボード', icon: 'mdi-view-dashboard', icon_outline: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: 'ホーム', icon: 'mdi-home-variant', icon_outline: 'mdi-home-variant-outline', link: '/' },
      { title: '設定', icon: 'mdi-cog', icon_outline: 'mdi-cog-outline', link: '/setting' },
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
  #bottom-navigation-drawer {
    & {
      position: fixed;
      width: 100vw;
      height: 64px;

      bottom: 0%;
      left: 0%;

      border-radius: 24px 24px 0px 0px;
      box-shadow: $primary-shadow;
      background-color: $primary-light-1;

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
