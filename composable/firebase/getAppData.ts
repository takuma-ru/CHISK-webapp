/**
  Firestoreに保存しているリリースノートデータを取得
**/

import { doc, getDoc } from 'firebase/firestore'
import useFirebase from '~/plugins/firebase'

export default async function getAppData () {
  const { firestore } = useFirebase()

  const ref = doc(firestore, 'appdata', 'app_data', 'jp', 'data')
  try {
    const document = await getDoc(ref)
    console.log(document.data())
  } catch (e) {
    alert('Error!')
    console.error(e)
  }
}
