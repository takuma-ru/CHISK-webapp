<template>
  <button
    type="button"
    :class="providerContents.class"
    @click="userProfile.uid ? trySignOut() : trySignIn(providerContents.provider)"
  >
    {{ userProfile.uid ? 'サインアウト' : providerContents.text }}
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  computed,
} from '@nuxtjs/composition-api'
import auth from '~/composable/firebase/auth'
import useUserProfile, { userProfileKey, userProfileType } from '~/composition/userProfile'

export default defineComponent({
  props: {
    provider: {
      type: String,
      default: 'google',
      validator: (value: string) => {
        return ['google', 'github'].includes(value)
      },
    },
  },

  setup (props) {
    // const
    const { userProfile } = inject(userProfileKey, useUserProfile()) as userProfileType
    const { trySignIn, trySignOut } = auth()

    const providerContents = computed(() => {
      let value = {
        provider: 'google' as 'google' | 'github' | undefined,
        class: 'login-with-google-btn',
        text: 'Googleでサインイン',
      }

      if (props.provider === 'google') {
        value = {
          provider: 'google',
          class: 'login-with-btn-google',
          text: 'Googleでサインイン',
        }
      } else if (props.provider === 'github') {
        value = {
          provider: 'github',
          class: 'login-with-btn-github',
          text: 'Githubでサインイン',
        }
      }

      return value
    })

    return {
      providerContents,

      userProfile,
      trySignIn,
      trySignOut,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-with-btn {
  & {
    transition: background-color .3s, box-shadow .3s;
    padding: 8px 16px 8px 42px;
    margin: 8px 0px;
    border: none;
    border-radius: 8px;
    color: #757575;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
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

  $element: #{&};

  &-google {
    @extend #{$element};
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  }

  &-github {
    @extend #{$element};
    background-image: url(../../assets/mark-github.svg);
  }
}
</style>
