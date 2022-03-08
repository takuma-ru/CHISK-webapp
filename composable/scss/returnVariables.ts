/**
  _variables.scssで定義した変数を取得
**/
import _variables from '~/assets/scss/_variables.scss'

export default function returnVariables (variables: string) {
  return _variables[variables]
}
