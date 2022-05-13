/**
  Planetデータテーブルの作成
**/
import { doc, getFirestore, setDoc } from 'firebase/firestore'

export default async function createPlanet (uid: string | null, name: string) {
  const firestore = getFirestore()
  let isSuccess = false

  if (uid) {
    await setDoc(doc(firestore, 'tasks', uid, 'Data', 'Planet'), {
      created: new Date(),
      creatures: 0,
      elapsed: 0,
      name,
    })
      .then(() => {
        isSuccess = true
      })
      .catch((err) => {
        isSuccess = false
        console.log(err)
      })
  } else {
    console.error('uid not found')
  }

  return isSuccess
}
