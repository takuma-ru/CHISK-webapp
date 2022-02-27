/**
  Firestoreに保存しているタスクデータを削除する
**/

import { doc, getFirestore, deleteDoc } from 'firebase/firestore'

export default async function deleteTaskData (uid: string | null, deleteId: string) {
  const firestore = getFirestore()

  if (uid) {
    await deleteDoc(doc(firestore, 'tasks', uid, 'Task', deleteId))
  } else {
    console.error('uid not found')
  }
}
