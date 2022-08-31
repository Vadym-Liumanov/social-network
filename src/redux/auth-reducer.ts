import { stopSubmit } from 'redux-form'
import { authAPI } from "../api/authAPI"
import { Nullable } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './store-redux'

const SET_USER_AUTH_DATA = 'social_network/auth/SET_USER_AUTH_DATA'
const RESET_USER_AUTH_DATA = 'social_network/auth/RESET_USER_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social_network/auth/GET_CAPTCHA_URL_SUCCESS'

export type AuthDataType = {
  id: number,
  login: string,
  email: string,
}

type ActionTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return { type: GET_CAPTCHA_URL_SUCCESS, captchaUrl } as const
  },
  setUserAuthData: (authData: AuthDataType) => {
    return { type: SET_USER_AUTH_DATA, authData } as const
  },
  resetAuthData: () => {
    return { type: RESET_USER_AUTH_DATA } as const
  }
}

type ThunkType = BaseThunkType<ActionTypes>

export const getCaptchaUrlThunk = (): ThunkType => {
  return (dispatch) => {
    return authAPI.getCaptchaUrl().then((data) => {
      dispatch(actionCreators.getCaptchaUrlSuccess(data.url))
    })
  }
}

export const getAuthDataThunk = (): ThunkType => {
  return (dispatch) => {
    return authAPI.getAuthData().then((data) => {
      if (data.resultCode === 0) {
        dispatch(actionCreators.setUserAuthData(data.data))
      }
    })
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
  return (dispatch) => {
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

export const logoutThunk = (): BaseThunkType => {
  return (dispatch) => {
    authAPI.logoutFromTheService().then((data) => {
      if (data.resultCode === 0) {
        dispatch(actionCreators.resetAuthData())
      }
    })
  }
}

// getState().auth
const initialState = {
  id: null as Nullable<number>,
  login: null as Nullable<string>,
  email: null as Nullable<string>,
  isAuth: false,
  captchaUrl: null as Nullable<string>
}

type StateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {

    case SET_USER_AUTH_DATA:
      return {
        ...state,
        id: action.authData.id,
        login: action.authData.login,
        email: action.authData.email,
        isAuth: true,
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