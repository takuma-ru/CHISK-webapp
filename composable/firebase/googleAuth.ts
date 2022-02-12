import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import useFirebase from '~/plugins/firebase'

export default function googleAuth () {
  useFirebase()
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  const trySignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user
      // ...
      console.log(token, user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      console.error('error code:', errorCode, 'error message:', errorMessage, 'your email:', email)
      console.error(credential)
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
    trySignIn,
    trySignOut,
  }
}
