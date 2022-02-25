import { initializeApp } from 'firebase/app'
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'

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
  /*
    apiKey: $config.API_KEY as string,
    authDomain: $config.AUTH_DOMAIN as string,
    databaseURL: $config.DATABASE_URL as string,
    projectId: $config.PROJECT_ID as string,
    storageBucket: $config.STORAGE_BUCKET as string,
    messagingSenderId: $config.MESSAGING_SENDERID as string,
    appId: $config.APP_ID as string,
    measurementId: $config.MEASUREMENT_ID as string,
  */
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

enableIndexedDbPersistence(firestore)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })
