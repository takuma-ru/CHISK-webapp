/**
 * 引数で指定されたmdiアイコンを返す
 * @param icon string
 * @returns string
 */
export default function returnMdiIcon (icon: string) {
  const mdiIcon = require('@mdi/js')

  return mdiIcon[icon]
}
