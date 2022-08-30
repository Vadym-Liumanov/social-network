export type Nullable<T> = null | T

export type ContactsType = {
  facebook: string | null,
  website: string | null,
  vk: string | null,
  twitter: string | null,
  instagram: string | null,
  youtube: string | null,
  github: string | null,
  mainLink: string | null
}

export type PhotosType = {
  small: string | null,
  large: string | null
}

export type ProfileType = {
  aboutMe: string | null,
  contacts: ContactsType,
  lookingForAJob: boolean,
  lookingForAJobDescription: string | null,
  fullName: string | null,
  userId: number,
  photos: PhotosType
}

export type UserInfoType = {
  name: string,
  id: number | null,
  uniqueUrlName: string | null,
  photos: PhotosType,
  status: string | null,
  followed: boolean
}

export type MainResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: []
  data: T
}