<template>
  <div>
    <div v-if="step === 'login' || step === undefined" class="sign-up">
      <div class="step-bar">
        <div class="step">
          <h1 class="index">
            1
          </h1>
          <h1 class="title">
            Googleでサインインしよう
          </h1>
        </div>
        <div class="description">
          <p>
            <span>
              タスクデータはクラウド上で管理されます。
            </span>
            <span>
              管理するためには誰がどのタスクを持っているかを識別するためにGoogleアカウントの一部情報を利用させていただきます。
            </span>
          </p>
        </div>
      </div>
      <div class="contents">
        <SignInButton />
      </div>
    </div>
    <div v-if="step === 'create-earth'" class="sign-up">
      <div class="step-bar">
        <div class="step">
          <h1 class="index">
            2
          </h1>
          <h1 class="title">
            あなたの星を作りましょう
          </h1>
        </div>
      </div>
      <div class="contents">
        contetns
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  onBeforeMount,
  useRoute,
  computed,
  inject,
  useMeta,
} from '@nuxtjs/composition-api'
import useUserPlanetData, { userPlanetDataKey, userPlanetDataType } from '~/composition/userPlanetData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import SignInButton from '~/components/utils/SignInButton.vue'

export default defineComponent({
  components: { SignInButton },
  setup () {
    // store
    const { userProfile } = inject(userProfileKey, useUserProfile()) as userProfileType
    const { userPlanetData } = inject(userPlanetDataKey, useUserPlanetData()) as userPlanetDataType
    // const
    const router = useRouter()
    const route = useRoute()
    // let, computed
    const step = computed(() => route.value.query.step)
    // methods
    const setStep = () => {
      if (userProfile.uid === null) {
        router.push('?step=login')
      } else if (userPlanetData.value.name === null) {
        router.push('?step=create-earth')
      }
    }
    // lifeCycle
    onBeforeMount(() => {
      setStep()
    })
    // other
    useMeta({ title: 'SignUp' })
    return {
      step,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.sign-up {
  position: relative;
  width: calc(100vw - 48px);
  height: calc(100vh - 48px);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 56px 1fr;
  align-items: center;

  color: $white;

  .step-bar {
    position: relative;
    grid-column: 1;
    grid-row: 2;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 56px 1fr;

    padding: 0px 24px;

    &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: 100%;
      right: 0px;

      margin: 0px;
      border-width:0;
      background-color: $white;
    }

    .step {
      grid-row: 1;
      grid-column: 1/3;
      display: flex;

      .index {
        align-self: center;

        width: 56px;
        height: 56px;

        line-height: 56px;
        font-size: larger;
        text-align: center;

        margin: 0px;
        border-radius: 16px;
        background-color: $primary;
      }

      .title {
        margin: 0px;
        margin-left: 24px;

        line-height: 56px;
        font-size: larger;
      }
    }

    .description {
      grid-row: 2;

      margin-left: 80px;
    }
  }

  .contents {
    grid-column: 2;
    grid-row: 2;
    justify-self: center;

    margin: 0px 24px;
    text-align: center;
  }
}
</style>
