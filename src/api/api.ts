import axios from 'axios'
import { ProfileType, UserInfoType, PhotosType } from '../types/types'

const instanceParameters = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" },
}

const instanceAxios = axios.create(
  { ...instanceParameters }
)

type GetUsersResponseType = {
  items: Array<UserInfoType>
  totalCount: number
  error: string | null
}
type SetUserFollowResponseType = {
  resultCode: number
  messages: Array<string>
  data: {}
  fieldsErrors: []
}

type SavePhotoResponseType = {
  resultCode: number
  messages: Array<string>
  data: { photos: PhotosType }
  fieldsErrors: []
}

type UpdateProfileResponseType = {
  resultCode: number
  messages: Array<string>
  data: {}
  fieldsErrors: []
}

export const usersAPI = {
  getUsers(currentPage: number, usersOnPageCount: number) {
    return instanceAxios.get<GetUsersResponseType>(`users?page=${currentPage}&count=${usersOnPageCount}`).then(response => response.data)
  },
  setUserFollow(userId: number | null) {
    return instanceAxios.post<SetUserFollowResponseType>(`follow/${userId}`).then(response => response.data)
  },

  setUserUnfollow(userId: number | null) {
    return instanceAxios.delete<SetUserFollowResponseType>(`follow/${userId}`).then(response => response.data)
  }
}
export const profileAPI = {
  getUserProfile(userId: number | null) {
    return instanceAxios.get<ProfileType>(`profile/${userId}`).then(response => response.data)
  },

  getUserStatus(userId: number) {
    return instanceAxios.get<string | null>(`profile/status/${userId}`).then(response => response.data)
  },

  getMyStatus(myId: number) {
    return instanceAxios.get<string | null>(`profile/status/${myId}`).then(response => response.data)
  },

  putMyStatus(myStatus: string) {
    return instanceAxios.put<SetUserFollowResponseType>('profile/status/', { status: myStatus }).then(response => response.data)
  },

  savePhoto(file: any) {
    const formData = new FormData()
    formData.append('image', file)
    return instanceAxios.put<SavePhotoResponseType>('profile/photo/', formData, { headers: { 'Content-type': 'multipart/form-data' } })
      .then(response => response.data)
  },

  updateProfile(profileData: ProfileType) {
    return instanceAxios.put<UpdateProfileResponseType>('profile/', profileData)
      .then(response => response.data)
  }
}

type GetAuthDataResponseType = {
  data: { id: number, login: string, email: string }
  resultCode: number
  messages: Array<string>
  fieldsErrors: []
}
type LoginOnTheServiceResponseType = {
  data: { id: number, login: string, email: string }
  resultCode: number
  messages: Array<string>
  fieldsErrors: []
}
type LogoutFromTheServiceResponseType = {
  data: {}
  resultCode: number
  messages: Array<string>
  fieldsErrors: []
}
type GetCaptchaUrlResponseType = {
  url: string
}

export const authAPI = {
  getAuthData() {
    return instanceAxios.get<GetAuthDataResponseType>('auth/me').then(response => response.data)
  },
  loginOnTheService(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
    return instanceAxios.post<LoginOnTheServiceResponseType>('auth/login', { email, password, rememberMe, captcha }).then(response => response.data)
  },
  logoutFromTheService() {
    return instanceAxios.delete<LogoutFromTheServiceResponseType>('auth/login').then(response => response.data)
  },
  getCaptchaUrl() {
    return instanceAxios.get<GetCaptchaUrlResponseType>('/security/get-captcha-url').then(response => response.data)
  }
}
