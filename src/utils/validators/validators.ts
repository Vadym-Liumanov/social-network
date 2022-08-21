export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => value ? undefined : 'Field is required'

export const maxLength = (nmb: number): FieldValidatorType => (value: string) => {
  if (value && value.length > nmb) return `Max length is ${nmb} symbols`
  return undefined
}