type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = value => value ? undefined : 'Field is required'

export const maxLength = (nmb: number): ValidatorType => (value: string) => {
  if (value && value.length > nmb) return `Max length is ${nmb} symbols`
  return undefined
}