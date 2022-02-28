/**
  Webアプリ内で使うタスクデータ管理
**/

import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
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
  dateStart: Timestamp,
  dateEnd: Timestamp,
  group: string,
  completed: Timestamp,
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
  const deleteUserTaskData = (deleteId: string) => {
    const index = state.userTaskData.findIndex(({ id }) => id === deleteId)
    if (index === -1) {
      console.log('見つかりませんでした。')
    } else {
      state.userTaskData.splice(index, 1)
    }
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
            // console.log('data: ', change.doc.data().id)
            const taskData = {
              id: change.doc.data().id,
              title: change.doc.data().title,
              text: change.doc.data().text,
              dateStart: change.doc.data().date_start,
              dateEnd: change.doc.data().date_end,
              group: change.doc.data().group,
              completed: change.doc.data().completed,
              tag: change.doc.data().tag,
            } as userTaskDataInterface

            const index = state.userTaskData.findIndex(({ id }) => id === taskData.id)
            if (index === -1) {
              updateUserTaskData(taskData)
            }
          }

          if (change.type === 'modified') {
            // console.log(change.doc.data().id)
          }

          if (change.type === 'removed') {
            console.log(change.doc.data().id)
            deleteUserTaskData(change.doc.data().id)
          }

          const source = snapshot.metadata.fromCache ? 'local cache' : 'server'
          console.log('Data came from ' + source)
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
