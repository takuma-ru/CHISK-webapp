/**
  _variables.scssで定義した変数を取得
**/
import _variables from '~/assets/scss/variables.scss'

export default function scssVar (variables: string) {
  const color = _variables[variables] ? _variables[variables] : variables
  return color
}
