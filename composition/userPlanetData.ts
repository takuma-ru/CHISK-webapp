/**
  ユーザーの惑星データ管理
**/

import {
  InjectionKey,
  shallowReadonly,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import {
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export interface userPlanetDataInterface {
  created?: Date | null,
  creatures?: Number | null,
  elapsed?: Number | null,
  name?: String | null,
}

export default function useUserPlanetData () {
  const router = useRouter()

  /*
    state
  */
  const state = {
    userPlanetData: ref<userPlanetDataInterface>({
      created: undefined,
      creatures: undefined,
      elapsed: undefined,
      name: undefined,
    }),
  }

  /*
    mutation
  */
  const updateUserPlanetData = (userPlanetData: userPlanetDataInterface) => {
    state.userPlanetData.value = userPlanetData
  }

  /*
    action
  */
  const getUserPlanetData = async (uid: string | null) => {
    const firestore = getFirestore()

    if (uid != null) {
      await onSnapshot(doc(firestore, 'tasks', uid, 'Data', 'Planet'), (doc) => {
        const planetData = {
          created: doc.data()?.created.toDate(),
          creatures: doc.data()?.creatures,
          elapsed: doc.data()?.elapsed,
          name: doc.data()?.name,
        } as userPlanetDataInterface

        updateUserPlanetData(planetData)
        if (planetData.name === undefined) {
          router.push('signUp?step=create-earth')
        }

        const source = doc.metadata.fromCache ? '\u001B[31mlocal cache' : '\u001B[34mserver'
        console.log('\u001B[35mPlanet\u001B[39m data came from ' + source)
      })
    } else {
      const planetData = {
        created: null,
        creatures: null,
        elapsed: null,
        name: null,
      } as userPlanetDataInterface

      updateUserPlanetData(planetData)

      console.error('uid not found')
    }
  }

  return {
    userPlanetData: shallowReadonly(state.userPlanetData),

    getUserPlanetData,
  }
}

export type userPlanetDataType = ReturnType<typeof useUserPlanetData>
export const userPlanetDataKey: InjectionKey<userPlanetDataType> = Symbol('userPlanetDataKey')
