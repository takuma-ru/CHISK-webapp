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
  computed,
} from '@nuxtjs/composition-api'

export interface userTaskDataInterface {
  id: string,
  title: string,
  text: string,
  dateStart?: Date,
  dateEnd?: Date,
  group: string,
  completed: Date | null,
  tag: ReadonlyArray<string | number>,
}

export default function useUserTaskData () {
  /*
    state
  */
  const state = reactive({
    // ユーザーのタスクデータ
    userTaskData: ref<Array<userTaskDataInterface>>([]),
  })

  const highLightTaskIndex = computed(() => {
    let highLightTaskIndex: number = 0
    let minimumTimeDifference = Infinity
    state.userTaskData.map((v, index) => {
      const timeDifference = Math.abs(Date.now() - Number(v.dateEnd?.valueOf()))

      if (minimumTimeDifference > timeDifference) {
        minimumTimeDifference = timeDifference
        highLightTaskIndex = index
      }

      return 0
    })

    return highLightTaskIndex
  })

  /*
    mutation
  */
  // 引数のデータをuserTaskDataに挿入
  const updateUserTaskData = (taskData: userTaskDataInterface) => {
    state.userTaskData.push(taskData)
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
            const taskData = {
              id: change.doc.data().id,
              title: change.doc.data().title,
              text: change.doc.data().text,
              dateStart: (change.doc.data().date_start || change.doc.data().dateStart as Timestamp).toDate(),
              dateEnd: (change.doc.data().date_end || change.doc.data().dateEnd as Timestamp).toDate(),
              group: change.doc.data().group,
              completed: change.doc.data().completed ? (change.doc.data().completed as Timestamp).toDate() : null,
              tag: change.doc.data().tag,
            } as userTaskDataInterface

            const index = state.userTaskData.findIndex(({ id }) => id === taskData.id)
            if (index === -1) {
              updateUserTaskData(taskData)
            }
          }

          if (change.type === 'modified') {
            const taskData = {
              id: change.doc.data().id,
              title: change.doc.data().title,
              text: change.doc.data().text,
              dateStart: (change.doc.data().date_start || change.doc.data().dateStart as Timestamp).toDate(),
              dateEnd: (change.doc.data().date_end || change.doc.data().dateEnd as Timestamp).toDate(),
              group: change.doc.data().group,
              completed: change.doc.data().completed ? (change.doc.data().completed as Timestamp).toDate() : null,
              tag: change.doc.data().tag,
            } as userTaskDataInterface

            deleteUserTaskData(change.doc.data().id)

            const index = state.userTaskData.findIndex(({ id }) => id === taskData.id)
            if (index === -1) {
              updateUserTaskData(taskData)
            }
          }

          if (change.type === 'removed') {
            console.log(change.doc.data().id)
            deleteUserTaskData(change.doc.data().id)
          }

          const source = snapshot.metadata.fromCache ? '\u001B[31mlocal cache' : '\u001B[34mserver'
          console.log('\u001B[35mTask\u001B[39m data came from ' + source)
        })
      })
    } else {
      console.error('uid not found')
    }
  }

  return {
    userTaskData: readonly(state.userTaskData),
    highLightTaskIndex: readonly(highLightTaskIndex),

    getUserTaskData,
    updateUserTaskData,
    deleteUserTaskData,
    initUserTaskData,
  }
}

export type userTaskDataType = ReturnType<typeof useUserTaskData>
export const userTaskDataKey: InjectionKey<userTaskDataType> = Symbol('userTaskDataKey')
