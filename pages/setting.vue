<template>
  <div class="setting">
    <div class="profile">
      <h3 class="title">
        アカウント情報
      </h3>
      <Divider />
      <div class="main">
        <img :src="userProfile.photoURL">
        <span class="name">
          <Icon
            text
            icon="mdiAccountOutline"
            color="blue-lighten-2"
          />
          {{ userProfile.name }}
        </span>
        <span class="email">
          <Icon
            text
            icon="mdiEmailOutline"
            color="blue-lighten-2"
          />
          {{ userProfile.email }}
        </span>
      </div>
    </div>
    <div class="other">
      <h3 class="title">
        その他の情報
      </h3>
      <Divider />
      <span>version：{{ require('../package.json').version }}</span>
      <a href="https://github.com/takuma-ru/CHISK-webapp" target="_blank">GitHub</a>
      <a href="https://takumaru-homepage.vercel.app/" target="_blank">Homepage</a>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useMeta,
} from '@nuxtjs/composition-api'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'

export default defineComponent({
  setup () {
    // const
    const {
      userProfile,
    } = inject(userProfileKey, useUserProfile()) as userProfileType
    // let, computed
    // methods
    // lifeCycle
    // other
    useMeta({ title: 'Setting' })
    return {
      userProfile,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.setting {
  position: relative;
  display: flex;
  width: 100%;
  height: auto;

  flex-flow: column;
  justify-items: end;

  .title {
    display: inline-flex;

    margin: 0px;
    color: $white;
  }

  .profile {
    width: calc(100% - 32px);
    width: 100%;
    height: auto;

    padding: 16px 0px;
    margin-bottom: 16px;

    border-radius: 16px;
    color: $white;

    .main {
      display: grid;
      height: 100%;
      grid-template-columns: 64px 1fr;
      grid-template-rows: 32px 32px;

      img {
        grid-row: 1 / 2;
        grid-column: 1;
        width: 64px;
        border-radius: 50%;
      }

      .name {
        display: inline-flex;
        grid-row: 1;
        grid-column: 2;
        margin-left: 24px;
        text-align: end;
      }

      .email {
        display: inline-flex;
        grid-row: 2;
        grid-column: 2;
        margin-left: 24px;
      }
    }
  }

  .other{
    display: flex;
    flex-flow: column;

    padding: 16px 0px;
    margin-bottom: 16px;

    color: $white;
  }
}
</style>
