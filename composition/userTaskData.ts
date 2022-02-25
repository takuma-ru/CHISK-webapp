/**
  Webアプリ内で使うタスクデータ管理
**/

import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore'
import {
  ref,
  reactive,
  InjectionKey,
  readonly,
} from '@nuxtjs/composition-api'

export interface userTaskDataInterface {
  id: string,
  title: string,
  text: string,
  dateStart: Date,
  dateEnd: Date,
  group: string,
  completed: Date,
  tag: Array<any>,
}

export default function useUserTaskData () {
  /*
    state
  */
  const state = reactive({
    // ユーザーのタスクデータ
    userTaskData: ref<userTaskDataInterface[]>([]),
  })

  /*
    mutation
  */
  // 引数のデータをuserTaskDataに挿入
  const updateUserTaskData = (taskData: userTaskDataInterface) => {
    state.userTaskData.push(taskData)
    // console.log(state.userTaskData)
  }

  // 引数のidをuserTaskDataから削除
  const deleteUserTaskData = () => {
  }

  // userTaskDataを初期化
  const initUserTaskData = () => {
    state.userTaskData = []
  }

  /*
    action
  */
  // Firestoreからデータを取得し、userTaskDataに挿入
  const getUserTaskData = (uid: string | null) => {
    const firestore = getFirestore()

    if (uid != null) {
      const q = query(collection(firestore, 'tasks', uid, 'Task'))

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('data: ', change.doc.data().id)
            const taskData = {
              id: change.doc.data().id,
              title: change.doc.data().title,
              text: change.doc.data().text,
              dateStart: change.doc.data().date_start?.toDate(),
              dateEnd: change.doc.data().date_end?.toDate(),
              group: change.doc.data().group,
              completed: change.doc.data().completed?.toDate(),
              tag: change.doc.data().tag,
            } as userTaskDataInterface
            updateUserTaskData(taskData)
          }
        })
      })
    } else {
      console.error('uid not found')
    }
  }

  return {
    userTaskData: readonly(state.userTaskData),

    getUserTaskData,
    updateUserTaskData,
    deleteUserTaskData,
    initUserTaskData,
  }
}

export type userTaskDataType = ReturnType<typeof useUserTaskData>
export const userTaskDataKey: InjectionKey<userTaskDataType> = Symbol('userTaskDataKey')
