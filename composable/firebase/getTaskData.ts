/* eslint-disable no-console */
import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore'
import useFirebase from '~/plugins/firebase'

export const getTaskData = async (uid: string | null) => {
  const { firestore } = useFirebase()

  let taskData
  if (uid != null) {
    const q = query(collection(firestore, 'tasks', uid, 'Task'))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  } else {
    console.error('uid not found')
  }

  return {
    taskData,
  }
}
