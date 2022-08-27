import { stopSubmit } from 'redux-form'
import { authAPI } from "../api/authAPI"

const SET_USER_AUTH_DATA = 'social_network/auth/SET_USER_AUTH_DATA'
const RESET_USER_AUTH_DATA = 'social_network/auth/RESET_USER_AUTH_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social_network/auth/GET_CAPTCHA_URL_SUCCESS'

const getCaptchaUrlSuccessAC = (captchaUrl) => {
  return { type: GET_CAPTCHA_URL_SUCCESS, captchaUrl }
}

export const getCaptchaUrlThunk = () => {
  return (dispatch) => {
    return authAPI.getCaptchaUrl().then((data) => {
      dispatch(getCaptchaUrlSuccessAC(data.url))
    })
  }
}

const setUserAuthDataAC = (authData) => {
  return { type: SET_USER_AUTH_DATA, authData }
}

export const getAuthDataThunk = () => {
  return (dispatch) => {
    return authAPI.getAuthData().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthDataAC(data.data))
      }
    })
  }
}

export const loginThunk = (email, password, rememberMe, captcha) => {
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

const resetAuthDataAC = () => {
  return { type: RESET_USER_AUTH_DATA }
}

export const logoutThunk = () => {
  return (dispatch) => {
    authAPI.logoutFromTheService().then((data) => {
      if (data.resultCode === 0) {
        dispatch(resetAuthDataAC())
      }
    })
  }
}

// state = state.auth
const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

const authReducer = (state = initialState, action) => {
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