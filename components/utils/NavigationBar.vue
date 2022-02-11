<template>
  <div id="navigation-drawer">
    <div
      v-for="item in items"
      :key="item.link"
      class="navi-btn"
    >
      <v-icon class="icon">
        {{ item.icon_outline }}
      </v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    // const
    const isphone = ref(false)
    const mini = ref(true)
    const items = ref([
      { title: 'ホーム', icon: 'mdi-home-variant', icon_outline: 'mdi-home-variant-outline', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard', icon_outline: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: '設定', icon: 'mdi-cog', icon_outline: 'mdi-cog-outline', link: '/setting' },
      { title: 'このアプリは？', icon: 'mdi-information', icon_outline: 'mdi-information-outline', link: '/about' },
      // { title: 'Team', icon: 'mdi-account-multiple-outline', link: '/team' },
    ])
    // let, computed
    // methods
    // lifeCycle
    // other

    return {
      isphone,
      mini,
      items,
    }
  },
  head: {},
})
</script>

<style lang="scss">
  #navigation-drawer {
    position: fixed;
    width: 64px;
    height: 100vh;

    top: 0%;
    left: 0%;

    border-radius: 0px 24px 24px 0px;
    box-shadow: $primary-shadow;
    background-color: $primary-light-1;

    .navi-btn {
      width: 64px;
      height: 64px;

      .icon {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
