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
import NavigationBar from '~/components/utils/NavigationBar.vue'
import BottomNavigationBar from '~/components/utils/BottomNavigationBar.vue'
import getIsPhone from '~/composable/utils/isPhone'
import useUserProfile, { userProfileKey } from '~/composition/userProfile'
import TaskModal from '~/components/task/TaskModal.vue'

export default defineComponent({
  components: { NavigationBar, BottomNavigationBar, TaskModal },
  setup () {
    provide(userProfileKey, useUserProfile())

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
  overscroll-behavior-y: none;
  background-color: $primary;
}
body {
  font-family: 'Noto Sans JP', sans-serif;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
body::-webkit-scrollbar {
  display:none;
}

#main-contents {
  margin: 24px;
}
</style>
