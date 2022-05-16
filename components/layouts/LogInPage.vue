<template>
  <div class="login">
    <div class="title">
      <img src="../../static/icons/title-logo.svg" alt="">
      <span class="text">
        - 楽しくタスクをこなそう！ -
      </span>
    </div>
    <div class="button-group">
      <div class="items">
        <span class="sub-title">ログインして始める</span>
        <SignInButton />
        <span class="sub-title">初めての方はこちら</span>
        <Button
          color="red-lighten-1"
          text-color="white"
          icon="mdiAccountPlus"
          to="/signUp?step=login"
        >
          サインアップ
        </Button>
      </div>
    </div>
    <small class="copyright">
      &copy;&nbsp;takuma-ru
    </small>
    <div class="background" />
    <Earth :creatures="15" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import Earth from '../earth/earth.vue'
import SignInButton from '../utils/SignInButton.vue'

export default defineComponent({
  components: { Earth, SignInButton },
  setup () {
    // const

    return {
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
      width: calc(90vmin - 48px);
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
        margin-top: 24px;
        margin-bottom: 8px;
      }
    }
  }

  .copyright {
    z-index: 99;
    position: absolute;
    bottom: 16px;
    color: $white;
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
</style>
