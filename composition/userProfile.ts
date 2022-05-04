/**
  Webアプリ内で使うログイン中のユーザーデータ管理
**/

import {
  reactive,
  shallowReadonly,
  InjectionKey,
  watch,
  ref,
} from '@nuxtjs/composition-api'
import auth from '~/composable/firebase/auth'

export interface userProfileDataInterface {
  name?: string | null,
  email?: string | null,
  uid?: string | null,
  photoURL?: string | null,
}

export default function useUserProfile () {
  /*
    state
  */
  const state = {
    // ユーザーのプロファイルデータ
    userProfile: reactive<userProfileDataInterface>({
      name: undefined,
      email: undefined,
      uid: undefined,
      photoURL: undefined,
    }),

    isLoad: ref<boolean>(true),
  }

  /*
    mutation
  */
  // userProfileを引数のデータで置き換える
  const updateUserProfile = (name: string | null, email: string | null, uid: string | null, photoURL: string | null) => {
    state.userProfile.name = name
    state.userProfile.email = email
    state.userProfile.uid = uid
    state.userProfile.photoURL = photoURL
  }

  // userProfileを初期化
  const initUserProfile = () => {
    state.userProfile.name = null
    state.userProfile.email = null
    state.userProfile.uid = null
    state.userProfile.photoURL = null
  }

  /*
    action
  */
  // auth.tsからログイン状態を取得し、userProfileに代入
  const { nowUser } = auth()
  watch(nowUser, (newNowUser) => {
    if (newNowUser.uid === undefined) {
      state.isLoad.value = true
    } else {
      state.isLoad.value = false
    }
    updateUserProfile(newNowUser.name!, newNowUser.email!, newNowUser.uid!, newNowUser.photoURL!)
  })

  return {
    userProfile: shallowReadonly(state.userProfile),
    isLoad: shallowReadonly(state.isLoad),

    // updateUserProfile,
    initUserProfile,
  }
}

export type userProfileType = ReturnType<typeof useUserProfile>
export const userProfileKey: InjectionKey<userProfileType> = Symbol('userProfileKey')
