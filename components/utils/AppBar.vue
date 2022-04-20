<template>
  <div
    id="app-bar"
  >
    <span class="title">
      {{ nowPage.title }}
    </span>

    <div class="profile">
      <!-- <span style="margin-right: 8px">{{ userProfile.name }}</span> -->
      <Button
        v-if="userProfile.uid"
        color="transparent"
        text-color="white"
        :icon="mdiLogoutVariant"
        style="margin-right: 16px"
        @click="trySignOut()"
      >
        サインアウト
      </Button>
      <Button
        v-else
        color="transparent"
        text-color="white"
        :icon="mdiLoginVariant"
        style="margin-right: 16px"
        @click="trySignIn()"
      >
        サインイン
      </Button>
      <div class="avatar">
        <img
          :src="userProfile.photoURL"
          height="36px"
        >
      </div>
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
  mdiLoginVariant,
  mdiLogoutVariant,
} from '@mdi/js'
import auth from '~/composable/firebase/auth'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'

export default defineComponent({
  setup () {
    // const
    const { trySignIn, trySignOut } = auth()
    const { userProfile } = inject(userProfileKey, useUserProfile()) as userProfileType
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

      mdiLoginVariant,
      mdiLogoutVariant,
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

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: $gray-lighten-1;

        img {
          border-radius: 50%;
        }
      }
    }

    .title {
      color: $white;
      font-size: large;
      font-weight: 600;
      line-height: 36px;
    }
  }
</style>
