/**
  Firebase Authentication周り
**/

import {
  reactive,
  shallowReadonly,
  useRouter,
} from '@nuxtjs/composition-api'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  GithubAuthProvider,
} from 'firebase/auth'
import { userProfileDataInterface } from '~/composition/userProfile'

export default function auth () {
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth()
  const nowUser = reactive<userProfileDataInterface>({
    name: undefined,
    email: undefined,
    uid: undefined,
    photoURL: undefined,
  })

  // ログイン状態を識別
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nowUser.name = user.displayName
      nowUser.email = user.email
      nowUser.uid = user.uid
      nowUser.photoURL = user.photoURL
    } else {
      nowUser.name = null
      nowUser.email = null
      nowUser.uid = null
      nowUser.photoURL = null
    }
  })

  // Googleアカウントログイン処理
  const trySignIn = (type?: 'google' | 'github') => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, type === 'google' ? googleProvider : type === 'github' ? githubProvider : googleProvider).then((result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const token = credential?.accessToken
          const user = result.user
          nowUser.name = user.displayName
          nowUser.email = user.email
          nowUser.uid = user.uid
          nowUser.photoURL = user.photoURL
        }).catch((error) => {
          /* if (error.code === 'auth/account-exists-with-different-credential') {
            // Step 2.
            // User's email already exists.
            // The pending GitHub credential.
            const pendingCred = error.credential
            // The provider account's email address.
            const email = error.email
            // Get sign-in methods for this email.
            auth.fetchSignInMethodsForEmail(email).then(function (methods) {
              // Step 3.
              // If the user has several sign-in methods,
              // the first method in the list will be the "recommended" method to use.
              if (methods[0] === 'password') {
                // Asks the user their password.
                // In real scenario, you should handle this asynchronously.
                const password = promptUserForPassword() // TODO: implement promptUserForPassword.
                auth.signInWithEmailAndPassword(email, password).then(function (result) {
                  // Step 4a.
                  return result.user.linkWithCredential(pendingCred)
                }).then(function () {
                  // GitHub account successfully linked to the existing Firebase user.
                  goToApp()
                })
                return
              }
              // All the other cases are external providers.
              // Construct provider object for that provider.
              // TODO: implement getProviderForProviderId.
              const provider = getProviderForProviderId(methods[0])
              // At this point, you should let the user know that they already have an account
              // but with a different provider, and let them validate the fact they want to
              // sign in with this provider.
              // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
              // so in real scenario you should ask the user to click on a "continue" button
              // that will trigger the signInWithPopup.
              auth.signInWithPopup(provider).then(function (result) {
                // Remember that the user may have signed in with an account that has a different email
                // address than the first one. This can happen as Firebase doesn't control the provider's
                // sign in flow and the user is free to login using whichever account they own.
                // Step 4b.
                // Link to GitHub credential.
                // As we have access to the pending credential, we can directly call the link method.
                result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
                  // GitHub account successfully linked to the existing Firebase user.
                  goToApp()
                })
              })
            })
          } */

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
      nowUser.photoURL = null
      router.go(0)
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    nowUser: shallowReadonly(nowUser),

    trySignIn,
    trySignOut,
  }
}
