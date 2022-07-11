import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { inputDataInterface } from '~/types/inputDataInterface'

/**
 * 既存のタスクデータを更新する
 * @param uid ユーザーID
 * @param updateId 更新したいタスクのID
 * @param data 更新するタスクデータ
 * @returns 更新成功フラグ
 */
export default async function updateTaskData (uid: string | null, updateId: string, data: inputDataInterface) {
  let isUpdateSuccess = false
  const firestore = getFirestore()

  if (uid && data) {
    const updateTaskDataRef = doc(firestore, 'tasks', uid, 'Task', updateId)

    await updateDoc(updateTaskDataRef, {
      title: data.title,
      text: data.text,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      tag: data.tag,
    }).then(() => {
      isUpdateSuccess = true
    }).catch((err) => {
      isUpdateSuccess = false
      console.log(err)
    })
  } else {
    isUpdateSuccess = false
    console.error('uid or data not found')
  }

  return isUpdateSuccess
}
