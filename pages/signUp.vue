<template>
  <div>
    <div v-if="step === 'login' || step === undefined" class="sign-up">
      <div class="step-bar" :isPhone="isPhone.isPhone">
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
              管理するためには誰がどのタスクを持っているかを識別するため必要があり、それにGoogleアカウントのユーザーIDを利用させていただきます。
            </span>
          </p>
        </div>
      </div>
      <div class="contents" :isPhone="isPhone.isPhone">
        <SignInButton />
      </div>
      <div class="actions">
        <Button
          color="red-lighten-1"
          :icon="mdiChevronLeft"
          to="/"
        >
          トップに戻る
        </Button>
        <Button
          color="lightblue"
          :icon="mdiChevronRight"
          :disabled="userProfile.uid ? false : true"
          to="?step=create-earth"
        >
          次のステップ へ
        </Button>
      </div>
    </div>

    <div v-if="step === 'create-earth'" class="sign-up">
      <div class="step-bar" :isPhone="isPhone.isPhone">
        <div class="step">
          <h1 class="index">
            2
          </h1>
          <h1 class="title">
            あなたの星を作りましょう
          </h1>
        </div>
        <div class="description">
          <p>
            <span>
              今後のあなたの努力はここで作った星に少しづつ蓄積されていきます。
            </span>
          </p>
        </div>
      </div>
      <div class="contents" :isPhone="isPhone.isPhone">
        <TextField
          v-model="v$.name.$model"
          :v="v$.name"
          label="星の名前"
          :icon="mdiEarth"
          dark
        />
      </div>
      <div class="actions">
        <Button
          color="red-lighten-1"
          :icon="mdiChevronLeft"
          to="?step=login"
        >
          サインインに戻る
        </Button>
        <Button
          color="lightblue"
          :icon="mdiCheck"
          @click="submit()"
        >
          星を作る
        </Button>
      </div>
    </div>

    <div v-if="step === 'complete'" class="sign-up">
      <div class="step-bar" :isPhone="isPhone.isPhone">
        <div class="step">
          <h1 class="index">
            3
          </h1>
          <h1 class="title">
            始めましょう！
          </h1>
        </div>
      </div>
      <div class="contents" :isPhone="isPhone.isPhone">
        <span>
          お疲れ様です。では早速使ってみましょう！
        </span><br>
        <span>
          右下の「使い始める！」を押して下さい。
        </span>
      </div>
      <div class="actions">
        <div />
        <Button
          color="lightblue"
          :icon="mdiChevronRight"
          to="/"
        >
          使い始める！
        </Button>
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
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiEarth,
  mdiCheck,
} from '@mdi/js'
import useVuelidate from '@vuelidate/core'
import {
  required,
  maxLength,
} from '@vuelidate/validators'
import useUserPlanetData, { userPlanetDataKey, userPlanetDataType } from '~/composition/userPlanetData'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'
import SignInButton from '~/components/utils/SignInButton.vue'
import Button from '~/components/Button.vue'
import TextField from '~/components/field/textField.vue'
import createPlanet from '~/composable/firebase/createPlanet'
import getIsPhone from '~/composable/utils/isPhone'

interface inputDataType {
  name: string
}

export default defineComponent({
  components: { SignInButton, Button, TextField },
  setup () {
    // store
    const { userProfile } = inject(userProfileKey, useUserProfile()) as userProfileType
    const { userPlanetData } = inject(userPlanetDataKey, useUserPlanetData()) as userPlanetDataType

    // const
    const router = useRouter()
    const route = useRoute()
    const isPhone = getIsPhone()
    const isAddCurrently = ref<boolean>(false)
    const inputData = reactive<inputDataType>({
      name: '',
    })
    const inputDataRules = {
      name: {
        required,
        maxLength: maxLength(30),
        $lazy: true,
      },
    }
    const v$ = useVuelidate(inputDataRules, inputData as inputDataType)

    // let, computed
    const step = computed(() => route.value.query.step)

    // methods
    const setStep = () => {
      if (userPlanetData.value.name === null) {
        if (userProfile.uid === null) {
          router.push('?step=login')
        } else {
          router.push('?step=create-earth')
        }
      } else {
        router.push('?step=complete')
      }
    }

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()

      if (isFormCorrect) {
        isAddCurrently.value = true
        await createPlanet(userProfile.uid!, inputData.name).then((res) => {
          console.log(res)
          if (res) { router.push('?step=complete') }
        })
      } else {
        isAddCurrently.value = false
        console.log('修正が必要です')
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
      v$,
      isPhone,

      userProfile,
      userPlanetData,

      submit,

      mdiChevronLeft,
      mdiChevronRight,
      mdiEarth,
      mdiCheck,
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
  grid-template-rows: 56px 1fr 1fr 56px;
  align-items: center;

  color: $white;

  .step-bar {
    position: relative;
    grid-column: 1;
    grid-row: 2/4;

    &[isPhone] {
      grid-column: 1/3;
      grid-row: 2;
    }

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 56px 1fr;

    padding: 0px 24px;

    /* &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: 100%;
      right: 0px;

      margin: 0px;
      border-width:0;
      background-color: $white;
    } */

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

      color: $gray-lighten-2;
    }
  }

  .contents {
    grid-column: 2;
    grid-row: 2/4;
    justify-self: center;

    &[isPhone] {
      grid-column: 1/3;
      grid-row: 3;
    }

    margin: 0px 24px;
    text-align: center;
  }

  .actions {
    grid-column: 1/3;
    grid-row: 4;

    display: flex;
    justify-content: space-between;
    align-self: center;
  }
}
</style>
