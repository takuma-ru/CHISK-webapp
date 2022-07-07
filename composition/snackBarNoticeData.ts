/**
  通知データ管理
**/

import {
  InjectionKey,
  shallowReadonly,
  ref,
} from '@nuxtjs/composition-api'

/**
 * model: 表示フラグ
 *
 * type: 表示タイプ
 *
 * content: snackBarに表示するテキスト
 *
 * timeout: 非表示になるまでのミリ秒時間
 *
 * conditions: 表示する条件(未実装)
 */
export interface snackBarNoticeDataInterface {
  model: boolean,
  type: 'success' | 'error' | 'help' | 'pwaInstall',
  content?: string,
  timeout?: number,
  /* conditions?: string, */
  /* buttons?: buttonInterface[] */
}

export default function useSnackBarNoticeData () {
  /*
    state
  */
  const state = {
    snackBarNoticeData: ref<snackBarNoticeDataInterface[]>([]),
  }

  /*
    mutation
  */
  const addSnackBarNoticeData = (snackBarNoticeData: snackBarNoticeDataInterface) => {
    state.snackBarNoticeData.value.push(snackBarNoticeData)
  }

  const deleteSnackBarNoticeData = (index: number) => {
    if (index === -1) {
      console.log('見つかりませんでした。')
    } else {
      state.snackBarNoticeData.value.splice(index, 1)
    }
  }

  const initSnackBarNoticeData = () => {
    state.snackBarNoticeData.value = []
  }

  const hiddenSnackBarNoticeData = (index: number) => {
    state.snackBarNoticeData.value[index].model = false
  }

  /*
    action
  */

  return {
    snackBarNoticeData: shallowReadonly(state.snackBarNoticeData),

    addSnackBarNoticeData,
    deleteSnackBarNoticeData,
    initSnackBarNoticeData,
    hiddenSnackBarNoticeData,
  }
}

export type snackBarNoticeDataType = ReturnType<typeof useSnackBarNoticeData>
export const snackBarNoticeDataKey: InjectionKey<snackBarNoticeDataType> = Symbol('snackBarNoticeDataKey')
