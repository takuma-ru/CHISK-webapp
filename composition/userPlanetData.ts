/**
  ユーザーの惑星データ管理
**/

import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
} from 'firebase/firestore'
import {
  reactive,
  InjectionKey,
  readonly,
} from '@nuxtjs/composition-api'

export interface userPlanetDataInterface {
  created: Timestamp | Date,
  creatures: Number,
  elapsed: Number,
  name: String,
}

export default function userPlanetData () {
  /*
    state
  */
  const state = reactive({
    // ユーザーのタスクデータ
    userPlanetData: reactive<userPlanetDataInterface>({
      created: new Date('1900-01-01'),
      creatures: 0,
      elapsed: 0,
      name: 'earth',
    }),
  })

  /*
    mutation
  */
  // 引数のデータをUserPlanetDataに挿入
  const updateUserPlanetData = (newUserPlanetData: userPlanetDataInterface) => {
    state.userPlanetData = newUserPlanetData
  }

  // UserPlanetDataを初期化
  const initUserPlanetData = () => {
    state.userPlanetData = {
      created: new Date('1900-01-01'),
      creatures: 0,
      elapsed: 0,
      name: 'earth',
    }
  }

  /*
    action
  */
  // Firestoreからデータを取得し、UserPlanetDataに挿入
  const getUserPlanetData = (uid: string | null) => {
    const firestore = getFirestore()

    if (uid != null) {
      const q = query(collection(firestore, 'tasks', uid, 'Data', 'Planet'))

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            // console.log('data: ', change.doc.data().id)
            const planetData = {
              created: change.doc.data().created,
              creatures: change.doc.data().creatures,
              elapsed: change.doc.data().elapsed,
              name: change.doc.data().name,
            } as userPlanetDataInterface

            updateUserPlanetData(planetData)
          }

          if (change.type === 'removed') {
            initUserPlanetData()
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
    userPlanetData: readonly(state.userPlanetData),

    getUserPlanetData,
    updateUserPlanetData,
    initUserPlanetData,
  }
}

export type UserPlanetDataType = ReturnType<typeof userPlanetData>
export const UserPlanetDataKey: InjectionKey<UserPlanetDataType> = Symbol('UserPlanetDataKey')
