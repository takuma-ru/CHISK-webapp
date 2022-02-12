import { useContext } from '@nuxtjs/composition-api'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default function useFirebase () {
  const { $config } = useContext()

  const firebaseConfig = {
    apiKey: $config.API_KEY as string,
    authDomain: $config.AUTH_DOMAIN as string,
    databaseURL: $config.DATABASE_URL as string,
    projectId: $config.PROJECT_ID as string,
    storageBucket: $config.STORAGE_BUCKET as string,
    messagingSenderId: $config.MESSAGING_SENDERID as string,
    appId: $config.APP_ID as string,
    measurementId: $config.MEASUREMENT_ID as string,
  }

  let firebaseApp
  const apps = getApps()
  if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
  } else {
    firebaseApp = apps[0]
  }

  const firestore = getFirestore(firebaseApp)

  return {
    firebaseConfig,
    firebaseApp,
    firestore,
  }
}
