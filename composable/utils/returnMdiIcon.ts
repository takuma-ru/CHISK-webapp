/**
  引数で指定されたmdiアイコンを返す
**/

export default function returnMdiIcon (icon: string) {
  const mdiIcon = require('@mdi/js')

  return mdiIcon[icon]
}
