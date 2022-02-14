/**
  Webアプリ内で使うタスクデータの管理
**/
import {
  ref,
  reactive,
  InjectionKey,
  readonly,
} from '@nuxtjs/composition-api'
import getTaskData from '~/composable/firebase/getTaskData'

export interface userTaskDataAllType {
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
  // ユーザーのタスク情報
  const state = reactive({
    userTaskData: ref<userTaskDataAllType[]>([]),
  })

  // Firestoreからデータを取得し、userTaskDataに挿入
  const getUserTaskData = async (uid: string | null) => {
    await getTaskData(uid).then((res) => {
      res.value.forEach((doc) => {
        updateUserTaskData(doc as userTaskDataAllType)
      })
    })
  }

  // 引数のデータをuserTaskDataに挿入
  const updateUserTaskData = (taskData: userTaskDataAllType) => {
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
