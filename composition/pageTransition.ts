/**
  ページ遷移時のアニメーション管理
**/

import {
  InjectionKey,
  shallowReadonly,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import getIsPhone from '../composable/utils/isPhone'

export interface scssVariablesInterface {
  left: string
  top: string
}

export default function usePageTransition () {
  const isPhone = getIsPhone().isPhone
  const router = useRouter()

  /*
    state
  */
  const state = {
    transitionMode: ref('L2R'),
    scssVariables: ref<scssVariablesInterface>({
      left: '-100%',
      top: '0%',
    }),
  }

  /*
    mutation
  */
  const updateTransitionMode = (value: string) => {
    state.transitionMode.value = value
  }

  const updateScssVariables = (value: scssVariablesInterface) => {
    state.scssVariables.value = {
      left: value.left,
      top: value.top,
    }
  }

  /*
    action
  */
  const push = async (from: string, to: string) => {
    switch (from) {
      case '/':
        switch (to) {
          case '/taskboard':
            isPhone ? updateTransitionMode('L2R') : updateTransitionMode('B2T')
            break
          case '/setting':
            isPhone ? updateTransitionMode('R2L') : updateTransitionMode('B2T')
            break
          case '/about':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('B2T')
            break
        }
        break
      case '/taskboard':
        switch (to) {
          case '/':
            isPhone ? updateTransitionMode('R2L') : updateTransitionMode('T2B')
            break
          case '/setting':
            isPhone ? updateTransitionMode('R2L') : updateTransitionMode('B2T')
            break
          case '/about':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('B2T')
            break
        }
        break
      case '/setting':
        switch (to) {
          case '/':
            isPhone ? updateTransitionMode('L2R') : updateTransitionMode('T2B')
            break
          case '/taskboard':
            isPhone ? updateTransitionMode('L2R') : updateTransitionMode('T2B')
            break
          case '/about':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('B2T')
            break
        }
        break
      case '/about':
        switch (to) {
          case '/':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('T2B')
            break
          case '/taskboard':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('T2B')
            break
          case '/setting':
            isPhone ? updateTransitionMode('none') : updateTransitionMode('T2B')
            break
        }
        break
    }

    switch (state.transitionMode.value) {
      case 'none':
        await updateScssVariables({
          left: '0%',
          top: '0%',
        })
        break
      case 'R2L':
        await updateScssVariables({
          left: '100%',
          top: '0%',
        })
        break
      case 'L2R':
        await updateScssVariables({
          left: '-100%',
          top: '0%',
        })
        break
      case 'T2B':
        await updateScssVariables({
          left: '0%',
          top: '-100vh',
        })
        break
      case 'B2T':
        await updateScssVariables({
          left: '0%',
          top: '100vh',
        })
        break
    }

    document.documentElement.style.setProperty('--transition-left', state.scssVariables.value.left)
    document.documentElement.style.setProperty('--transition-top', state.scssVariables.value.top)
    router.push(to)
  }

  return {
    transitionMode: shallowReadonly(state.transitionMode),
    scssVariables: shallowReadonly(state.scssVariables),

    push,
  }
}

export type pageTransitionType = ReturnType<typeof usePageTransition>
export const pageTransitionKey: InjectionKey<pageTransitionType> = Symbol('pageTransitionKey')
