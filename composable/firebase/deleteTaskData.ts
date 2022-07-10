import { doc, getFirestore, deleteDoc } from 'firebase/firestore'

/**
 * Firestoreに保存しているタスクデータを削除する
 * @param uid ユーザーID
 * @param deleteId 削除したいタスクのID
 */
export default async function deleteTaskData (uid: string | null | undefined, deleteId: string) {
  const firestore = getFirestore()

  if (uid) {
    await deleteDoc(doc(firestore, 'tasks', uid, 'Task', deleteId))
  } else {
    console.error('uid not found')
  }
}
