import { stopSubmit } from 'redux-form'
import { authAPI } from '../api/api'

const SET_USER_AUTH_DATA = 'social_network/auth/SET_USER_AUTH_DATA'
const RESET_USER_AUTH_DATA = 'social_network/auth/RESET_USER_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social_network/auth/GET_CAPTCHA_URL_SUCCESS'

type ActionCreatorTypes = GetCaptchaUrlSuccessACType
  | SetUserAuthDataACType | ResetAuthDataACType

type GetCaptchaUrlSuccessACType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  captchaUrl: string
}

const getCaptchaUrlSuccessAC = (captchaUrl: string): GetCaptchaUrlSuccessACType => {
  return { type: GET_CAPTCHA_URL_SUCCESS, captchaUrl }
}

export const getCaptchaUrlThunk = () => {
  return (dispatch: any) => {
    return authAPI.getCaptchaUrl().then((data) => {
      dispatch(getCaptchaUrlSuccessAC(data.url))
    })
  }
}

type AuthDataType = {
  id: number,
  login: string,
  email: string,
}

type SetUserAuthDataACType = {
  type: typeof SET_USER_AUTH_DATA,
  authData: AuthDataType
}

const setUserAuthDataAC = (authData: AuthDataType): SetUserAuthDataACType => {
  return { type: SET_USER_AUTH_DATA, authData }
}

export const getAuthDataThunk = () => {
  return (dispatch: any) => {
    return authAPI.getAuthData().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthDataAC(data.data))
      }
    })
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null) => {
  return (dispatch: any) => {
    authAPI.loginOnTheService(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getAuthDataThunk())
      }
      else {
        if (data.resultCode === 10) {
          dispatch(getCaptchaUrlThunk())
        }
        let ErrorMessage = data.messages.length > 0 ? data.messages[0] : 'Somthing wrong'
        let action = stopSubmit('login', { _error: ErrorMessage })
        dispatch(action)
      }
    })
  }
}

type ResetAuthDataACType = {
  type: typeof RESET_USER_AUTH_DATA
}

const resetAuthDataAC = (): ResetAuthDataACType => {
  return { type: RESET_USER_AUTH_DATA }
}

export const logoutThunk = () => {
  return (dispatch: any) => {
    authAPI.logoutFromTheService().then((data) => {
      if (data.resultCode === 0) {
        dispatch(resetAuthDataAC())
      }
    })
  }
}

type InitialStateType = {
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  captchaUrl: string | null
}

// getState().auth
const initialState: InitialStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

const authReducer = (state = initialState, action: ActionCreatorTypes): InitialStateType => {
  switch (action.type) {

    case SET_USER_AUTH_DATA:
      return {
        ...state,
        id: action.authData.id,
        login: action.authData.login,
        email: action.authData.email,
        isAuth: true
      }

    case RESET_USER_AUTH_DATA:
      return {
        ...state,
        ...initialState
      }

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }

    default:
      return state
  }
}

export default authReducer