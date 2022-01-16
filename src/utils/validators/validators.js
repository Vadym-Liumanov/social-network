export const required = value => value ? undefined : 'Field is required'

export const maxLength = nmb => value => {
  if (value && value.length > nmb) return `Max length is ${nmb} symbols`
  return undefined
}