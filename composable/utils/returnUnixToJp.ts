/**
 Unix時間を日本時間（YY年MM月DD日）に変換し返す
 **/
import { Timestamp } from 'firebase/firestore'

export default function returnUnixToJp (time?: Timestamp | Date) {
  let dateJp = null
  if (time instanceof Timestamp) {
    const date = new Date(time.seconds * 1000)
    dateJp = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
  } else if (time instanceof Date) {
    dateJp = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
  }

  return dateJp
}
