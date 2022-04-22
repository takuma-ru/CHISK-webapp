<template>
  <div id="app">
    <NavigationBar v-if="!isPhone" />
    <BottomNavigationBar v-if="isPhone" />
    <div
      id="main"
      :style="{
        marginLeft: isPhone ? '0px' : '64px',
        marginBottom: isPhone ? '64px' : '0px'
      }"
    >
      <AppBar />
      <div id="main-contents">
        <Nuxt />
        <TaskModal />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  provide,
} from '@nuxtjs/composition-api'
// components
import NavigationBar from '~/components/utils/NavigationBar.vue'
import BottomNavigationBar from '~/components/utils/BottomNavigationBar.vue'
import TaskModal from '~/components/task/TaskModal.vue'
import AppBar from '~/components/utils/AppBar.vue'
// composable
import getIsPhone from '~/composable/utils/isPhone'
// composition
import useUserProfile, { userProfileKey } from '~/composition/userProfile'
import useUserTaskData, { userTaskDataKey } from '~/composition/userTaskData'
import useUserPlanetData, { userPlanetDataKey } from '~/composition/userPlanetData'

export default defineComponent({
  components: { NavigationBar, BottomNavigationBar, TaskModal, AppBar },
  setup () {
    provide(userProfileKey, useUserProfile())
    provide(userTaskDataKey, useUserTaskData())
    provide(userPlanetDataKey, useUserPlanetData())

    // const
    const isPhone = ref<boolean>(false)
    // let, computed
    // methods
    const resizeEvent = () => {
      isPhone.value = getIsPhone().isPhone
    }
    // lifeCycle
    onMounted(() => {
      window.addEventListener('resize', resizeEvent)
      resizeEvent()
    })
    // other
    return {
      isPhone,
    }
  },
})
</script>

<style lang="scss">
html {
  width: 100%;
  overscroll-behavior-y: none;
  background-color: $background;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  font-family: 'Noto Sans JP', sans-serif;
  scrollbar-width: none;
  margin: 0px;
}

#main {
  height: 100%;
}

#main-contents {
  position: relative;
  max-width: calc(100vw - 48px);
  margin: 24px;
}

#header {
  display: flex;
}

.page-enter {
  left: -100%;
}
.page-enter-active {
  position: relative;
  max-width: 100%;
  transition: all .3s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-enter-to {
  left: 0px;
}

.page-leave {
  left: 0px;
}
.page-leave-active {
  position: relative;
  max-width: 100%;
  transition: all .2s cubic-bezier(0.64, 0, 0.78, 0);
}
.page-leave-to {
  left: 100%;
}
</style>
