import {
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { userTaskDataInterface } from '@/composition/userTaskData'

/**
 * Firestoreに新しいタスクデータを追加する関数
 * @param uid ユーザーID
 * @param data 追加したいタスクデータ
 * @returns 追加成功フラグ
 */
export default async function addTaskData (uid: string | null, data: userTaskDataInterface) {
  let isAddSuccess = false
  const firestore = getFirestore()

  if (uid && data) {
    const newTaskDataRef = doc(collection(firestore, 'tasks', uid, 'Task'))
    await setDoc(newTaskDataRef, {
      id: newTaskDataRef.id,
      title: data.title,
      text: data.text,
      dateStart: Timestamp.fromDate(data.dateStart as Date),
      dateEnd: Timestamp.fromDate(data.dateEnd as Date),
      group: data.group,
      completed: data.completed,
      tag: data.tag,
    })
      .then(() => {
        isAddSuccess = true
      })
      .catch((err) => {
        isAddSuccess = false
        console.log(err)
      })
  } else {
    isAddSuccess = false
    console.error('uid or data not found')
  }

  return isAddSuccess
}
