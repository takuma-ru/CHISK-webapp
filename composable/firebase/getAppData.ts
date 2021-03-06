import { doc, getDoc, getFirestore } from 'firebase/firestore'

/**
  Firestoreに保存しているリリースノートデータを取得
**/
export default async function getAppData () {
  const firestore = getFirestore()

  const ref = doc(firestore, 'appdata', 'app_data', 'jp', 'data')
  try {
    const document = await getDoc(ref)
    console.log(document.data())
  } catch (e) {
    alert('Error!')
    console.error(e)
  }
}
