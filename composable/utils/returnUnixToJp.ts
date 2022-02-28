/**
 Unix時間を日本時間（YY年MM月DD日）に変換し返す
 **/
import { Timestamp } from 'firebase/firestore'

export default function returnUnixToJp (unix: Timestamp) {
  const date = new Date(unix?.seconds * 1000)
  const dateJp = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'

  return dateJp
}
