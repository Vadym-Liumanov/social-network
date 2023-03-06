import { stopSubmit, FormAction } from 'redux-form'
import { authAPI } from "../api/authAPI"
import { Nullable } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './store-redux'

const SET_USER_AUTH_DATA = 'social_network/auth/SET_USER_AUTH_DATA'
const RESET_USER_AUTH_DATA = 'social_network/auth/RESET_USER_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social_network/auth/GET_CAPTCHA_URL_SUCCESS'
const SET_IS_FETCHING = 'social_network/auth/SET_IS_FETCHING'

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
  },
  setIsFetching: (isFetching: boolean) => {
    return { type: SET_IS_FETCHING, isFetching } as const
  }
  
}

type ThunkType = BaseThunkType<ActionTypes | FormAction>

export const getCaptchaUrlThunk = (): ThunkType => {
  return (dispatch) => {
    return authAPI.getCaptchaUrl().then((data) => {
      dispatch(actionCreators.getCaptchaUrlSuccess(data.url))
      dispatch(actionCreators.setIsFetching(false))
    })
  }
}

export const getAuthDataThunk = (): ThunkType => {
  return (dispatch) => {
    return authAPI.getAuthData().then((data) => {
      if (data.resultCode === 0) {
        dispatch(actionCreators.setUserAuthData(data.data))
        dispatch(actionCreators.setIsFetching(false))
      }
    })
  }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
  return (dispatch) => {
    dispatch(actionCreators.setIsFetching(true))
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
        dispatch(actionCreators.setIsFetching(false))
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
  captchaUrl: null as Nullable<string>,
  isFetching: false as boolean
}

export type StateType = typeof initialState

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

    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    default:
      return state
  }
}

export default authReducer