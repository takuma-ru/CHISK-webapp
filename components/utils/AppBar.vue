<template>
  <div
    id="app-bar"
  >
    <span class="title">
      {{ nowPage.title }}
    </span>

    <div class="profile">
      <!-- <span style="margin-right: 8px">{{ userProfile.name }}</span> -->
      <img
        :src="userProfile.photoURL"
        alt="Avatar"
        height="36px"
        style="border-radius: 50%;"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
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
import auth from '~/composable/firebase/auth'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'

export default defineComponent({
  setup () {
    // const
    const {
      trySignIn,
      trySignOut,
    } = auth()
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    const route = useRoute()
    const items = ref([
      { title: 'タスクボード', icon: mdiViewDashboard, icon_outline: mdiViewDashboardOutline, link: '/taskboard' },
      { title: '', icon: mdiHomeVariant, icon_outline: mdiHomeVariantOutline, link: '/' },
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
      userProfile,

      trySignIn,
      trySignOut,
    }
  },
})
</script>

<style lang="scss" scoped>
  #app-bar {
    z-index: 12;
    display: flex;
    position: relative;
    width: auto;
    height: 36px;

    margin: 16px 24px 0px 24px;

    justify-content: space-between;

    .profile {
      display: inline-flex;
      align-items: center;

      color: $gray-lighten-2;
    }

    .title {
      color: $white;
      font-size: large;
      font-weight: 600;
      line-height: 36px;
    }
  }
</style>
