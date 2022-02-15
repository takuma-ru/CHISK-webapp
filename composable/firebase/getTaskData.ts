/**
  Firestoreから指定したユーザーのタスクデータを取得
**/

import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore'
import { ref } from '@nuxtjs/composition-api'
import useFirebase from '~/plugins/firebase'
import { userTaskDataInterface } from '~/composition/userTaskData'

export default async function getTaskData (uid: string | null) {
  const { firestore } = useFirebase()
  const taskDatas = ref<userTaskDataInterface[]>([])

  if (uid != null) {
    const q = query(collection(firestore, 'tasks', uid, 'Task'))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const taskData = {
        id: doc.data().id,
        title: doc.data().title,
        text: doc.data().text,
        dateStart: doc.data().date_start,
        dateEnd: doc.data().date_end,
        group: doc.data().group,
        completed: doc.data().completed,
        tag: doc.data().tag,
      } as userTaskDataInterface

      taskDatas.value.push(taskData)
    })
  } else {
    console.error('uid not found')
  }

  return taskDatas
}
