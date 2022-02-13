import {
  reactive,
  readonly,
  InjectionKey,
} from '@nuxtjs/composition-api'

interface userProfileDataType {
  name: string | null,
  email: string | null,
  uid: string | null,
}

export default function useUserProfile () {
  const state = {
    userProfile: reactive<userProfileDataType>({
      name: null,
      email: null,
      uid: null,
    }),
  }

  const updateUserProfile = (name: string | null, email: string | null, uid: string | null) => {
    state.userProfile.name = name
    state.userProfile.email = email
    state.userProfile.uid = uid
  }

  const initUserProfile = () => {
    state.userProfile.name = null
    state.userProfile.email = null
    state.userProfile.uid = null
  }

  return {
    userProfile: state.userProfile,

    updateUserProfile,
    initUserProfile,
  }
}

export type userProfileType = ReturnType<typeof useUserProfile>
export const userProfileKey: InjectionKey<userProfileType> = Symbol('userProfileKey')
