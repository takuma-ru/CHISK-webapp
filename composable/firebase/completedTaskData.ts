/**
  指定したタスクのflagを完了済みにする
**/

import { doc, getFirestore, updateDoc } from 'firebase/firestore'

export default function completedTaskData () {
  const firestore = getFirestore()

  const completed = async (uid: string | null, completedId: string) => {
    if (uid) {
      await updateDoc(doc(firestore, 'tasks', uid, 'Task', completedId), {
        completed: new Date(),
      })
    } else {
      console.error('uid not found')
    }
  }

  const inCompleted = async (uid: string | null, completedId: string) => {
    if (uid) {
      await updateDoc(doc(firestore, 'tasks', uid, 'Task', completedId), {
        completed: null,
      })
    } else {
      console.error('uid not found')
    }
  }

  return {
    completed,
    inCompleted,
  }
}
