import { doc, getFirestore, increment, updateDoc } from 'firebase/firestore'

/**
  指定したタスクのフラグを変更する関数群
**/
export default function completedTaskData () {
  const firestore = getFirestore()

  /**
   * タスクの完了済みフラグを true にする
   * @param uid ユーザーID
   * @param completedId 完了済みにさせたいタスクのID
   */
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

  /**
   * タスクの完了済みフラグを false にする
   * @param uid ユーザーID
   * @param completedId 未完了にさせたいタスクのID
   */
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
