import { instanceAxios } from './api'
import { MainResponseType } from '../types/types'

export type AuthDataType = {
  id: number
  login: string
  email: string
}
export type LoginType = {
  id: number
  login: string
  email: string
}
export type GetCaptchaUrlResponseType = {
  url: string
}

export const authAPI = {
  getAuthData() {
    return instanceAxios.get<MainResponseType<AuthDataType>>('auth/me').then(response => response.data);
  },
  loginOnTheService(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
    return instanceAxios.post<MainResponseType<LoginType>>('auth/login', { email, password, rememberMe, captcha }).then(response => response.data);
  },
  logoutFromTheService() {
    return instanceAxios.delete<MainResponseType>('auth/login').then(response => response.data);
  },
  getCaptchaUrl() {
    return instanceAxios.get<GetCaptchaUrlResponseType>('/security/get-captcha-url').then(response => response.data);
  }
}
