export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => value ? undefined : 'Field is required'

export const maxLength = (nmb: number): FieldValidatorType => (value: string) => {
  if (value && value.length > nmb) return `Max length is ${nmb} symbols`
  return undefined
}

export const email: FieldValidatorType = (value: string) => {
  if (value && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))) {
    return 'Invalid email address'
  }
  return undefined
}
