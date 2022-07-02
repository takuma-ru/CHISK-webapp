/**
  指定したタスクのflagを完了済みにする
**/

import { doc, getFirestore, increment, updateDoc } from 'firebase/firestore'

export default function completedTaskData () {
  const firestore = getFirestore()

  const completed = async (uid: string | null | undefined, completedId: string) => {
    if (uid) {
      await updateDoc(doc(firestore, 'tasks', uid, 'Task', completedId), {
        completed: new Date(),
        group: '完了',
      }).then(async () => {
        await updateDoc(doc(firestore, 'tasks', uid, 'Data', 'Planet'), {
          creatures: increment(1),
        })
      })
    } else {
      console.error('uid not found')
    }
  }

  const inCompleted = async (uid: string | null | undefined, completedId: string) => {
    if (uid) {
      await updateDoc(doc(firestore, 'tasks', uid, 'Task', completedId), {
        completed: null,
        group: '進行中',
      }).then(async () => {
        await updateDoc(doc(firestore, 'tasks', uid, 'Data', 'Planet'), {
          creatures: increment(-1),
        })
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
