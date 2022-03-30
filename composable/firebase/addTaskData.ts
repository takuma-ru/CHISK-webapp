/**
  Firestoreに新しいタスクデータを追加する
**/

import { doc, getFirestore, setDoc } from 'firebase/firestore'
import userTaskDataInterface from '@/composition/userTaskData'

export default async function addTaskData (uid: string | null, data: typeof userTaskDataInterface) {
  const firestore = getFirestore()

  if (uid) {
    await setDoc(doc(firestore, 'tasks', uid, 'Task'), data)
  } else {
    console.error('uid not found')
  }
}
