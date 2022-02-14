/**
  Firebase Authentication管理
**/
import {
  reactive,
  InjectionKey,
  readonly,
} from '@nuxtjs/composition-api'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth'
import useFirebase from '~/plugins/firebase'

interface userProfileDataType {
  name: string | null,
  email: string | null,
  uid: string | null,
}

export default function auth () {
  useFirebase()

  /*
    ログイン中ユーザーのプロファイル情報
  */
  const state = {
    userProfile: reactive<userProfileDataType>({
      name: null,
      email: null,
      uid: null,
    }),
  }

  // プロファイルを更新
  const updateUserProfile = (name: string | null, email: string | null, uid: string | null) => {
    state.userProfile.name = name
    state.userProfile.email = email
    state.userProfile.uid = uid
  }

  // プロファイルを初期化
  const initUserProfile = () => {
    state.userProfile.name = null
    state.userProfile.email = null
    state.userProfile.uid = null
  }

  /*
    firebase
  */
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  // ログイン状態を識別
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await updateUserProfile(user.displayName, user.email, user.uid)
    } else {
      initUserProfile()
    }
  })

  // Googleアカウントログイン
  const trySignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken
          const user = result.user
          updateUserProfile(user.displayName, user.email, user.uid)
          console.log(token, state.userProfile)
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = GoogleAuthProvider.credentialFromError(error)
          console.error('error code:', errorCode, 'error message:', errorMessage, 'your email:', email)
          console.error(credential)
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message

        console.error('ERROR: firebase/auth \n errorCode', errorCode, '\nerrorMessage', errorMessage)
      })
  }

  // ログアウト
  const trySignOut = () => {
    signOut(auth).then(() => {
      initUserProfile()
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    userProfile: readonly(state.userProfile),

    trySignIn,
    trySignOut,
  }
}

export type authType = ReturnType<typeof auth>
export const authKey: InjectionKey<authType> = Symbol('authKey')
