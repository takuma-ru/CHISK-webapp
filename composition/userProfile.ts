/**
  Webアプリ内で使うログイン中のユーザーデータ管理
**/

import {
  reactive,
  readonly,
  InjectionKey,
  watch,
} from '@nuxtjs/composition-api'
import auth from '~/composable/firebase/auth'

export interface userProfileDataInterface {
  name: string | null,
  email: string | null,
  uid: string | null,
}

export default function useUserProfile () {
  /*
    state
  */
  const state = {
    // ユーザーのプロファイルデータ
    userProfile: reactive<userProfileDataInterface>({
      name: null,
      email: null,
      uid: null,
    }),
  }

  /*
    mutation
  */
  // userProfileを引数のデータで置き換える
  const updateUserProfile = (name: string | null, email: string | null, uid: string | null) => {
    state.userProfile.name = name
    state.userProfile.email = email
    state.userProfile.uid = uid
  }

  // userProfileを初期化
  const initUserProfile = () => {
    state.userProfile.name = null
    state.userProfile.email = null
    state.userProfile.uid = null
  }

  /*
    action
  */
  // auth.tsからログイン状態を取得し、userProfileに代入
  const { nowUser } = auth()
  watch(nowUser, (newNowUser) => {
    updateUserProfile(newNowUser.name, newNowUser.email, newNowUser.uid)
  })

  return {
    userProfile: readonly(state.userProfile),

    // updateUserProfile,
    initUserProfile,
  }
}

export type userProfileType = ReturnType<typeof useUserProfile>
export const userProfileKey: InjectionKey<userProfileType> = Symbol('userProfileKey')
