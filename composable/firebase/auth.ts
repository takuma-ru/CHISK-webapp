/* eslint-disable no-console */
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
    store
  */
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

  /*
    firebase auth
  */
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      state.userProfile.name = await user.displayName
      state.userProfile.email = await user.email
      state.userProfile.uid = await user.uid
    } else {
      initUserProfile()
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
