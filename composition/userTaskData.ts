/**
  Webアプリ内で使うタスクデータ管理
**/

import {
  ref,
  reactive,
  InjectionKey,
  readonly,
} from '@nuxtjs/composition-api'
import getTaskData from '~/composable/firebase/getTaskData'

export interface userTaskDataInterface {
  id: string,
  title: string,
  text: string,
  dateStart: Date,
  dateEnd: Date,
  group: string,
  completed: Date,
  tag: Array<[]>,
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
  const getUserTaskData = async (uid: string | null) => {
    await getTaskData(uid).then((res) => {
      res.value.forEach((doc) => {
        updateUserTaskData(doc as userTaskDataInterface)
      })
    })
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
