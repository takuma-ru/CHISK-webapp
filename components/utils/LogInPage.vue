<template>
  <div class="login">
    <div class="title">
      <img src="../../static/icons/icon_64.svg" alt="">
      <span class="name">
        CHISK
      </span>
      <span class="text">
        - 楽しくタスクをこなそう！ -
      </span>
    </div>
    <div class="button-group">
      <div class="items">
        <span class="sub-title">ログインして始める</span>
        <button
          type="button"
          class="login-with-google-btn"
          @click="userProfile.uid ? trySignOut() : trySignIn()"
        >
          {{ userProfile.uid ? 'サインアウト' : 'Googleでサインイン' }}
        </button>
      </div>
    </div>
    <div class="background" />
    <Earth :creatures="15" />
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
import Earth from '../earth/earth.vue'
import auth from '~/composable/firebase/auth'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'

export default defineComponent({
  components: { Earth },
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
.login {
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-items: center;
  justify-content: space-around;
  align-items: center;
  color: $white;

  .title {
    z-index: 99;
    margin-bottom: 32px;
    display: inline-flex;
    flex-flow: column;
    align-items: center;

    img {
      margin-bottom: 0px;
    }

    .name {
      color: #7786FF;
      font-family: 'Rodina';
      font-size: 88px;
      line-height: 88px;
      vertical-align: top;
    }

    .text {
      margin-top: 24px;
    }
  }

  .button-group {
    z-index: 99;
    display: flex;
    flex-flow: column;

    .items {
      display: inline-flex;
      flex-flow: column;
      align-items: center;
      .sub-title {
        font-size: small;
        margin-bottom: 8px;
      }
    }
  }

  .background {
    z-index: 98;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;

    background-color: #002550EA;
  }
}

.login-with-google-btn {
  transition: background-color .3s, box-shadow .3s;
  padding: 8px 16px 8px 42px;
  border: none;
  border-radius: 8px;
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
  }
  &:active {
    background-color: #eeeeee;
  }
  &:focus {
    outline: none;
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, .04),
      0 2px 4px rgba(0, 0, 0, .25),
      0 0 0 3px #c8dafc;
  }
  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
    cursor: not-allowed;
  }
}
</style>
