/**
  通知データ管理
**/

import {
  InjectionKey,
  shallowReadonly,
  ref,
  reactive,
} from '@nuxtjs/composition-api'

export interface snackBarNoticeDataInterface {
  model: boolean,
  type: string,
  content: string,
  timeout?: number,
  conditions?: string,
  /* buttons?: buttonInterface[] */
}

export default function useSnackBarNoticeData () {
  /*
    state
  */
  const state = reactive({
    snackBarNoticeData: ref<snackBarNoticeDataInterface[]>([
      {
        model: true,
        type: 'help',
        content: 'アプリがインストール出来ます！',
      },
    ]),
  })

  /*
    mutation
  */
  const addSnackBarNoticeData = (snackBarNoticeData: snackBarNoticeDataInterface) => {
    state.snackBarNoticeData.push(snackBarNoticeData)
  }

  const deleteSnackBarNoticeData = (index: number) => {
    if (index === -1) {
      console.log('見つかりませんでした。')
    } else {
      state.snackBarNoticeData.splice(index, 1)
    }
  }

  const initSnackBarNoticeData = () => {
    state.snackBarNoticeData = []
  }

  const hiddenSnackBarNoticeData = (index: number) => {
    state.snackBarNoticeData[index].model = false
  }

  /*
    action
  */

  return {
    snackBarNoticeData: shallowReadonly(state.snackBarNoticeData),

    addSnackBarNoticeData,
    hiddenSnackBarNoticeData,
  }
}

export type snackBarNoticeDataType = ReturnType<typeof useSnackBarNoticeData>
export const snackBarNoticeDataKey: InjectionKey<snackBarNoticeDataType> = Symbol('snackBarNoticeDataKey')
