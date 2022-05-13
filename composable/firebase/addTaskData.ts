/**
  Firestoreに新しいタスクデータを追加する
**/

import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { userTaskDataInterface } from '@/composition/userTaskData'

export default async function addTaskData (uid: string | null, data: userTaskDataInterface) {
  let isAddSuccess = false
  const firestore = getFirestore()

  if (uid && data) {
    const newTaskDataRef = doc(collection(firestore, 'tasks', uid, 'Task'))
    data.id = newTaskDataRef.id
    await setDoc(newTaskDataRef, data)
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
