/**
  ユーザーの惑星データ管理
**/

import {
  InjectionKey,
  readonly,
  ref,
} from '@nuxtjs/composition-api'
import {
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export interface userPlanetDataInterface {
  created: Date,
  creatures: Number,
  elapsed: Number,
  name: String,
}

export default function useUserPlanetData () {
  /*
    state
  */
  const state = {
    userPlanetData: ref<userPlanetDataInterface>({
      created: new Date(),
      creatures: 0,
      elapsed: 0,
      name: 'NULL',
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
  const getUserPlanetData = (uid: string | null) => {
    const firestore = getFirestore()

    if (uid != null) {
      onSnapshot(doc(firestore, 'tasks', uid, 'Data', 'Planet'), (doc) => {
        // console.log('data: ', doc.data())
        const planetData = {
          created: doc.data()?.created.toDate(),
          creatures: doc.data()?.creatures,
          elapsed: doc.data()?.elapsed,
          name: doc.data()?.name,
        } as userPlanetDataInterface

        updateUserPlanetData(planetData)

        // console.log(state.userPlanetData)

        const source = doc.metadata.fromCache ? 'local cache' : 'server'
        console.log('Data came from ' + source)
      })
    } else {
      console.error('uid not found')
    }
  }

  return {
    userPlanetData: readonly(state.userPlanetData),

    getUserPlanetData,
  }
}

export type userPlanetDataType = ReturnType<typeof useUserPlanetData>
export const userPlanetDataKey: InjectionKey<userPlanetDataType> = Symbol('userPlanetDataKey')
