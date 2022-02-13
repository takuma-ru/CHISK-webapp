import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default function useFirebase () {
  // const { $config } = useContext()

  const firebaseConfig = {
    apiKey: 'AIzaSyDFTTsWomYfk-X5DciDbGxjYuGIb4x0T4w',
    authDomain: 'taskmgt-fd097.firebaseapp.com',
    databaseURL: 'https://taskmgt-fd097.firebaseio.com',
    projectId: 'taskmgt-fd097',
    storageBucket: 'taskmgt-fd097.appspot.com',
    messagingSenderId: '970777017612',
    appId: '1:970777017612:web:d9be75da11de96ace51d29',
    measurementId: 'G-WR4VX2SMJK',
    /* apiKey: $config.API_KEY as string,
      authDomain: $config.AUTH_DOMAIN as string,
      databaseURL: $config.DATABASE_URL as string,
      projectId: $config.PROJECT_ID as string,
      storageBucket: $config.STORAGE_BUCKET as string,
      messagingSenderId: $config.MESSAGING_SENDERID as string,
      appId: $config.APP_ID as string,
      measurementId: $config.MEASUREMENT_ID as string,
    */
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
    firebaseApp,
    firestore,
  }
}
