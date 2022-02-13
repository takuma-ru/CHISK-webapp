/* eslint-disable no-console */
import {
  reactive,
  InjectionKey,
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

  const state = {
    userProfile: reactive<userProfileDataType>({
      name: null,
      email: null,
      uid: null,
    }),
  }
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      state.userProfile.name = user.displayName
      state.userProfile.email = user.email
      state.userProfile.uid = user.uid
    } else {
      // User is signed out
      // ...
    }
  })

  // google
  const trySignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken
          const user = result.user
          state.userProfile.name = user.displayName
          state.userProfile.email = user.email
          state.userProfile.uid = user.uid
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

  const trySignOut = () => {
    signOut(auth).then(() => {
      console.log('success')
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    userProfile: state.userProfile,

    trySignIn,
    trySignOut,
  }
}

export type authType = ReturnType<typeof auth>
export const authKey: InjectionKey<authType> = Symbol('authKey')
