/**
  Firebase Authentication周り
**/

import {
  reactive,
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
import { userProfileDataInterface } from '~/composition/userProfile'

export default function auth () {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const nowUser = reactive<userProfileDataInterface>({
    name: null,
    email: null,
    uid: null,
  })

  // ログイン状態を識別
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nowUser.name = user.displayName
      nowUser.email = user.email
      nowUser.uid = user.uid
    } else {
      nowUser.name = null
      nowUser.email = null
      nowUser.uid = null
    }
  })

  // Googleアカウントログイン処理
  const trySignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const token = credential?.accessToken
          const user = result.user
          nowUser.name = user.displayName
          nowUser.email = user.email
          nowUser.uid = user.uid
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

  // ログアウト処理
  const trySignOut = () => {
    signOut(auth).then(() => {
      nowUser.name = null
      nowUser.email = null
      nowUser.uid = null
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    nowUser: readonly(nowUser),

    trySignIn,
    trySignOut,
  }
}
