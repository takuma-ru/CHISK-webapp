<template>
  <div id="app">
    <div
      id="main"
      :style="{
        marginLeft: userProfile.uid && (route.path !== '/signUp' && route.path !== '/about') ? isPhone ? '0px' : '64px' : '0px',
        marginBottom: userProfile.uid && (route.path !== '/signUp' && route.path !== '/about') ? isPhone ? '64px' : '0px' : '0px'
      }"
    >
      <div v-if="isLoad">
        <Loading />
      </div>
      <div v-else>
        <AppBar v-if="userProfile.uid && (route.path !== '/signUp' && route.path !== '/about')" />
        <div v-if="!userProfile.uid && (route.path === '/' || route.path === '/taskboard' || route.path === '/setting')" id="main-contents-login">
          <LogInPage />
        </div>
        <div v-else id="main-contents">
          <NavigationBar v-if="!isPhone && (route.path !== '/signUp' && route.path !== '/about')" />
          <BottomNavigationBar v-if="isPhone && (route.path !== '/signUp' && route.path !== '/about')" />
          <Nuxt />
          <TaskModal />
          <SnackBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  onMounted,
  provide,
  useRoute,
  onBeforeMount,
  watch,
} from '@nuxtjs/composition-api'
// components
import LogInPage from '../components/layouts/LogInPage.vue'
import Loading from '~/components/layouts/Loading.vue'
import NavigationBar from '~/components/utils/NavigationBar.vue'
import BottomNavigationBar from '~/components/utils/BottomNavigationBar.vue'
import TaskModal from '~/components/task/TaskModal.vue'
import AppBar from '~/components/utils/AppBar.vue'
import SnackBar from '~/components/utils/SnackBar.vue'
// composable
import getIsPhone from '~/composable/utils/isPhone'
// composition
import usePageTransition, { pageTransitionType, pageTransitionKey } from '~/composition/pageTransition'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import useUserTaskData, { userTaskDataKey, userTaskDataType } from '~/composition/userTaskData'
import useUserPlanetData, { userPlanetDataKey, userPlanetDataType } from '~/composition/userPlanetData'
import useSnackBarNoticeData, { snackBarNoticeDataKey, snackBarNoticeDataType } from '~/composition/snackBarNoticeData'

export default defineComponent({
  components: { NavigationBar, BottomNavigationBar, TaskModal, AppBar, LogInPage, Loading, SnackBar },
  setup () {
    provide(pageTransitionKey, usePageTransition())
    provide(userProfileKey, useUserProfile())
    provide(userTaskDataKey, useUserTaskData())
    provide(userPlanetDataKey, useUserPlanetData())
    provide(snackBarNoticeDataKey, useSnackBarNoticeData())

    // const
    const isPhone = ref<boolean>(false)
    const route = useRoute()
    const {
      scssVariables,
    } = inject(pageTransitionKey, usePageTransition()) as pageTransitionType
    const {
      userProfile,
      isLoad,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const {
      getUserTaskData,
    } = inject(userTaskDataKey, useUserTaskData()) as userTaskDataType
    const {
      getUserPlanetData,
    } = inject(userPlanetDataKey, useUserPlanetData()) as userPlanetDataType
    const {
      addSnackBarNoticeData,
    } = inject(snackBarNoticeDataKey, useSnackBarNoticeData()) as snackBarNoticeDataType

    // let, computed

    // watch
    watch(userProfile, async (newUserProfile) => {
      await getUserTaskData(newUserProfile.uid!)
      await getUserPlanetData(newUserProfile.uid!)
    })

    // methods
    const resizeEvent = () => {
      isPhone.value = getIsPhone().isPhone
    }

    // lifeCycle
    onBeforeMount(async () => {
      await getUserTaskData(userProfile.uid!)
      await getUserPlanetData(userProfile.uid!)
    })

    onMounted(() => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('installed')
      } else {
        addSnackBarNoticeData({
          model: true,
          type: 'pwaInstall',
        })
      }
      window.addEventListener('resize', resizeEvent)
      resizeEvent()
      document.documentElement.style.setProperty('--transition-left', scssVariables.value.left)
      document.documentElement.style.setProperty('--transition-top', scssVariables.value.top)
    })

    // other
    return {
      isPhone,
      isLoad,
      route,
      scssVariables,
      userProfile,
    }
  },
})
</script>

<style lang="scss">
:root {
  --transition-left: 0%;
  --transition-top: 0%;
  --is-phone: 'false';
}

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
  font-family: 'M PLUS 1', sans-serif;
  user-select: none;
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

#main-contents-login {
  position: relative;
  max-width: calc(100vw - 48px);
  padding: 24px;
  height: calc(100vh - 48px);
}

#header {
  display: flex;
}

.page {
  &-enter {
    left: var(--transition-left);
    top: var(--transition-top);
    opacity: 0;

    &-active {
      position: relative;
      max-width: 100%;
      transition: all .3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    &-to {
      left: 0px;
      top: 0px;
      opacity: 1;
    }
  }

  &-leave {
    left: 0px;
    top: 0px;
    opacity: 1;

    &-active {
      position: relative;
      max-width: 100%;
      transition: all .3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    &-to {
      left: calc(-1 * var(--transition-left));
      top: calc(-1 * var(--transition-top));
      opacity: 0;
    }
  }
}
</style>
