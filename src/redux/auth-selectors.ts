import {AppStateType} from './store-redux'

export const getIsAuth = (state: AppStateType) => state.auth.isAuth
export const getCaptchaUrl = (state: AppStateType) => state.auth.captchaUrl
export const getAuthData = (state: AppStateType) => state.auth