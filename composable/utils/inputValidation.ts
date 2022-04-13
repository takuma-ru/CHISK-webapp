/**
 インプットフィールドに入力された値に対してのバリデーション処理
 **/

type inputValidationType = {
  value: any,
  type: string,
}

export default function inputValidation ({ value, type }: inputValidationType) {
  console.log(value)
  console.log(type)
}
