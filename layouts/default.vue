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

export default defineComponent({
  components: { NavigationBar, BottomNavigationBar, TaskModal, AppBar },
  setup () {
    provide(userProfileKey, useUserProfile())
    provide(userTaskDataKey, useUserTaskData())

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
  margin: 24px;
}

#header {
  display: flex;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
